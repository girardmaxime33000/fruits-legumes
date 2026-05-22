/* ============================================================
   FraisPrix - Application logic
   ============================================================ */

(function () {
  'use strict';

  // ----- State -----
  const state = {
    tab: 'all',          // 'all' | 'fruit' | 'légume'
    search: '',
    sort: 'alpha',       // 'alpha' | 'asc' | 'desc' | 'trend'
    modalChart: null,
  };

  // ----- DOM helpers -----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const fmtPrice = (n) =>
    new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n) + ' €';

  const fmtPercent = (n) => {
    const sign = n > 0 ? '+' : '';
    return sign + n.toFixed(1).replace('.', ',') + ' %';
  };

  const trendInfo = (change) => {
    if (Math.abs(change) < 0.5) {
      return { cls: 'trend-stable', arrow: '→', label: 'stable' };
    }
    if (change > 0) {
      return { cls: 'trend-up', arrow: '↑', label: 'hausse' };
    }
    return { cls: 'trend-down', arrow: '↓', label: 'baisse' };
  };

  // ----- Sparkline (inline SVG) -----
  function buildSparkline(history, change) {
    const w = 200, h = 40, pad = 2;
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    const step = (w - pad * 2) / (history.length - 1);

    const points = history.map((v, i) => {
      const x = pad + i * step;
      const y = pad + (h - pad * 2) * (1 - (v - min) / range);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const color =
      change > 0.5 ? 'var(--red)' :
      change < -0.5 ? 'var(--green)' :
      'var(--gray-400)';

    const fillColor =
      change > 0.5 ? 'rgba(208, 69, 69, 0.10)' :
      change < -0.5 ? 'rgba(45, 138, 78, 0.12)' :
      'rgba(138, 147, 136, 0.10)';

    const areaPath =
      `M ${points[0]} L ${points.join(' L ')} L ${w - pad},${h - pad} L ${pad},${h - pad} Z`;
    const linePath = `M ${points.join(' L ')}`;

    const lastX = pad + (history.length - 1) * step;
    const lastY = pad + (h - pad * 2) * (1 - (history[history.length - 1] - min) / range);

    return `
      <svg class="sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
        <path d="${areaPath}" fill="${fillColor}" stroke="none" />
        <path d="${linePath}" fill="none" stroke="${color}" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="${lastX.toFixed(1)}" cy="${lastY.toFixed(1)}" r="2.5" fill="${color}" />
      </svg>
    `;
  }

  // ----- Filter + sort -----
  function getFilteredProducts() {
    const term = state.search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (state.tab !== 'all' && p.category !== state.tab) return false;
      if (term && !p.name.toLowerCase().includes(term)) return false;
      return true;
    });

    switch (state.sort) {
      case 'asc':
        list.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'desc':
        list.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'trend':
        list.sort((a, b) => Math.abs(b.weeklyChange) - Math.abs(a.weeklyChange));
        break;
      case 'alpha':
      default:
        list.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }
    return list;
  }

  // ----- Render product grid -----
  function renderProducts() {
    const grid = $('#productGrid');
    const list = getFilteredProducts();

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="emoji">🔎</div>
          <p>Aucun produit ne correspond à votre recherche.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list.map((p) => {
      const t = trendInfo(p.weeklyChange);
      const categoryBadge =
        p.category === 'fruit'
          ? '<span class="badge badge-fruit">Fruit</span>'
          : '<span class="badge badge-vegetable">Légume</span>';
      const seasonBadge = p.inSeason
        ? '<span class="badge badge-season">Saison</span>'
        : '';
      const unitLabel = p.unit === 'pièce' ? '/pièce' : '/kg';

      return `
        <article class="product-card" role="listitem" data-id="${p.id}" tabindex="0"
                 aria-label="${p.name}, ${fmtPrice(p.currentPrice)} ${unitLabel}">
          <div class="product-header">
            <div class="product-emoji" aria-hidden="true">${p.emoji}</div>
            <div class="product-badges">
              ${categoryBadge}
              ${seasonBadge}
            </div>
          </div>
          <div class="product-name">${p.name}</div>
          <div class="product-price-row">
            <div class="product-price">
              ${fmtPrice(p.currentPrice)}<span class="unit">${unitLabel}</span>
            </div>
            <span class="trend ${t.cls}" aria-label="Tendance ${t.label} de ${fmtPercent(p.weeklyChange)}">
              <span class="trend-arrow" aria-hidden="true">${t.arrow}</span>
              ${fmtPercent(p.weeklyChange)}
            </span>
          </div>
          ${buildSparkline(p.history, p.weeklyChange)}
        </article>
      `;
    }).join('');
  }

  // ----- Regional section -----
  function renderRegions() {
    const grid = $('#regionsGrid');
    grid.innerHTML = REGIONS.map((r) => {
      const cls =
        r.index < 0.98 ? 'region-cheap' :
        r.index > 1.03 ? 'region-expensive' :
        'region-avg';
      const display = r.index.toFixed(2).replace('.', ',');
      const diff = ((r.index - 1) * 100);
      const diffLabel =
        Math.abs(diff) < 0.5
          ? 'au niveau de la moyenne'
          : (diff > 0 ? `+${diff.toFixed(0)}% vs France` : `${diff.toFixed(0)}% vs France`);
      return `
        <div class="region-card" data-code="${r.code}">
          <div>
            <div class="region-name">${r.name}</div>
            <div class="stat-label" style="margin-top:.2rem;">${diffLabel}</div>
          </div>
          <span class="region-index ${cls}">${display}</span>
        </div>
      `;
    }).join('');
  }

  // ----- Seasonal section -----
  function renderSeasonal() {
    const grid = $('#seasonalGrid');
    const seasonal = PRODUCTS.filter((p) => p.inSeason);
    if (seasonal.length === 0) {
      grid.innerHTML = `<div class="empty-state"><div class="emoji">🌱</div>
        <p>Aucun produit de saison ce mois-ci.</p></div>`;
      return;
    }
    grid.innerHTML = seasonal.map((p) => {
      const unitLabel = p.unit === 'pièce' ? '/pièce' : '/kg';
      return `
        <div class="seasonal-card" data-id="${p.id}" tabindex="0">
          <span class="badge badge-season">Saison</span>
          <div class="seasonal-emoji" aria-hidden="true">${p.emoji}</div>
          <div class="seasonal-name">${p.name}</div>
          <div class="seasonal-price">${fmtPrice(p.currentPrice)}${unitLabel}</div>
        </div>
      `;
    }).join('');
  }

  // ----- Hero stats -----
  function renderStats() {
    const fruits = PRODUCTS.filter((p) => p.category === 'fruit');
    const veggies = PRODUCTS.filter((p) => p.category === 'légume');
    const avg = (arr) => arr.reduce((s, p) => s + p.currentPrice, 0) / arr.length;

    $('#statProducts').textContent = STATS.totalProducts;
    $('#statFruit').textContent = fmtPrice(avg(fruits)) + '/kg';
    $('#statVegetable').textContent = fmtPrice(avg(veggies)) + '/kg';
  }

  // ----- Modal / Chart -----
  function openModal(productId) {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) return;

    const overlay = $('#modalOverlay');
    const min = Math.min(...p.history);
    const max = Math.max(...p.history);
    const avg = p.history.reduce((s, v) => s + v, 0) / p.history.length;
    const unitLabel = p.unit === 'pièce' ? '/pièce' : '/kg';

    $('#modalEmoji').textContent = p.emoji;
    $('#modalTitle').textContent = p.name;
    $('#modalSubtitle').textContent =
      `${p.category === 'fruit' ? 'Fruit' : 'Légume'} · Évolution sur 12 semaines`;
    $('#statCurrent').textContent = fmtPrice(p.currentPrice) + unitLabel;
    $('#statMin').textContent = fmtPrice(min);
    $('#statMax').textContent = fmtPrice(max);
    $('#statAvg').textContent = fmtPrice(avg);

    if (state.modalChart) {
      state.modalChart.destroy();
      state.modalChart = null;
    }

    const ctx = $('#priceChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, 'rgba(45, 138, 78, 0.35)');
    gradient.addColorStop(1, 'rgba(45, 138, 78, 0.02)');

    state.modalChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: WEEK_LABELS,
        datasets: [{
          label: `Prix ${p.name} (€${unitLabel})`,
          data: p.history,
          borderColor: '#2d8a4e',
          backgroundColor: gradient,
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          pointBackgroundColor: '#2d8a4e',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#2a2e29',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: (item) => ` ${fmtPrice(item.parsed.y)}${unitLabel}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#5a6359', font: { size: 11 } },
          },
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              color: '#5a6359',
              font: { size: 11 },
              callback: (v) => fmtPrice(v),
            },
          },
        },
      },
    });

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = $('#modalOverlay');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (state.modalChart) {
      state.modalChart.destroy();
      state.modalChart = null;
    }
  }

  // ----- Tab switching -----
  function setTab(tab) {
    state.tab = tab;
    $$('.tab').forEach((btn) => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    const titles = {
      all: 'Tous les produits',
      fruit: 'Fruits',
      'légume': 'Légumes',
    };
    const subtitles = {
      all: 'Parcourez les prix actuels et leur évolution sur 12 semaines.',
      fruit: 'Les fruits frais disponibles sur les étals français.',
      'légume': 'Les légumes du moment, du potager au marché.',
    };
    document.querySelector('#products h2').textContent = titles[tab];
    $('#productsSubtitle').textContent = subtitles[tab];
    renderProducts();
  }

  // ----- Event bindings -----
  function bindEvents() {
    // Tab buttons
    $$('.tab').forEach((btn) => {
      btn.addEventListener('click', () => setTab(btn.dataset.tab));
    });

    // Nav category links: switch tab and scroll to products
    $$('[data-nav-tab]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const tab = link.dataset.navTab;
        setTab(tab);
      });
    });

    // Search
    $('#searchInput').addEventListener('input', (e) => {
      state.search = e.target.value;
      renderProducts();
    });

    // Sort
    $('#sortSelect').addEventListener('change', (e) => {
      state.sort = e.target.value;
      renderProducts();
    });

    // Product card click (event delegation)
    $('#productGrid').addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (card) openModal(card.dataset.id);
    });
    $('#productGrid').addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.product-card');
      if (card) {
        e.preventDefault();
        openModal(card.dataset.id);
      }
    });

    // Seasonal card click
    $('#seasonalGrid').addEventListener('click', (e) => {
      const card = e.target.closest('.seasonal-card');
      if (card) openModal(card.dataset.id);
    });
    $('#seasonalGrid').addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.seasonal-card');
      if (card) {
        e.preventDefault();
        openModal(card.dataset.id);
      }
    });

    // Modal close
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalOverlay').addEventListener('click', (e) => {
      if (e.target === $('#modalOverlay')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Mobile nav toggle
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ----- Init -----
  function init() {
    renderStats();
    renderProducts();
    renderRegions();
    renderSeasonal();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
