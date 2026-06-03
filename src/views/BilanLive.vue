<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'

const REGIONS_DATA = {
  FR: {
    id: "FR",
    flag: "🇫🇷",
    // Lien réparé : Bilan Insécurité 2024
    sourceUrl:
      "https://www.interieur.gouv.fr/Interstats/Actualites/Insecurite-et-delinquance-en-2024-bilan-statistique-et-atlas-departemental",
    // 120 (Violence narco-banditisme)
    annualDeaths: 120,
    annualNewUsers: 175000,
    annualTaxPotential: 2500000000,
    annualRepressionCost: 1100000000
  },
  EU: {
    id: "EU",
    flag: "🇪🇺",
    // Lien réparé : Rapport Européen 2025
    sourceUrl:
      "https://www.euda.europa.eu/publications/european-drug-report/2025_en",
    // Estimations violence seule (~20% du total drogue)
    annualDeaths: 1600,
    annualNewUsers: 3000000,
    annualTaxPotential: 35000000000,
    annualRepressionCost: 15000000000
  },
  WORLD: {
    id: "WORLD",
    flag: "🌍",
    // Lien réparé : Rapport Mondial 2024
    sourceUrl:
      "https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2024.html",
    // Violence Cartels + Conflits
    annualDeaths: 350000,
    annualNewUsers: 25000000,
    annualTaxPotential: 200000000000,
    annualRepressionCost: 100000000000
  }
};

