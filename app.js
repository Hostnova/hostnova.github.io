/* ==========================================================================
   BLACK BIOTECHNOLOGY - INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPresentation();
  initCanvas();
  initTabs();
  updateClock();
  setInterval(updateClock, 1000);
  startBootSequence();
});

/* --- SOUND ENGINE (Web Audio API) --- */
class SoundEngine {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }
  
  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  toggle() {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) this.playAmbient();
    else this.stopAmbient();
    return this.enabled;
  }
  
  playTransition() {
    if (!this.enabled || !this.ctx) return;
    // Whoosh sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.3);
  }
  
  playBlip() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.1);
  }
  
  playAlert() {
    if (!this.enabled || !this.ctx) return;
    // Alarm for concerns slide
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.setValueAtTime(660, this.ctx.currentTime + 0.15);
    osc.frequency.setValueAtTime(440, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.5);
  }
  
  playCountdown() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.2);
  }
  
  playAmbient() {
    if (!this.enabled || !this.ctx) return;
    // Low drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start();
    this._ambientOsc = osc;
    this._ambientGain = gain;
  }
  
  stopAmbient() {
    if (this._ambientOsc) {
      this._ambientOsc.stop();
      this._ambientOsc = null;
    }
  }
}

const soundEngine = new SoundEngine();

function toggleAudio() {
  const on = soundEngine.toggle();
  const btn = document.getElementById('audio-toggle-btn');
  if (btn) {
    btn.classList.toggle('active', on);
    btn.innerHTML = on ? '🔊 AUDIO ON' : '🔇 AUDIO OFF';
  }
}

/* --- THREAT LEVEL HUD --- */
const THREAT_LEVELS = [
  { level: 'low', label: 'LOW', blocks: 1 },
  { level: 'low', label: 'LOW', blocks: 1 },
  { level: 'moderate', label: 'MODERATE', blocks: 2 },
  { level: 'moderate', label: 'MODERATE', blocks: 2 },
  { level: 'elevated', label: 'ELEVATED', blocks: 3 },
  { level: 'elevated', label: 'ELEVATED', blocks: 3 },
  { level: 'moderate', label: 'MODERATE', blocks: 2 },
  { level: 'critical', label: 'CRITICAL', blocks: 5 },
  { level: 'secured', label: 'SECURED', blocks: 4 }
];

function updateThreatLevel(slideIndex) {
  const widget = document.getElementById('threat-level-widget');
  if (!widget) return;
  const config = THREAT_LEVELS[slideIndex];
  widget.className = 'threat-level-widget ' + config.level;
  const blocks = widget.querySelectorAll('.threat-block');
  blocks.forEach((block, i) => {
    block.classList.toggle('filled', i < config.blocks);
  });
  const label = widget.querySelector('.threat-label');
  if (label) label.textContent = config.label;
}

/* --- PRESENTATION CONTROLLER STATE --- */
const STATE = {
  currentSlide: 0,
  totalSlides: 9,
  scrollCooldown: false,
  transitioning: false,
  touchStartX: 0,
  touchStartY: 0,
  headerTitles: [
    "BLACK BIOTECHNOLOGY // CORE CORE STATUS",
    "SYSTEM TELEMETRY // BRIEFING OUTLINE",
    "SECTOR 01 // BIOTECH TAXONOMY",
    "SECTOR 02 // DEFENSE & SECURITY OBJECTIVES",
    "SECTOR 03-A // APPLIED BIODEFENSE & DIAGNOSTICS",
    "SECTOR 03-B // NANO-BIOTECH & BIO-TRANSDUCTORS",
    "SECTOR 04 // EMERGENCE & FUTURE FORECASTS",
    "SECTOR 05 // SYSTEM THREAT MATRIX & RISKS",
    "OPERATIONAL CONCLUSION // MISSION COMPLIANCE"
  ]
};

function initPresentation() {
  const dotsContainer = document.getElementById('nav-dots');
  dotsContainer.innerHTML = '';
  
  for (let i = 0; i < STATE.totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = `nav-dot ${i === 0 ? 'active' : ''}`;
    dot.title = `Jump to Slide ${i + 1}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Keybindings
  window.addEventListener('keydown', handleKeyDown);
  
  // Wheel scroll with debounce
  window.addEventListener('wheel', handleWheel, { passive: false });
  
  // Touch swipe support
  window.addEventListener('touchstart', (e) => {
    STATE.touchStartX = e.touches[0].clientX;
    STATE.touchStartY = e.touches[0].clientY;
  });
  window.addEventListener('touchend', handleTouchEnd);
  
  // Set initial HUD
  goToSlide(0);

  // Initialize Slide 5 Card Toggles
  const appItems = document.querySelectorAll('.app-item');
  appItems.forEach(item => {
    item.addEventListener('click', () => {
      appItems.forEach(i => i.classList.remove('active-card'));
      item.classList.add('active-card');
    });
  });

  // Initialize Slide 6 Card Toggles
  const nanoItems = document.querySelectorAll('#slide-6 .app-detail');
  nanoItems.forEach(item => {
    item.addEventListener('click', () => {
      nanoItems.forEach(i => i.classList.remove('active-card'));
      item.classList.add('active-card');
    });
  });
}

/* --- NAVIGATION FUNCTIONS --- */
function goToSlide(index) {
  if (index < 0 || index >= STATE.totalSlides) return;
  if (STATE.transitioning && index !== STATE.currentSlide) return;
  
  const slides = document.querySelectorAll('.slide');
  const prevIndex = STATE.currentSlide;
  const direction = index > prevIndex ? 'forward' : 'backward';
  
  if (index === prevIndex && slides[index].classList.contains('active')) return;
  
  STATE.transitioning = true;
  soundEngine.playTransition();
  
  // Outgoing slide
  if (slides[prevIndex]) {
    const outgoing = slides[prevIndex];
    outgoing.classList.remove('active', 'enter-from-left');
    outgoing.classList.add(direction === 'forward' ? 'exit-to-left' : 'exit-to-right');
  }
  
  // Incoming slide
  const incoming = slides[index];
  // Reset exit classes
  incoming.classList.remove('exit-to-left', 'exit-to-right');
  
  // Set starting position before activating
  if (direction === 'backward') {
    incoming.classList.add('enter-from-left');
  }
  
  // Force reflow to register starting position
  incoming.offsetHeight;
  
  // Remove the starting position class and add active
  incoming.classList.remove('enter-from-left');
  incoming.classList.add('active');
  
  // Clean up all other slides
  slides.forEach((slide, idx) => {
    if (idx !== index && idx !== prevIndex) {
      slide.classList.remove('active', 'exit-to-left', 'exit-to-right', 'enter-from-left');
    }
  });
  
  STATE.currentSlide = index;

  // Update dots
  const dots = document.querySelectorAll('.nav-dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });

  // Update Progress
  const progressPercent = (index / (STATE.totalSlides - 1)) * 100;
  document.getElementById('presentation-progress').style.width = `${progressPercent}%`;

  // Update Indicators
  document.getElementById('current-slide-num').innerText = index + 1;
  document.getElementById('total-slides-num').innerText = STATE.totalSlides;
  document.getElementById('header-slide-title').innerText = STATE.headerTitles[index];

  // Update Threat Level HUD
  updateThreatLevel(index);

  // Update Notes
  const notesContents = document.querySelectorAll('.notes-slide-content');
  notesContents.forEach((note, idx) => {
    note.classList.toggle('active-notes', idx === index);
  });

  // Canvas state
  if (window.changeCanvasState) {
    window.changeCanvasState(index);
  }

  // Auto trigger telemetry graph animation if on slide 7
  if (index === 6) {
    animateTelemetryGraph();
  }
  
  // Fire per-slide entry hooks
  onSlideEnter(index);

  // Release transition lock
  setTimeout(() => {
    STATE.transitioning = false;
    // Clean up outgoing slide classes
    if (slides[prevIndex] && prevIndex !== index) {
      slides[prevIndex].classList.remove('exit-to-left', 'exit-to-right');
    }
  }, 700);
}

function nextSlide() {
  if (STATE.currentSlide < STATE.totalSlides - 1) {
    goToSlide(STATE.currentSlide + 1);
  }
}

function prevSlide() {
  if (STATE.currentSlide > 0) {
    goToSlide(STATE.currentSlide - 1);
  }
}

/* --- EVENT HANDLERS --- */
function handleKeyDown(e) {
  // Ignore inputs if typing in standard elements (though we don't have text inputs in slide view)
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.key) {
    case 'ArrowRight':
    case ' ':
    case 'PageDown':
      nextSlide();
      e.preventDefault();
      break;
    case 'ArrowLeft':
    case 'PageUp':
    case 'Backspace':
      prevSlide();
      e.preventDefault();
      break;
    case 'n':
    case 'N':
      toggleNotes();
      break;
    case 'h':
    case 'H':
      toggleShortcuts();
      break;
    case 'Escape':
      closeDrawers();
      break;
    default:
      // Number keys 1-9
      if (e.key >= '1' && e.key <= '9') {
        goToSlide(parseInt(e.key) - 1);
      }
      break;
  }
}

function handleWheel(e) {
  // If user is inside notes drawer or scrollable card, do not scroll slides
  if (e.target.closest('.notes-drawer') || e.target.closest('.scrollable-y') || e.target.closest('.matrix-list')) return;
  
  e.preventDefault();
  
  if (STATE.scrollCooldown) return;
  
  STATE.scrollCooldown = true;
  setTimeout(() => { STATE.scrollCooldown = false; }, 1000); // 1 sec cooldown
  
  if (e.deltaY > 0) {
    nextSlide();
  } else if (e.deltaY < 0) {
    prevSlide();
  }
}

function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  
  const diffX = touchEndX - STATE.touchStartX;
  const diffY = touchEndY - STATE.touchStartY;
  
  // Check if horizontal swipe is dominant and significant
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
    if (diffX < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

/* --- OVERLAY TOGGLES --- */
function toggleNotes() {
  const drawer = document.getElementById('notes-drawer');
  drawer.classList.toggle('open');
  const btn = document.getElementById('toggle-notes-btn');
  btn.style.borderColor = drawer.classList.contains('open') ? 'var(--cyan-primary)' : 'rgba(255,255,255,0.1)';
}

function toggleShortcuts() {
  const modal = document.getElementById('shortcuts-modal');
  modal.classList.toggle('open');
}

function closeDrawers() {
  document.getElementById('notes-drawer').classList.remove('open');
  document.getElementById('shortcuts-modal').classList.remove('open');
  document.getElementById('toggle-notes-btn').style.borderColor = 'rgba(255,255,255,0.1)';
}

function updateClock() {
  const now = new Date();
  const timeStr = now.toUTCString().replace('GMT', 'UTC');
  document.getElementById('current-time').innerText = timeStr;
}

/* --- TYPEWRITER EFFECT --- */
function typewriterEffect(element, text, speed = 40, callback = null) {
  if (!element) return;
  element.innerHTML = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor-blink';
  element.appendChild(cursor);
  
  function type() {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }
  type();
}

/* --- COUNT-UP ANIMATION --- */
function countUpAnimation(element, target, duration = 1500, suffix = '') {
  if (!element) return;
  const startTime = performance.now();
  const isFloat = String(target).includes('.');
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = easedProgress * target;
    
    element.textContent = (isFloat ? currentValue.toFixed(1) : Math.floor(currentValue)) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

/* --- PER-SLIDE ENTRY HOOKS --- */
function onSlideEnter(slideIndex) {
  // Slide 1: Glitch the BLACK title
  if (slideIndex === 0) {
    const blackTitle = document.querySelector('#slide-1 .main-title');
    if (blackTitle) {
      blackTitle.classList.remove('glitch-on-entry');
      void blackTitle.offsetWidth;
      blackTitle.classList.add('glitch-on-entry');
    }
  }
  
  // Slide 5: Red laser scan
  if (slideIndex === 4) {
    const overlay = document.getElementById('laser-scan-overlay');
    if (overlay) {
      const line = overlay.querySelector('.laser-line');
      if (line) {
        line.style.animation = 'none';
        void line.offsetWidth;
        line.style.animation = '';
      }
    }
  }
  
  // Slide 7: Animate telemetry + count-up stats
  if (slideIndex === 6) {
    animateTelemetryGraph();
    // Count-up animations for stats
    countUpAnimation(document.getElementById('stat-mut-ratio'), 1.4, 1500, '%');
    countUpAnimation(document.getElementById('stat-efficacy'), 99.82, 2000, '%');
    countUpAnimation(document.getElementById('stat-latency'), 4.2, 1000, ' ms');
  }
  
  // Slide 8: Red flash + alert sound
  if (slideIndex === 7) {
    const flash = document.getElementById('red-flash-overlay');
    if (flash) {
      flash.classList.remove('active');
      void flash.offsetWidth;
      flash.classList.add('active');
    }
    soundEngine.playAlert();
  }
  
  // Slide 9: Countdown + typewriter + classified stamp
  if (slideIndex === 8) {
    runConclusionSequence();
  }
}

/* --- CONCLUSION COUNTDOWN SEQUENCE --- */
function runConclusionSequence() {
  const countdownEl = document.getElementById('countdown-overlay');
  const stampEl = document.getElementById('classified-stamp');
  const terminal = document.getElementById('mission-terminal-text');
  
  if (!countdownEl) {
    // Fallback: just do the typewriter
    if (terminal) {
      setTimeout(() => {
        typewriterEffect(terminal, 
          '> MISSION_STATUS: COMPLETE // ALL SECTORS BRIEFED // BIOSECURITY PROTOCOLS LOADED // SYSTEM STANDING BY FOR OPERATOR REVIEW...', 
          30);
      }, 800);
    }
    return;
  }
  
  let count = 5;
  countdownEl.style.display = 'flex';
  
  function tick() {
    if (count <= 0) {
      countdownEl.style.display = 'none';
      // Show classified stamp
      if (stampEl) {
        stampEl.classList.remove('active');
        void stampEl.offsetWidth;
        stampEl.classList.add('active');
      }
      // Typewriter
      if (terminal) {
        setTimeout(() => {
          typewriterEffect(terminal, 
            '> MISSION_STATUS: COMPLETE // ALL SECTORS BRIEFED // BIOSECURITY PROTOCOLS LOADED // SYSTEM STANDING BY FOR OPERATOR REVIEW...', 
            30);
        }, 600);
      }
      return;
    }
    
    countdownEl.innerHTML = '';
    const numEl = document.createElement('span');
    numEl.className = 'countdown-number';
    numEl.textContent = count;
    countdownEl.appendChild(numEl);
    soundEngine.playCountdown();
    
    count--;
    setTimeout(tick, 700);
  }
  
  setTimeout(tick, 400);
}

/* --- TAB CONTROLLER (SLIDE 3) --- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Update active btn
      btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active content
      const tabContainer = btn.closest('.tab-interface');
      tabContainer.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });
}

/* --- PCR JBAIDS DIAGNOSTIC SIMULATOR (SLIDE 5) --- */
let jbaidsRunning = false;
function runJbaidsSim() {
  if (jbaidsRunning) return;
  jbaidsRunning = true;
  
  const terminal = document.getElementById('visual-jbaids');
  terminal.innerHTML = '';
  
  const addLine = (text, type = '', delay = 0) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.innerHTML = text;
        if (type) p.className = type;
        terminal.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
        resolve();
      }, delay);
    });
  };

  const threatResults = [
    { name: "Bacillus anthracis (Anthrax)", code: "BA_PLASMIDS_PX01_PX02", risk: "CRITICAL ALERT // CLASS A VECTOR DETECTED", type: "terminal-red animate-pulse" },
    { name: "Yersinia pestis (Plague)", code: "YP_CHROMOSOME_YMT", risk: "CRITICAL ALERT // HIGH MORTALITY VECTOR DETECTED", type: "terminal-red animate-pulse" },
    { name: "Francisella tularensis (Tularemia)", code: "FT_TUL_LVS", risk: "CRITICAL ALERT // LOW INFECTIOUS DOSE PATHOGEN DETECTED", type: "terminal-red animate-pulse" },
    { name: "No Threat Detected", code: "GENERIC_ENVIRONMENTAL_BACILLUS", risk: "SYSTEM CLEAR // NO BIOTREAT MARKERS FOUND", type: "terminal-green" }
  ];

  const result = threatResults[Math.floor(Math.random() * threatResults.length)];

  addLine("&gt; Initializing JBAIDS PCR Assay cartridge...", "terminal-cyan", 200)
    .then(() => addLine("&gt; Calibrating thermal sensors... Done. [37.4°C]", "", 500))
    .then(() => addLine("&gt; Initiating genomic amplification cycle (35 cycles)...", "terminal-gold", 700))
    .then(() => addLine("&gt; Cycling: [1]... [10]... [25]... [35]", "", 800))
    .then(() => addLine("&gt; Amplification complete. Extracting target fluorophores...", "", 600))
    .then(() => addLine("&gt; Primer Matching Sequence: 5'-ATGCGTAC-3' vs Database Matrix...", "terminal-cyan", 600))
    .then(() => addLine("&gt; Analysing fluorescence thresholds...", "", 500))
    .then(() => addLine("&gt; --------------------------------------------------", "", 300))
    .then(() => addLine(`&gt; BIO-THREAT TARGET: ${result.name.toUpperCase()}`, result.type, 400))
    .then(() => addLine(`&gt; GENOMIC ATTRIBUTION CODE: ${result.code}`, "terminal-gold", 300))
    .then(() => addLine(`&gt; CONCLUSION: ${result.risk}`, result.type, 300))
    .then(() => {
      jbaidsRunning = false;
    });
}

function resetJbaidsSim() {
  if (jbaidsRunning) return;
  const terminal = document.getElementById('visual-jbaids');
  terminal.innerHTML = `
    <p class="terminal-cyan">&gt; JBAIDS_OS v4.81 Initialized...</p>
    <p>&gt; Ready for environmental sample analysis.</p>
    <p>&gt; Click "INJECT SAMPLE" to initiate PCR scan.</p>
  `;
}

/* --- APPLIED BIODEFENSE VISUAL TOGGLE (SLIDE 5) --- */
function setAppVisual(mode) {
  const jbaidsVisual = document.getElementById('visual-jbaids');
  const bsl4Visual = document.getElementById('visual-bsl4');
  
  if (!jbaidsVisual || !bsl4Visual) return;
  
  jbaidsVisual.classList.remove('active-visual');
  bsl4Visual.classList.remove('active-visual');
  
  if (mode === 'jbaids') {
    jbaidsVisual.classList.add('active-visual');
    document.getElementById('app-panel-title').innerText = "MOCK SYSTEM: JBAIDS DIAGNOSTIC SIMULATOR";
    document.getElementById('app-panel-tag').innerText = "STANDBY";
    document.getElementById('app-panel-tag').className = "panel-tag red animate-pulse";
    document.getElementById('app-panel-controls').style.display = 'flex';
  } else if (mode === 'bsl4') {
    bsl4Visual.classList.add('active-visual');
    document.getElementById('app-panel-title').innerText = "CONTAINMENT: BSL-4 FACILITY GRAPHIC";
    document.getElementById('app-panel-tag').innerText = "HIGH BIO-HAZARD";
    document.getElementById('app-panel-tag').className = "panel-tag purple";
    document.getElementById('app-panel-controls').style.display = 'none';
  }
}

/* --- NANO VISUAL TOGGLE (SLIDE 6) --- */
function setNanoVisual(mode) {
  const cntVisual = document.getElementById('visual-cnt');
  const melaninVisual = document.getElementById('visual-melanin');
  
  if (!cntVisual || !melaninVisual) return;
  
  cntVisual.classList.remove('active-visual');
  melaninVisual.classList.remove('active-visual');
  
  if (mode === 'cnt') {
    cntVisual.classList.add('active-visual');
    document.getElementById('nano-panel-title').innerText = "VISUALIZATION: CARBON NANOTUBE";
    document.getElementById('nano-panel-tag').innerText = "LATTICE SCHEMATIC";
    document.getElementById('nano-panel-tag').className = "panel-tag gold";
    document.getElementById('nano-panel-desc').innerText = "CNT geometries are projected onto cylinders to act as high-efficiency bio-transducers.";
  } else if (mode === 'melanin') {
    melaninVisual.classList.add('active-visual');
    document.getElementById('nano-panel-title').innerText = "VISUALIZATION: MELANIN NANOPARTICLES";
    document.getElementById('nano-panel-tag').innerText = "POLYMER MATRIX";
    document.getElementById('nano-panel-tag').className = "panel-tag purple";
    document.getElementById('nano-panel-desc').innerText = "Recombinant melanin assemblies bind heavy metal ions with high affinity.";
  }
}

/* --- MELANIN BIOSENSOR DETECTOR SLIDER (SLIDE 6) --- */
function updateMelaninSensor() {
  const metal = document.getElementById('metal-select').value;
  const level = document.getElementById('metal-level').value;
  document.getElementById('metal-level-val').innerText = level;
  
  const readout = document.getElementById('melanin-readout');
  
  let capacity = "optimal binding range";
  let colorClass = "terminal-green";
  let percent = parseInt(level);
  
  if (percent > 70) {
    capacity = "SATURATION LEVEL // SENSOR LIMIT BREACHED";
    colorClass = "terminal-red animate-pulse";
  } else if (percent > 40) {
    capacity = "moderate binding chelation response";
    colorClass = "terminal-gold";
  } else {
    capacity = "optimal low-concentration binding chelation";
    colorClass = "terminal-cyan";
  }
  
  let symbol = "Pb²⁺";
  if (metal === "Cu") symbol = "Cu²⁺";
  if (metal === "Fe") symbol = "Fe³⁺";
  
  readout.innerHTML = `<span class="${colorClass}">[${symbol} DETECTOR] Chelation Level: ${percent}%. Status: ${capacity}. Signal: ${Math.round(percent * 2.4)} μA response.</span>`;
}

/* --- FUTURE HORIZONS TELEMETRY SIMULATOR (SLIDE 7) --- */
const futurePanels = [
  {
    title: "TELEMETRY: CRISPR BIODEFENSE",
    mutRatio: "1.4%",
    efficacy: "99.82%",
    latency: "4.2 ms",
    desc: "// Active simulation mapping targeted Cas9/Cas12 endonuclease efficiency against weaponized synthetic constructs.",
    color: "#00e5ff",
    points: "M 0,150 Q 100,50 200,100 T 400,30 T 500,120"
  },
  {
    title: "TELEMETRY: SYNBIOTIC SUIT SHIELDS",
    mutRatio: "0.2%",
    efficacy: "94.50%",
    latency: "1.8 s",
    desc: "// Bio-membrane telemetry measuring enzyme neutralization rates against airborne neuro-toxin threat aerosols.",
    color: "#30d158",
    points: "M 0,180 C 120,180 180,60 300,80 S 420,120 500,40"
  },
  {
    title: "TELEMETRY: MELANIN CANCER THERAPY",
    mutRatio: "0.0%",
    efficacy: "88.19%",
    latency: "120 s",
    desc: "// Photothermal conversion graph mapping near-infrared laser exposure of melanin nanoparticles in tumor cells.",
    color: "#bf5af2",
    points: "M 0,100 Q 150,150 250,50 T 500,180"
  },
  {
    title: "TELEMETRY: AI OUTBREAK SURVEILLANCE",
    mutRatio: "8.6%",
    efficacy: "91.20%",
    latency: "0.8 ms",
    desc: "// Predictive neural network plotting zoonotic mutation streams and environmental spillover indices globally.",
    color: "#D4AF37",
    points: "M 0,160 Q 100,150 200,60 T 400,50 T 500,20"
  }
];

function setFuturePanel(idx) {
  const panel = futurePanels[idx];
  
  // Toggle card actives
  const items = document.querySelectorAll('.future-item');
  items.forEach((item, i) => {
    if (i === idx) {
      item.classList.add('active-card');
    } else {
      item.classList.remove('active-card');
    }
  });

  // Update panels
  document.getElementById('future-panel-title').innerText = panel.title;
  document.getElementById('stat-mut-ratio').innerText = panel.mutRatio;
  document.getElementById('stat-efficacy').innerText = panel.efficacy;
  document.getElementById('stat-latency').innerText = panel.latency;
  document.getElementById('future-panel-desc').innerText = panel.desc;

  // Set colors
  const statValMut = document.getElementById('stat-mut-ratio');
  const statValEff = document.getElementById('stat-efficacy');
  
  statValMut.style.color = panel.color;
  statValEff.style.color = panel.color === '#D4AF37' ? '#00e5ff' : 'var(--gold-primary)';

  // Animate SVG Line
  const line = document.getElementById('telemetry-line');
  if (line) {
    line.setAttribute('stroke', panel.color);
    line.setAttribute('d', panel.points);
  }
  
  // Toggle active visual wrappers
  const graphVisual = document.getElementById('visual-graph');
  const melaninVisual = document.getElementById('visual-melanin-therapy');
  const aiVisual = document.getElementById('visual-ai-map');

  if (graphVisual && melaninVisual && aiVisual) {
    graphVisual.classList.remove('active-visual');
    melaninVisual.classList.remove('active-visual');
    aiVisual.classList.remove('active-visual');

    if (idx === 0 || idx === 1) {
      graphVisual.classList.add('active-visual');
    } else if (idx === 2) {
      melaninVisual.classList.add('active-visual');
    } else if (idx === 3) {
      aiVisual.classList.add('active-visual');
    }
  }

  animateTelemetryGraph();
}

function animateTelemetryGraph() {
  const line = document.getElementById('telemetry-line');
  if (!line) return;
  
  const length = line.getTotalLength();
  line.style.transition = 'none';
  line.style.strokeDasharray = length + ' ' + length;
  line.style.strokeDashoffset = length;
  line.getBoundingClientRect();
  line.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  line.style.strokeDashoffset = '0';
  
  // Add glow filter
  line.style.filter = 'drop-shadow(0 0 6px ' + (line.getAttribute('stroke') || '#00e5ff') + ')';
  
  // Animate secondary line too
  const secondary = document.getElementById('telemetry-line-secondary');
  if (secondary) {
    const len2 = secondary.getTotalLength();
    secondary.style.transition = 'none';
    secondary.style.strokeDasharray = len2 + ' ' + len2;
    secondary.style.strokeDashoffset = len2;
    secondary.getBoundingClientRect();
    secondary.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s';
    secondary.style.strokeDashoffset = '0';
  }
}

/* ==========================================================================
   DYNAMIC ADAPTIVE CANVAS BACKGROUND PARTICLE ENGINE
   ========================================================================== */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 80;
  
  // Particle variables
  let particleColor = 'rgba(212, 175, 55, 0.2)'; // Gold default
  let lineColor = 'rgba(212, 175, 55, 0.05)';
  let drawType = 'mesh'; // mesh, cubes, helix, hexagons, grid, warning, vortex
  let speedMultiplier = 1;

  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.1;
      
      // Helix variables
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = 0.01 + Math.random() * 0.01;
      this.rangeY = height * 0.2;
    }
    
    update() {
      if (drawType === 'matrix') {
        this.y += (1.5 + this.radius) * speedMultiplier;
        if (this.y - 150 > height) {
          this.y = -20;
          this.x = Math.random() * width;
        }
      }
      else if (drawType === 'vortex') {
        // Spiral path around center
        const cx = width / 2;
        const cy = height / 2;
        const dx = this.x - cx;
        const dy = this.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 10) {
          this.reset();
          return;
        }
        
        // Circular force + spiral pull
        const force = 0.5 * speedMultiplier;
        const angle = Math.atan2(dy, dx) + 0.01 * speedMultiplier;
        const targetRadius = dist - 0.5 * speedMultiplier;
        
        this.x = cx + Math.cos(angle) * targetRadius;
        this.y = cy + Math.sin(angle) * targetRadius;
      } 
      else if (drawType === 'helix') {
        // Sine wave movements
        this.angle += this.angularSpeed * speedMultiplier;
        this.x += 1 * speedMultiplier;
        this.y = (height / 2) + Math.sin(this.angle) * this.rangeY;
        
        if (this.x > width) {
          this.x = 0;
          this.y = (height / 2) + Math.sin(this.angle) * this.rangeY;
        }
      } 
      else {
        // Standard random linear drift
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;
        
        // Bounce or wrap bounds
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }
    }
    
    draw() {
      ctx.beginPath();
      
      if (drawType === 'matrix') {
        // Draw falling DNA matrix streams
        ctx.font = '14px var(--font-mono)';
        const trailLength = 8;
        const charSpacing = 16;
        
        for (let i = 0; i < trailLength; i++) {
          const charY = this.y - (i * charSpacing);
          if (charY < 0 || charY > height) continue;
          
          const chars = ['A', 'T', 'C', 'G'];
          const charIdx = Math.floor((this.x + charY + Date.now() / 150) / 30) % 4;
          const char = chars[charIdx];
          
          let opacity = (1 - (i / trailLength)) * this.alpha;
          let color;
          
          if (i === 0) {
            color = `rgba(255, 255, 255, ${opacity * 1.5})`;
          } else {
            color = particleColor.replace(/[\d.]+\)/, `${opacity})`);
          }
          
          ctx.fillStyle = color;
          ctx.fillText(char, this.x, charY);
        }
      }
      else if (drawType === 'cubes') {
        // Small data blocks
        ctx.fillStyle = particleColor;
        ctx.fillRect(this.x, this.y, this.radius * 2, this.radius * 2);
      } 
      else if (drawType === 'warning') {
        // Warning triangle particles
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y - this.radius * 2);
        ctx.lineTo(this.x + this.radius * 2, this.y + this.radius * 2);
        ctx.lineTo(this.x - this.radius * 2, this.y + this.radius * 2);
        ctx.closePath();
        ctx.stroke();
      }
      else if (drawType === 'biohazard') {
        ctx.font = (this.radius * 8) + 'px sans-serif';
        ctx.fillStyle = particleColor;
        const symbols = ['☣', '⚠', '☢'];
        const idx = Math.floor(this.x * 0.01) % 3;
        ctx.fillText(symbols[idx], this.x, this.y);
      }
      else {
        // Standard glowing dots
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Canvas States Changer
  window.changeCanvasState = (slideIdx) => {
    switch (slideIdx) {
      case 0: // Cover: Amber molecular mesh
        particleColor = 'rgba(212, 175, 55, 0.2)';
        lineColor = 'rgba(212, 175, 55, 0.05)';
        drawType = 'mesh';
        speedMultiplier = 0.8;
        break;
      case 1: // Outline: DNA Matrix stream
        particleColor = 'rgba(0, 229, 255, 0.4)';
        lineColor = 'rgba(0, 229, 255, 0.03)';
        drawType = 'matrix';
        speedMultiplier = 1.2;
        break;
      case 2: // Meaning: DNA Helix curves
        particleColor = 'rgba(212, 175, 55, 0.25)';
        lineColor = 'rgba(212, 175, 55, 0.08)';
        drawType = 'helix';
        speedMultiplier = 1.2;
        break;
      case 3: // Objectives: Biohazard symbols
        particleColor = 'rgba(48, 209, 88, 0.2)';
        lineColor = 'rgba(48, 209, 88, 0.04)';
        drawType = 'biohazard';
        speedMultiplier = 0.7;
        break;
      case 4: // Apps I: Red scanning lines
        particleColor = 'rgba(255, 59, 48, 0.2)';
        lineColor = 'rgba(255, 59, 48, 0.06)';
        drawType = 'grid';
        speedMultiplier = 1.5;
        break;
      case 5: // Apps II: Carbon Nanotubes
        particleColor = 'rgba(212, 175, 55, 0.15)';
        lineColor = 'rgba(212, 175, 55, 0.03)';
        drawType = 'mesh';
        speedMultiplier = 0.5;
        break;
      case 6: // Future: Cyan and Gold mesh
        particleColor = 'rgba(0, 229, 255, 0.2)';
        lineColor = 'rgba(212, 175, 55, 0.05)';
        drawType = 'mesh';
        speedMultiplier = 1.1;
        break;
      case 7: // Concerns: Red Matrix stream
        particleColor = 'rgba(255, 59, 48, 0.4)';
        lineColor = 'rgba(255, 59, 48, 0.03)';
        drawType = 'matrix';
        speedMultiplier = 1.4;
        break;
      case 8: // Conclusion: Gold and Cyan Vortex
        particleColor = 'rgba(0, 229, 255, 0.2)';
        lineColor = 'rgba(212, 175, 55, 0.06)';
        drawType = 'vortex';
        speedMultiplier = 1.4;
        break;
      default:
        break;
    }
  };

  // Rendering Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Custom background grid updates or overlays
    if (drawType === 'grid') {
      // Draw dynamic laser scanning grid lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      
      const spacing = 100;
      const offset = (Date.now() / 20) % spacing;
      
      for (let x = offset; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = offset; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
    
    // Draw and connect particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      if (drawType === 'mesh' || drawType === 'helix' || drawType === 'vortex' || drawType === 'biohazard') {
        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let maxDist = 120;
          if (drawType === 'helix') maxDist = 80;
          if (drawType === 'vortex') maxDist = 90;
          
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = (1 - dist / maxDist) * 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* ==========================================================================
   SYSTEM BOOT LOADING SEQUENCE
   ========================================================================== */
const BOOT_LOGS = [
  "SYS: INITIATING SYSTEM BOOT SEQUENCE...",
  "SYS: DECRYPTING CLASSIFIED BIO-TELEMETRY...",
  "SYS: ESTABLISHING SECURE CONNECTION TO USAMRIID SERVER [OK]",
  "SYS: LOADING PATHOGEN SURVEILLANCE DATA... 4.8 TB [OK]",
  "SYS: DETECTING BIOSAFETY LEVEL-4 PROTOCOLS... ACTIVE [OK]",
  "SYS: BOOTING JBAIDS PCR ANALYZER DIAGNOSTICS... READY",
  "SYS: ALIGNING CRISPR-CAS9 GENETIC TARGETING SCROLLS...",
  "SYS: RUNNING DETERMINISTIC THREAT VECTOR SIMULATION...",
  "SYS: DEPLOYING COUNTERMEASURE SCENE... READY",
  "SYS: SYSTEM CLASSIFIED // LEVEL 5 ACCESS GRANTED."
];

function startBootSequence() {
  const terminal = document.getElementById('boot-terminal');
  const loaderBar = document.getElementById('boot-loader-bar');
  const percentageVal = document.getElementById('boot-percentage');
  const bootScreen = document.getElementById('boot-screen');
  
  if (!terminal || !loaderBar || !percentageVal || !bootScreen) return;
  
  let currentLogIdx = 0;
  let percent = 0;
  
  const totalDuration = 2500;
  const intervalTime = 25;
  const steps = totalDuration / intervalTime;
  const percentStep = 100 / steps;
  
  const timer = setInterval(() => {
    percent += percentStep;
    if (percent >= 100) {
      percent = 100;
      clearInterval(timer);
      
      printNextLog();
      setTimeout(() => {
        bootScreen.classList.add('loaded');
        setTimeout(() => {
          goToSlide(0);
        }, 300);
      }, 500);
    }
    
    percentageVal.innerText = `${Math.floor(percent)}%`;
    loaderBar.style.width = `${percent}%`;
    
    const triggerThreshold = (100 / BOOT_LOGS.length) * currentLogIdx;
    if (percent >= triggerThreshold && currentLogIdx < BOOT_LOGS.length) {
      printNextLog();
    }
  }, intervalTime);
  
  function printNextLog() {
    if (currentLogIdx >= BOOT_LOGS.length) return;
    const p = document.createElement('p');
    p.innerHTML = `&gt; ${BOOT_LOGS[currentLogIdx]}`;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
    soundEngine.playBlip();
    currentLogIdx++;
  }
}