// --- 3. MOTEUR LOGIQUE ---
function formatTimer(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (hours === 0 && minutes === 0) return `00:00:${pad(seconds)}`;
  if (hours === 0) return `00:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function useMultiTicker(initialRegion: keyof typeof REGIONS_DATA) {
  const currentRegion = ref<keyof typeof REGIONS_DATA>(initialRegion);
  const deathCountRaw = ref(0);
  const chillCountRaw = ref(0);
  const taxRevenueRaw = ref(0);
  const repressionCostRaw = ref(0);

  const rates = computed(() => {
    const data = REGIONS_DATA[currentRegion.value];
    const msInYear = 365.25 * 24 * 60 * 60 * 1000;
    return {
      msPerDeath: msInYear / data.annualDeaths,
      deathRatePerMs: data.annualDeaths / msInYear,
      msPerNewUser: msInYear / data.annualNewUsers,
      newUserRatePerMs: data.annualNewUsers / msInYear,
      taxPerMs: data.annualTaxPotential / msInYear,
      costPerMs: data.annualRepressionCost / msInYear
    };
  });

  const calculateInitialCounts = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diffMs = now.getTime() - startOfYear.getTime();
    return {
      deaths: diffMs * rates.value.deathRatePerMs,
      newUsers: diffMs * rates.value.newUserRatePerMs,
      tax: diffMs * rates.value.taxPerMs,
      cost: diffMs * rates.value.costPerMs
    };
  };

  let ticker: number;
  const startTicker = () => {
    if (ticker) clearInterval(ticker);
    const initials = calculateInitialCounts();
    deathCountRaw.value = initials.deaths;
    chillCountRaw.value = initials.newUsers;
    taxRevenueRaw.value = initials.tax;
    repressionCostRaw.value = initials.cost;

    ticker = setInterval(() => {
      deathCountRaw.value += rates.value.deathRatePerMs * 50;
      chillCountRaw.value += rates.value.newUserRatePerMs * 50;
      taxRevenueRaw.value += rates.value.taxPerMs * 50;
      repressionCostRaw.value += rates.value.costPerMs * 50;
    }, 50);
  };

  watch(currentRegion, () => startTicker());
  onMounted(startTicker);
  onUnmounted(() => clearInterval(ticker));

  return {
    currentRegion,
    deathCountRaw,
    chillCountRaw,
    taxRevenueRaw,
    repressionCostRaw,
    rates,
    activeRegionData: computed(() => REGIONS_DATA[currentRegion.value])
  };
}

// --- 4. APP SETUP ---


const { t } = useI18n()
const {
  deathCountRaw,
  chillCountRaw,
  taxRevenueRaw,
  repressionCostRaw,
  rates
} = useMultiTicker("FR")

onMounted(() => {
  window.scrollTo(0, 0);

  // Animation d'entrée globale
  gsap.from(".main-header > *", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  })

  gsap.from(".split-container .side", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.3
  })

  gsap.from(".vs-badge", {
    scale: 0,
    rotation: -180,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.5)",
    delay: 0.8
  })
})

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
})

const uiPanels = computed(() => {
  const isDeathUrgent = (1 - (deathCountRaw.value % 1)) * rates.value.msPerDeath < 10000
  return [
    {
      id: "left",
      cssClass: "left-side",
      title: t("bilanLive.left.title"),
      subtitle: t("bilanLive.left.subtitle"),
      metricLabel: t("bilanLive.left.metricLabel"),
      metricNote: t("bilanLive.left.metricNote"),
      financeTitle: t("bilanLive.left.financeTitle"),
      financeNote: t("bilanLive.left.financeNote"),
      timerTitle: t("bilanLive.left.timerTitle"),
      metricValue: "0",
      isTicking: false,
      financeClass: "gain",
      financePrefix: "+",
      financeValue: currencyFormatter.format(taxRevenueRaw.value),
      timerBlockClass: "chill-timer-block",
      timerColorClass: "chill-timer",
      timerValue: formatTimer((1 - (chillCountRaw.value % 1)) * rates.value.msPerNewUser),
      isUrgent: false,
      trackClass: "green-track",
      fillClass: "green-fill",
      progress: ((chillCountRaw.value % 1) * 100).toFixed(2)
    },
    {
      id: "right",
      cssClass: "right-side",
      title: t("bilanLive.right.title"),
      subtitle: t("bilanLive.right.subtitle"),
      metricLabel: t("bilanLive.right.metricLabel"),
      metricNote: t("bilanLive.right.metricNote"),
      financeTitle: t("bilanLive.right.financeTitle"),
      financeNote: t("bilanLive.right.financeNote"),
      timerTitle: t("bilanLive.right.timerTitle"),
      metricValue: Math.floor(deathCountRaw.value).toLocaleString("fr-FR"),
      isTicking: true,
      financeClass: "loss",
      financePrefix: "-",
      financeValue: currencyFormatter.format(repressionCostRaw.value),
      timerBlockClass: "death-timer-block",
      timerColorClass: "death-timer",
      timerValue: formatTimer((1 - (deathCountRaw.value % 1)) * rates.value.msPerDeath),
      isUrgent: isDeathUrgent,
      trackClass: "red-track",
      fillClass: "red-fill",
      progress: ((deathCountRaw.value % 1) * 100).toFixed(2)
    }
  ]
})
</script>

<template>
  <div class="bilan-live-wrapper pb-20">
    <div class="counter-module split-layout">

      <header class="main-header">
        <h1>{{ t('bilanLive.header.title') }}</h1>
        <p class="subtitle">{{ t('bilanLive.header.subtitle') }}</p>
      </header>

      <div class="split-container">

        <div v-for="panel in uiPanels" :key="panel.id" class="side" :class="panel.cssClass">
          <div class="side-header">
            <h2>{{ panel.title }}</h2>
            <span class="sub-label">{{ panel.subtitle }}</span>
          </div>
          <div class="metric-block">
            <div class="big-number" :class="{ ticking: panel.isTicking }">
              <div class="icon">
                <img src="/weed-leaf.svg" class="panel-bg-icon" v-if="panel.id === 'left'" />
                <img src="/skull.svg" class="panel-bg-icon" v-if="panel.id === 'right'" />
              </div>
              <span>{{ panel.metricValue }}</span>
            </div>
            <p class="metric-label">{{ panel.metricLabel }}</p>
            <p class="small-note">{{ panel.metricNote }}</p>
          </div>

          <div class="timer-block" :class="panel.timerBlockClass">
            <p class="timer-title">{{ panel.timerTitle }}</p>
            <p class="timer-display" :class="[panel.timerColorClass, { urgent: panel.isUrgent }]">
              {{ panel.timerValue }}
            </p>
            <div class="progress-track" :class="panel.trackClass">
              <div class="progress-fill" :class="panel.fillClass" :style="{ width: panel.progress + '%' }"></div>
            </div>
          </div>

          <div class="finance-block" :class="panel.financeClass">
            <p class="finance-title">{{ panel.financeTitle }}</p>
            <p class="finance-counter">
              {{ panel.financePrefix }} {{ panel.financeValue }}
            </p>
            <p class="finance-note">{{ panel.financeNote }}</p>
          </div>
        </div>

        <div class="vs-badge">
          <img src="/vs-lightning.svg" class="vs-icon" />
          <span class="vs-text">VS</span>
        </div>

      </div>

      <!-- DISCLAIMER / SOURCES -->
      <div class="mt-12 max-w-3xl mx-auto w-full px-6">
        <div class="bg-white/60 backdrop-blur-md border border-prohib-black/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-reg-green"></div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-reg-green/10 flex items-center justify-center text-reg-green">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <h3 class="font-main font-bold text-prohib-black text-sm uppercase tracking-wider">{{ t('bilanLive.disclaimer.title') }}</h3>
          </div>
          
          <ul class="space-y-3 text-left text-xs sm:text-sm font-main text-prohib-black/70">
            <li class="flex items-start gap-2">
              <span class="text-reg-green mt-0.5">•</span>
              <span v-html="t('bilanLive.disclaimer.repression')"></span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-reg-green mt-0.5">•</span>
              <span v-html="t('bilanLive.disclaimer.taxes')"></span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-reg-green mt-0.5">•</span>
              <span v-html="t('bilanLive.disclaimer.deaths')"></span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-reg-green mt-0.5">•</span>
              <span v-html="t('bilanLive.disclaimer.arrests')"></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- RETURN BUTTON -->
      <div class="text-center mt-16">
        <router-link to="/"
          class="inline-flex items-center gap-2 text-prohib-black font-bold uppercase tracking-widest hover:text-reg-green transition-all active:scale-95 active:text-reg-green">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Retour au portail
        </router-link>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.bilan-live-wrapper {
  min-height: 100vh;
  background-color: var(--poster-beige, #e4e9d5);
  background-image: radial-gradient(#d0d6c0 1px, transparent 1px);
  background-size: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&family=Share+Tech+Mono&display=swap");
$font-main: "Open Sans", sans-serif;
$font-mono: "Share Tech Mono", monospace;
/* Import de Open Sans (Texte) et Share Tech Mono (Chiffres digitaux) */


/* --- PALETTE DE L'IMAGE (Inspiration NORML) --- */
.bilan-live-wrapper {
  --poster-beige: #e4e9d5;
  /* Le fond papier */
  --prohib-black: #141414;
  /* Le côté sombre */
  --reg-green: #297534;
  /* Le vert forêt */
  --highlight-green: #4caf50;
  /* Le vert clair pour le texte sur noir */
  --text-on-light: #1a1a1a;
  --text-on-dark: #f0f0f0;
}

/* CHANGEMENT DE TYPO ICI */
$font-main: "Open Sans", sans-serif;
$font-mono: "Share Tech Mono", monospace;

@mixin digital-font {
  font-family: $font-mono;
  font-weight: bold;
  line-height: 1;
  letter-spacing: -1px;
}

/* --- RESET & BODY --- */
.bilan-live-wrapper {
  background-color: var(--poster-beige);
  color: var(--text-on-light);
  font-family: $font-main;
  margin: 0;
  min-height: 100vh;
  padding-top: 40px;
  padding-bottom: 40px;
  overflow-x: hidden;
  width: 100%;
  /* Petit grain pour effet papier */
  background-image: radial-gradient(#d0d6c0 1px, transparent 1px);
  background-size: 20px 20px;

  strong {
    font-weight: bold;
  }

}

/* --- MODULE PRINCIPAL (Style Affiche) --- */
.counter-module {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;

  .main-header {
    background: transparent;
    padding: 1rem 0 2rem 0;
    text-align: center;
    border-bottom: none;

    h1 {
      margin: 0;
      color: var(--text-on-light);
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 800;
      /* Extra Bold pour garder l'impact */
      line-height: 1;
      letter-spacing: -1px;
    }

    .subtitle {
      margin: 10px 0 0 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--prohib-black);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
}

/* --- SPLIT CONTAINER --- */
.split-container {
  display: flex;
  flex-direction: row;
  min-height: 400px;
  gap: 0;
  position: relative;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  /* L'ÉCLAIR CENTRAL "VS" */
  /* ... dans .split-container { ... */

  .vs-badge {
    position: absolute;
    left: 52%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-5deg);
    /* Légère rotation dynamique */
    z-index: 20;
    width: 100px;
    /* Taille de l'éclair */
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
    /* Ombre portée sur l'éclair */

    svg {
      width: 100%;
      height: auto;
    }

    .vs-text {
      position: absolute;
      color: #fff;
      font-family: $font-main;
      font-weight: 900;
      font-size: 2rem;
      font-style: italic;
      padding-right: 5px;
    }

    /* Sur mobile, on le centre sur la ligne de démarcation et on le réduit légèrement */
    @media (max-width: 600px) {
      display: flex;
      left: 50%;
      top: 50%;
      width: 70px;
      transform: translate(-50%, -50%) rotate(-5deg);
    }
  }
}

.side {
  flex: 1;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  position: relative;

  .side-header {
    position: relative;
    z-index: 2;
    padding-bottom: .5rem;

    h2 {
      margin: 0;
      font-size: 2rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: -1px;
    }

    .sub-label {
      display: block;
      font-size: 0.85rem;
      opacity: 0.8;
      text-transform: uppercase;
      margin-top: 5px;
      font-weight: 600;
    }
  }

  .big-number {
    position: relative;
    @include digital-font;
    font-size: 5rem;
    padding: 2.5rem 0;
    
    @media (max-width: 600px) {
      font-size: 3.5rem;
      padding: 1.5rem 0;
    }

    .icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      width: 100%;
      height: 100%;

      svg {
        height: 100%;
      }
    }
  }

  /* --- CÔTÉ GAUCHE (RÉGULATION / VERT) --- */
  &.left-side {
    background-color: var(--reg-green);
    color: var(--text-on-dark);

    @media (max-width: 600px) {
      margin-bottom: 0;
    }

    h2 {
      color: #fff;
    }

    .sub-label {
      color: #a5d6a7;
    }

    .big-number {
      .icon {
        transform: translate(-50%, -50%) scale(1.25);
      }

      span {
        color: #fff;
        text-shadow: 0 0 10px rgba(#fff, 0.4);
      }
    }
  }

  /* --- CÔTÉ DROIT (PROHIBITION / NOIR) --- */
  &.right-side {
    background-color: var(--prohib-black);
    color: var(--text-on-dark);

    @media (max-width: 600px) {
      margin-left: 0;
    }

    h2 {
      color: #fff;
    }

    .sub-label {
      color: var(--highlight-green);
    }

    .big-number {
      .icon {
        opacity: .25;
      }

      span {
        color: var(--highlight-green);
        text-shadow: 0 0 10px rgba(76, 175, 80, 0.4);
      }
    }
  }
}

/* --- BLOCS INTERNES --- */
.metric-block {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
  width: 100%;

  .metric-label {
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: uppercase;
    line-height: 1.1;
    padding-top: .5rem;
  }

  .metric-source {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 5px;
  }

  .small-note {
    font-size: 0.8rem;
    margin-top: 5px;
    line-height: 1.3;
    opacity: 0.8;
    margin-left: auto;
    margin-right: auto;
  }
}

.finance-block {
  width: 100%;
  padding: 15px;
  margin: 1rem 0;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  text-align: center;

  .finance-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    margin-bottom: 5px;
    opacity: 0.9;
  }

  .finance-counter {
    @include digital-font;
    font-size: 1.8rem;
    margin: 5px 0;
    white-space: nowrap;

    @media (max-width: 600px) {
      font-size: 1.3rem;
    }
  }

  .finance-note {
    font-size: 0.7rem;
    font-style: italic;
    opacity: 0.7;
  }

  &.gain .finance-counter {
    color: #fff;
  }

  &.loss .finance-counter {
    color: var(--highlight-green);
  }
}

.timer-block {
  width: 100%;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px dashed rgba(255, 255, 255, 0.3);

  .timer-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    margin-bottom: 5px;
    opacity: 0.8;
    font-weight: bold;
  }
}

.chill-timer,
.death-timer {
  @include digital-font;
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.chill-timer {
  color: #fff;
}

.death-timer {
  color: var(--highlight-green);

  &.urgent {
    color: #ff5252;
    animation: pulse 0.5s infinite;
  }
}

.progress-track {
  height: 8px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .green-fill {
    height: 100%;
    background: #fff;
  }

  .red-fill {
    height: 100%;
    background: var(--highlight-green);
  }
}

/* --- FOOTER & CONTROLS --- */
.controls-bar {
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .control-label {
    font-size: 0.9rem;
    color: var(--prohib-black);
    font-weight: bold;
    text-transform: uppercase;
  }

  button {
    background: transparent;
    border: 2px solid var(--prohib-black);
    color: var(--prohib-black);
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    font-family: $font-main;
    text-transform: uppercase;
    transition: all 0.1s;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    &.active {
      background: var(--prohib-black);
      color: var(--poster-beige);
    }
  }
}

footer {
  padding: 2rem 0;
  text-align: center;

  .disclaimer-toggle {
    margin-bottom: 10px;
  }

  .text-link {
    background: none;
    border: none;
    color: var(--prohib-black);
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;

    &:hover {
      color: var(--reg-green);
    }
  }

  .sources-panel {
    margin: 10px auto;
    padding: 15px;
    background: #fff;
    border: 1px solid var(--prohib-black);
    max-width: 600px;
    text-align: left;
    font-size: 0.8rem;
    color: var(--prohib-black);
    box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);

    .source-item {
      margin-bottom: 8px;

      a {
        color: var(--reg-green);
        font-weight: bold;
      }
    }
  }

  .norml-tag {
    display: flex;
    // justify-content: center;
    // align-items: center;
    max-width: 12rem;
    margin: auto;

    >* {
      flex: 1;
    }
  }
}

.lang-switcher {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 0.5rem;

  button {
    background: transparent;
    border: none;
    color: var(--prohib-black);
    opacity: 0.5;
    font-size: 0.9rem;
    font-weight: 900;
    cursor: pointer;
    padding: 2px 0;

    &:hover {
      opacity: 1;
    }

    &.active {
      opacity: 1;
      border-bottom: 3px solid var(--prohib-black);
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}




.panel-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.vs-icon {
  width: 100%;
  height: auto;
}

.norml-logo-icon {
  height: 30px;
  width: auto;
  display: inline-block;
  vertical-align: middle;
}
</style>
