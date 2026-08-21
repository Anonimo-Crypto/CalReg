// CalisBros - App principal (uso personal)
// Desarrollado por Oscar Antonio Alvarez Collado

const App = {
  currentView: 'home',
  currentWorkout: null,
  restTimer: null,
  restSecondsLeft: 0,
  sessionTimer: null,
  restAlarmPlayed: false,
  progressDetailId: null,

  init() {
    this.applyTheme();
    if (!Storage.getUser()) {
      this.showOnboarding();
      return;
    }
    this.checkAgeBirthday();
    this.render();
    this.showOfflineBannerIfNeeded();
  },

  showOfflineBannerIfNeeded() {
    if (localStorage.getItem('calisbros_offline_ready')) return;
    // Mark after SW claims or after short delay
    setTimeout(() => {
      if (localStorage.getItem('calisbros_offline_ready')) return;
      const bar = document.createElement('div');
      bar.id = 'offline-banner';
      bar.className = 'offline-banner';
      bar.innerHTML = `
        <div class="offline-banner-inner">
          <strong>Listo sin conexión</strong>
          <p>CalisBros se ha descargado en este dispositivo. Solo necesitabas Internet la primera vez.</p>
          <button class="btn btn-primary btn-sm" id="offline-ok">Entendido</button>
        </div>`;
      document.body.appendChild(bar);
      bar.querySelector('#offline-ok').onclick = () => {
        localStorage.setItem('calisbros_offline_ready', '1');
        bar.remove();
      };
    }, 1200);
  },

  applyTheme() {
    const s = Storage.getSettings();
    document.documentElement.setAttribute('data-theme', s.theme || 'dark');
    document.documentElement.style.setProperty('--accent', s.accent || '#f97316');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = s.theme === 'light' ? '#f4f6fa' : '#0b1120';
  },


  // ---------- CUSTOM UI (sin alert/confirm nativos) ----------
  showToast(msg, ms = 2600) {
    document.getElementById('app-toast')?.remove();
    const t = document.createElement('div');
    t.id = 'app-toast';
    t.className = 'app-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 280);
    }, ms);
  },

  showAlert(title, message) {
    return new Promise(resolve => {
      document.getElementById('app-dialog')?.remove();
      const m = document.createElement('div');
      m.id = 'app-dialog';
      m.className = 'modal-bg';
      m.innerHTML = `
        <div class="modal dialog-modal">
          <div class="modal-head"><h3>${this.escape(title)}</h3></div>
          <div class="modal-body">
            <p class="dialog-msg">${this.escape(message)}</p>
            <button class="btn btn-primary btn-full" id="dlg-ok">Entendido</button>
          </div>
        </div>`;
      document.body.appendChild(m);
      m.querySelector('#dlg-ok').onclick = () => { m.remove(); resolve(); };
    });
  },

  showConfirm(title, message, okLabel = 'Confirmar', cancelLabel = 'Cancelar') {
    return new Promise(resolve => {
      document.getElementById('app-dialog')?.remove();
      const m = document.createElement('div');
      m.id = 'app-dialog';
      m.className = 'modal-bg';
      m.innerHTML = `
        <div class="modal dialog-modal">
          <div class="modal-head"><h3>${this.escape(title)}</h3></div>
          <div class="modal-body">
            <p class="dialog-msg">${this.escape(message)}</p>
            <div class="dialog-actions">
              <button class="btn btn-outline" id="dlg-cancel">${this.escape(cancelLabel)}</button>
              <button class="btn btn-primary" id="dlg-ok">${this.escape(okLabel)}</button>
            </div>
          </div>
        </div>`;
      document.body.appendChild(m);
      m.querySelector('#dlg-cancel').onclick = () => { m.remove(); resolve(false); };
      m.querySelector('#dlg-ok').onclick = () => { m.remove(); resolve(true); };
    });
  },

  playAlarm() {
    try {
      if (this._alarmAudio) {
        this._alarmAudio.pause();
        this._alarmAudio.currentTime = 0;
      }
      const audio = new Audio('./audio/alarm.mp3');
      audio.preload = 'auto';
      audio.volume = 1;
      this._alarmAudio = audio;
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => this.playAlarmFallback());
    } catch (_) {
      this.playAlarmFallback();
    }
  },

  playAlarmFallback() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      [0, 0.22, 0.44].forEach((delay, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = i === 2 ? 880 : 660;
        g.gain.setValueAtTime(0.0001, now + delay);
        g.gain.exponentialRampToValueAtTime(0.35, now + delay + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.18);
        o.connect(g); g.connect(ctx.destination);
        o.start(now + delay);
        o.stop(now + delay + 0.2);
      });
      setTimeout(() => ctx.close?.(), 1200);
    } catch (_) { /* offline-safe */ }
  },

  formatDuration(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  },

  dayName(iso) {
    try {
      return new Date(iso).toLocaleDateString('es', { weekday: 'long' });
    } catch { return ''; }
  },

  checkAgeBirthday() {
    const user = Storage.getUser();
    if (!user?.birthDate) return;
    const today = new Date();
    const b = new Date(user.birthDate + 'T00:00:00');
    if (today.getMonth() !== b.getMonth() || today.getDate() !== b.getDate()) return;
    const year = today.getFullYear();
    if (user.lastAgeBumpYear === year) return;
    if (user.age != null) user.age = Number(user.age) + 1;
    user.lastAgeBumpYear = year;
    Storage.saveUser(user);
    this.showToast(`¡Feliz cumpleaños! Edad actualizada: ${user.age}`);
  },

  needsBodyUpdate() {
    const user = Storage.getUser();
    if (!user) return false;
    const last = user.lastBodyUpdate || user.createdAt;
    if (!last) return true;
    const days = (Date.now() - new Date(last).getTime()) / 86400000;
    return days >= 30;
  },


  getExerciseOptions(e) {
    if (!e) return { grips: [], variations: [] };
    const grips = Array.isArray(e.grips) ? [...e.grips] : [];
    const variations = Array.isArray(e.variations) ? [...e.variations] : [];
    // Defaults for classic pull/push skills if catalog lacks them
    const defaults = {
      'pull-up': ['Prone', 'Supine', 'Neutral', 'False grip (prone)', 'False grip (supine)', 'False grip (neutral)', 'L-sit'],
      'chin-up': ['Supine', 'Narrow', 'Wide'],
      'muscle-up': ['Prone', 'Supine', 'False grip', 'False grip (prone)', 'False grip (supine)', 'Mixed grip'],
      'dip': ['Parallel bars', 'Rings', 'Korean dips'],
      'push-up': ['Standard', 'Diamond', 'Wide', 'Archer'],
      'front-lever': ['Prone', 'Supine', 'Neutral', 'False grip'],
      'back-lever': ['Prone', 'False grip'],
      'human-flag': ['Prone', 'Supine', 'Neutral'],
      'handstand': ['Floor', 'Parallettes', 'Wall-assisted'],
      'free-handstand': ['Floor', 'Parallettes'],
      'l-sit': ['Floor', 'Parallettes', 'Rings'],
    };
    if (!grips.length && defaults[e.id]) grips.push(...defaults[e.id]);
    return { grips, variations };
  },

  // ---------- HELPERS ----------
  escape(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  },

  daysTraining(startDate) {
    if (!startDate) return 0;
    const start = new Date(startDate + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.max(0, Math.floor((now - start) / 86400000));
  },

  /** Desglose: años, meses del año actual, semanas del mes, días del mes */
  timeBreakdown(startDate) {
    if (!startDate) return { years: 0, months: 0, weeks: 0, days: 0 };
    const start = new Date(startDate + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const weeks = Math.floor(days / 7);
    const remDays = days % 7;

    return { years, months, weeks, days: remDays };
  },

  calcBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm || heightCm < 50) return null;
    const m = heightCm / 100;
    return weightKg / (m * m);
  },

  bmiCategory(bmi) {
    if (bmi == null) return '—';
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidad';
  },

  /** Predicción de altura adulta (mid-parental height) */
  predictMaxHeight(sex, fatherCm, motherCm) {
    if (!fatherCm || !motherCm) return null;
    // Fórmula clásica mid-parental
    if (sex === 'masculino') {
      return (fatherCm + motherCm + 13) / 2;
    } else if (sex === 'femenino') {
      return (fatherCm + motherCm - 13) / 2;
    }
    // neutro / no especificado: promedio simple
    return (fatherCm + motherCm) / 2;
  },

  /**
   * Estimación de calorías de una sesión.
   * Usa MET aproximado de calistenia + peso del usuario.
   * MET base ~5-8 según dificultad media de los ejercicios.
   */
  estimateCalories(workout, user) {
    const weight = user.weight || 70;
    let totalMETMinutes = 0;

    (workout.exercises || []).forEach(ex => {
      const e = EXERCISES.find(x => x.id === ex.exerciseId);
      const diff = e ? (e.difficulty || 3) : 4;
      const type = e ? e.type : 'reps';
      // MET 3.5 (fácil) → 9.5 (élite). Variantes avanzadas suman un poco más
      let met = 3.5 + (diff / 10) * 6;
      if (ex.variant || ex.grip) met += 0.4;

      (ex.sets || []).forEach(s => {
        const val = Number(s.value) || 0;
        let minutes;
        if (type === 'hold') {
          minutes = Math.abs(val) / 60;
        } else {
          // ~2.5 s por rep + transición
          minutes = (val * 2.5) / 60;
        }
        totalMETMinutes += met * minutes;
      });
    });

    // Mínimo por duración de sesión (si hay reloj)
    if (workout.startedAt) {
      const durMin = Math.max(0, (Date.now() - workout.startedAt) / 60000);
      const floor = Math.min(durMin, 180) * 3.5; // MET bajo de estar activo
      totalMETMinutes = Math.max(totalMETMinutes, floor * 0.15);
    }
    if (workout.durationSeconds) {
      const durMin = workout.durationSeconds / 60;
      totalMETMinutes = Math.max(totalMETMinutes, Math.min(durMin, 180) * 3.5 * 0.15);
    }

    let kcal = metHoursToKcal(totalMETMinutes, weight);
    if (user.sex === 'femenino') kcal *= 0.92;
    if (user.age && user.age > 40) kcal *= 0.95;
    if (user.age && user.age < 18) kcal *= 1.05;

    // 1 decimal
    return Math.max(0, Math.round(kcal * 10) / 10);
  },

  formatKcal(n) {
    if (n == null || isNaN(n)) return '0';
    const x = Number(n);
    return (Math.round(x * 10) / 10).toFixed(1);
  },

  // ---------- ONBOARDING ----------
  showOnboarding() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="onboarding">
        <div class="onboarding-inner">
          <div class="logo-wrap">
            <img src="icons/logo.svg" alt="CalisBros" class="logo-img">
          </div>
          <h1>CalisBros</h1>
          <p class="tagline">Tu progreso de calistenia, medido y claro</p>

          <form id="onboard-form" class="onboard-form">
            <div class="field">
              <label for="ob-name">Nombre / apodo</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input type="text" id="ob-name" class="input with-icon" required maxlength="24" placeholder="Ej: StreetAthlete" autocomplete="off">
              </div>
            </div>

            <div class="field">
              <label>Nivel actual</label>
              <div class="option-cards">
                ${LEVELS.map(l => `
                  <label class="option-card">
                    <input type="radio" name="level" value="${l.id}" ${l.id === 'principiante' ? 'checked' : ''}>
                    <div class="option-body">
                      <strong>${l.name}</strong>
                      <span>${l.desc}</span>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="field">
              <label>Objetivos principales <small>(puedes elegir varios)</small></label>
              <div class="option-cards">
                ${GOALS.map(g => `
                  <label class="option-card">
                    <input type="checkbox" name="goals" value="${g.id}">
                    <div class="option-body">
                      <strong>${g.name}</strong>
                      <span>${g.desc}</span>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="field">
              <label for="ob-start">Fecha en que empezaste a entrenar</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <input type="date" id="ob-start" class="input with-icon" required>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-full btn-lg">Comenzar</button>
          </form>

          <div class="onboard-import">
            <p class="muted small">¿Ya tienes un backup de CalisBros?</p>
            <label class="btn btn-outline btn-full file-btn">
              Importar datos existentes
              <input type="file" accept="application/json,.json" hidden onchange="App.importDataOnboarding(event)">
            </label>
          </div>
          <p class="signature">Oscar Antonio Alvarez Collado</p>
        </div>
      </div>
    `;

    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    document.getElementById('ob-start').value = d.toISOString().slice(0, 10);

    document.getElementById('onboard-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('ob-name').value.trim() || 'Atleta';
      const level = document.querySelector('input[name="level"]:checked')?.value || 'principiante';
      const goals = [...document.querySelectorAll('input[name="goals"]:checked')].map(c => c.value);
      if (goals.length === 0) {
        App.showToast('Selecciona al menos un objetivo.');
        return;
      }
      const startDate = document.getElementById('ob-start').value;
      const user = {
        name, level, goals, startDate,
        totalWorkouts: 0,
        age: null, sex: null, weight: null, height: null,
        fatherHeight: null, motherHeight: null,
        createdAt: new Date().toISOString()
      };
      Storage.saveUser(user);
      this.init();
    });
  },

  // ---------- RENDER CORE ----------
  setView(v) {
    this.currentView = v;
    if (v !== 'progress') this.progressDetailId = null;
    this.render();
  },

  render() {
    const user = Storage.getUser();
    if (!user) return;

    const app = document.getElementById('app');
    app.innerHTML = `
      <header class="topbar">
        <div class="topbar-brand">
          <img src="icons/logo.svg" alt="" class="brand-icon">
          <span>CalisBros</span>
        </div>
        <div class="topbar-right">
          <button class="icon-btn" id="theme-toggle" title="Cambiar tema" aria-label="Tema">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          </button>
        </div>
      </header>
      <main id="main" class="main"></main>
      <nav class="bottom-nav">
        <button data-view="home" class="${this.currentView==='home'?'active':''}">
          <img src="icons/home.svg" alt=""><span>Inicio</span>
        </button>
        <button data-view="train" class="${this.currentView==='train'?'active':''}">
          <img src="icons/train.svg" alt=""><span>Entrenar</span>
        </button>
        <button data-view="library" class="${this.currentView==='library'?'active':''}">
          <img src="icons/library.svg" alt=""><span>Ejercicios</span>
        </button>
        <button data-view="range" class="${this.currentView==='range'?'active':''}">
          <img src="icons/range.svg" alt=""><span>Rango</span>
        </button>
        <button data-view="progress" class="${this.currentView==='progress'?'active':''}">
          <img src="icons/progress.svg" alt=""><span>Progreso</span>
        </button>
        <button data-view="data" class="${this.currentView==='data'?'active':''}">
          <img src="icons/data.svg" alt=""><span>Datos</span>
        </button>
        <button data-view="profile" class="${this.currentView==='profile'?'active':''}">
          <img src="icons/profile.svg" alt=""><span>Perfil</span>
        </button>
      </nav>
    `;

    document.querySelectorAll('.bottom-nav button').forEach(b => {
      b.addEventListener('click', () => this.setView(b.dataset.view));
    });
    document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggleTheme());

    const main = document.getElementById('main');
    switch (this.currentView) {
      case 'home': this.renderHome(main, user); break;
      case 'train': this.renderTrain(main, user); break;
      case 'library': this.renderLibrary(main); break;
      case 'range': this.renderRange(main); break;
      case 'progress': this.renderProgress(main, user); break;
      case 'data': this.renderData(main, user); break;
      case 'profile': this.renderProfile(main, user); break;
      default: this.renderHome(main, user);
    }
  },

  toggleTheme() {
    const s = Storage.getSettings();
    s.theme = s.theme === 'dark' ? 'light' : 'dark';
    Storage.saveSettings(s);
    this.applyTheme();
    this.render();
  },

  // ---------- HOME ----------
  renderHome(c, user) {
    const tb = this.timeBreakdown(user.startDate);
    const workouts = Storage.getWorkouts();
    const caps = Storage.getCapabilities();
    const capCount = Object.keys(caps).length;

    c.innerHTML = `
      <div class="page">
        <div class="welcome-block">
          <h2>Hola, ${this.escape(user.name)}</h2>
          <p class="muted">Tu camino en calistenia</p>
        </div>

        ${this.needsBodyUpdate() ? `
          <div class="notice notice-warn">
            <strong>Actualización de medidas</strong>
            <p class="muted small">Lleva un mes sin revisar peso o altura. Puedes dejar los mismos valores.</p>
            <button class="btn btn-sm btn-primary" onclick="App.openPersonalData()">Revisar ahora</button>
          </div>
        ` : ''}

        <div class="time-grid">
          <div class="time-card">
            <span class="time-num">${tb.years}</span>
            <span class="time-lbl">Años</span>
          </div>
          <div class="time-card">
            <span class="time-num">${tb.months}</span>
            <span class="time-lbl">Meses</span>
          </div>
          <div class="time-card">
            <span class="time-num">${tb.weeks}</span>
            <span class="time-lbl">Semanas</span>
          </div>
          <div class="time-card">
            <span class="time-num">${tb.days}</span>
            <span class="time-lbl">Días</span>
          </div>
        </div>

        <div class="card highlight">
          <div class="card-title">Resumen</div>
          <div class="stat-row">
            <div class="stat"><span class="stat-num">${user.totalWorkouts || 0}</span><span class="stat-lbl">Sesiones</span></div>
            <div class="stat"><span class="stat-num">${capCount}</span><span class="stat-lbl">Skills</span></div>
            <div class="stat"><span class="stat-num">${this.daysTraining(user.startDate)}</span><span class="stat-lbl">Días totales</span></div>
          </div>
        </div>

        <button class="btn btn-primary btn-full btn-lg mb-block" onclick="App.setView('train')">
          Empezar entrenamiento
        </button>

        <div class="section">
          <h3>Rutinas recomendadas</h3>
          <div class="list">
            ${PRESET_ROUTINES.map(r => `
              <button class="list-item" onclick="App.startPreset('${r.id}')">
                <div>
                  <strong>${r.name}</strong>
                  <div class="muted">${(r.exercises||[]).length} ejercicios${r.description ? ' · ' + r.description.slice(0,42) + (r.description.length>42?'…':'') : ''}</div>
                </div>
                <span class="chevron">›</span>
              </button>
            `).join('')}
          </div>
        </div>

        ${workouts.length ? `
          <div class="section">
            <h3>Últimas sesiones</h3>
            <div class="list">
              ${workouts.slice(0, 4).map(w => `
                <div class="list-item static">
                  <div>
                    <strong>${this.escape(w.name)}</strong>
                    <div class="muted">${new Date(w.date).toLocaleDateString('es')}${w.calories ? ` · ~${this.formatKcal(w.calories)} kcal` : ''} · ${w.exercises.length} ej.</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  // ---------- TRAIN ----------
  renderTrain(c, user) {
    if (this.currentWorkout) {
      this.renderActiveWorkout(c, user);
      return;
    }
    c.innerHTML = `
      <div class="page">
        <h2>Entrenar</h2>
        <p class="muted mb">Elige una rutina o crea una sesión libre</p>
        ${(!user.weight || !user.height) ? `
          <div class="notice">
            Completa peso y altura en tu perfil (toca tu nombre) para estimar calorías con precisión.
          </div>
        ` : ''}
        <button class="btn btn-primary btn-full btn-lg mb" onclick="App.startFreeWorkout()">Sesión libre</button>
        <div class="section">
          <h3>Rutinas</h3>
          <div class="list">
            ${PRESET_ROUTINES.map(r => `
              <button class="list-item" onclick="App.startPreset('${r.id}')">
                <div>
                  <strong>${r.name}</strong>
                  <div class="muted">${r.exercises.length} ejercicios · ${r.level}</div>
                </div>
                <span class="chevron">›</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  startFreeWorkout() {
    this.clearSessionTimer();
    this.currentWorkout = {
      name: 'Sesión libre',
      date: new Date().toISOString(),
      startedAt: Date.now(),
      exercises: [],
      calories: 0,
      rests: []
    };
    this.render();
    this.startSessionClock();
  },

  startPreset(id) {
    const p = PRESET_ROUTINES.find(r => r.id === id);
    if (!p) return;
    this.clearSessionTimer();
    // PRESET_ROUTINES.exercises es un array de ids string
    this.currentWorkout = {
      name: p.name,
      date: new Date().toISOString(),
      startedAt: Date.now(),
      exercises: (p.exercises || []).map(eid => ({
        exerciseId: typeof eid === 'string' ? eid : (eid.exerciseId || eid.id),
        sets: [],
        target: typeof eid === 'object' ? eid.target : null
      })),
      calories: 0,
      rests: []
    };
    this.render();
    this.startSessionClock();
  },

  startSessionClock() {
    this.clearSessionTimer();
    this.sessionTimer = setInterval(() => {
      const el = document.getElementById('session-clock');
      if (!el || !this.currentWorkout?.startedAt) return;
      const sec = Math.floor((Date.now() - this.currentWorkout.startedAt) / 1000);
      el.textContent = this.formatDuration(sec);
    }, 1000);
  },

  clearSessionTimer() {
    if (this.sessionTimer) clearInterval(this.sessionTimer);
    this.sessionTimer = null;
  },

  renderActiveWorkout(c, user) {
    const w = this.currentWorkout;
    const liveKcal = this.estimateCalories(w, user);
    const elapsed = w.startedAt ? Math.floor((Date.now() - w.startedAt) / 1000) : 0;
    const accent = Storage.getSettings().accent || '#f97316';

    c.innerHTML = `
      <div class="page workout-page">
        <div class="workout-top">
          <button class="btn btn-ghost" onclick="App.cancelWorkout()">Cancelar</button>
          <h2>${this.escape(w.name)}</h2>
          <button class="btn btn-primary btn-sm" onclick="App.finishWorkout()">Terminar</button>
        </div>

        <div class="session-meta">
          <div class="session-clock-card">
            <span class="session-clock" id="session-clock">${this.formatDuration(elapsed)}</span>
            <span class="muted small">Tiempo de sesión</span>
          </div>
          <div class="kcal-live">
            <span class="kcal-num">~${this.formatKcal(liveKcal)}</span>
            <span class="kcal-lbl">kcal estimadas</span>
          </div>
        </div>

        <div class="exercise-blocks">
          ${w.exercises.map((ex, idx) => {
            const e = EXERCISES.find(x => x.id === ex.exerciseId);
            if (!e) return '';
            return `
              <div class="ex-block">
                <div class="ex-block-head">
                  <strong>${e.technicalName || e.name}${ex.variant ? ' · ' + this.escape(ex.variant) : ''}</strong>
                  <span class="tag">${CATEGORIES[e.category]?.name || ''}</span>
                </div>
                <div class="sets-row">
                  ${ex.sets.map((s, si) => `<span class="set-pill">S${si+1}: ${s.value}${e.type==='hold'?'s':''}${s.restAfter != null ? ' · desc. '+s.restAfter+'s' : ''}</span>`).join('')}
                </div>
                <div class="add-set-row">
                  <input type="number" min="1" max="999" placeholder="${e.type==='hold'?'Segundos':'Reps'}" id="set-in-${idx}" class="input">
                  <button class="btn btn-primary btn-sm" onclick="App.addSet(${idx})">Añadir set</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <button class="btn btn-outline btn-full" id="btn-add-ex" onclick="App.openAddExercise()">+ Añadir ejercicio</button>

        <div id="rest-overlay" class="rest-overlay hidden" aria-live="polite">
          <div class="rest-circle-wrap">
            <svg class="rest-svg" viewBox="0 0 120 120">
              <circle class="rest-track" cx="60" cy="60" r="54" />
              <circle class="rest-progress" id="rest-progress" cx="60" cy="60" r="54"
                stroke="${accent}" stroke-dasharray="339.292" stroke-dashoffset="0" />
            </svg>
            <div class="rest-center">
              <div class="rest-label" id="rest-label">Descanso</div>
              <div class="rest-time" id="rest-time">90</div>
              <div class="rest-actions" id="rest-actions">
                <button type="button" class="rest-btn" onclick="App.adjustRest(-10)">−10s</button>
                <button type="button" class="rest-btn rest-btn-skip" onclick="App.skipRest()">Omitir</button>
                <button type="button" class="rest-btn" onclick="App.adjustRest(10)">+10s</button>
              </div>
              <button type="button" class="btn btn-primary btn-sm hidden" id="rest-close" onclick="App.skipRest()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.startSessionClock();
    if (this.restSecondsLeft > 0 && this.restTimer) {
      // restore overlay visibility if timer running
      const ov = document.getElementById('rest-overlay');
      if (ov) ov.classList.remove('hidden');
      this.updateRestCircle();
    }
  },

  openAddExercise() {
    const modal = document.createElement('div');
    modal.className = 'modal-bg';
    modal.id = 'add-modal';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-head">
          <h3>Añadir ejercicio</h3>
          <button class="icon-btn" onclick="document.getElementById('add-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <input type="search" class="input" placeholder="Buscar..." id="ex-search" oninput="App.filterAddList(this.value)">
          <div id="add-list" class="add-list">
            ${EXERCISES.map(e => `
              <button class="add-item" onclick="App.addExercise('${e.id}')">
                <strong>${e.technicalName || e.name}</strong>
                <span class="muted">${CATEGORIES[e.category]?.name} · ${e.difficulty.toFixed(1)}/10</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  filterAddList(q) {
    const list = document.getElementById('add-list');
    const f = EXERCISES.filter(e => (e.technicalName || e.name).toLowerCase().includes(q.toLowerCase()));
    list.innerHTML = f.map(e => `
      <button class="add-item" onclick="App.addExercise('${e.id}')">
        <strong>${e.technicalName || e.name}</strong>
        <span class="muted">${CATEGORIES[e.category]?.name} · ${e.difficulty.toFixed(1)}/10</span>
      </button>
    `).join('');
  },

  addExercise(id) {
    document.getElementById('add-modal')?.remove();
    document.getElementById('ex-modal')?.remove();
    const e = EXERCISES.find(x => x.id === id);
    const { grips, variations } = this.getExerciseOptions(e);
    const options = [...grips, ...variations.filter(v => !grips.includes(v))];
    if (options.length) {
      this.openVariantPicker(id, options);
      return;
    }
    this.commitAddExercise(id, null);
  },

  openVariantPicker(id, options) {
    const e = EXERCISES.find(x => x.id === id);
    document.getElementById('variant-modal')?.remove();
    const modal = document.createElement('div');
    modal.className = 'modal-bg';
    modal.id = 'variant-modal';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-head">
          <h3>${this.escape(e?.technicalName || e?.name || id)}</h3>
          <button class="icon-btn" onclick="document.getElementById('variant-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <p class="muted small mb">Elige agarre o variante (o añade sin variante).</p>
          <div class="add-list">
            <button class="add-item" onclick="App.commitAddExercise('${id}', null)">
              <strong>Sin variante / estándar</strong>
            </button>
            ${options.map(v => `
              <button class="add-item" onclick="App.commitAddExercise('${id}', '${String(v).replace(/'/g, "\\'")}')">
                <strong>${this.escape(v)}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  },

  commitAddExercise(id, variant) {
    if (!this.currentWorkout) this.startFreeWorkout();
    this.currentWorkout.exercises.push({
      exerciseId: id,
      variant: variant || null,
      sets: []
    });
    document.getElementById('variant-modal')?.remove();
    document.getElementById('add-modal')?.remove();
    this.render();
  },

  addSet(idx) {
    const input = document.getElementById(`set-in-${idx}`);
    const val = parseInt(input?.value);
    if (!val || val < 1) return;
    this.currentWorkout.exercises[idx].sets.push({ value: val, at: Date.now() });
    input.value = '';
    this.startRest(idx, this.currentWorkout.exercises[idx].sets.length - 1);
    this.render();
  },

  startRest(exIdx, setIdx) {
    const sec = Storage.getSettings().restSeconds || 90;
    this.restSecondsLeft = sec;
    this.restTotal = sec;
    this.restAlarmPlayed = false;
    this._restExIdx = exIdx;
    this._restSetIdx = setIdx;
    clearInterval(this.restTimer);

    // show overlay after render
    setTimeout(() => {
      const ov = document.getElementById('rest-overlay');
      if (ov) {
        ov.classList.remove('hidden');
        document.getElementById('rest-close')?.classList.add('hidden');
        document.getElementById('rest-actions')?.classList.remove('hidden');
        const label = document.getElementById('rest-label');
        if (label) label.textContent = 'Descanso';
      }
      this.updateRestCircle();
    }, 30);

    this.restTimer = setInterval(() => {
      this.restSecondsLeft--;
      this.updateRestCircle();
      if (this.restSecondsLeft <= 0) {
        // Alarma al cruzar 0 y cada 3 s en negativo
        if (!this.restAlarmPlayed || this.restSecondsLeft % 3 === 0) {
          this.playAlarm();
          this.restAlarmPlayed = true;
        }
        const label = document.getElementById('rest-label');
        if (label) label.textContent = '¡Tiempo!';
        document.getElementById('rest-actions')?.classList.add('hidden');
        document.getElementById('rest-close')?.classList.remove('hidden');
      }
    }, 1000);
  },

  updateRestCircle() {
    const el = document.getElementById('rest-time');
    if (el) {
      const v = this.restSecondsLeft;
      el.textContent = v < 0 ? String(v) : String(v);
      el.classList.toggle('rest-overtime', v < 0);
    }
    const circle = document.getElementById('rest-progress');
    if (circle && this.restTotal) {
      const C = 2 * Math.PI * 54;
      const ratio = Math.max(0, Math.min(1, this.restSecondsLeft / this.restTotal));
      circle.style.strokeDashoffset = String(C * (1 - ratio));
    }
  },

  adjustRest(delta) {
    this.restSecondsLeft = this.restSecondsLeft + delta;
    if (this.restSecondsLeft > 0) {
      this.restTotal = Math.max(this.restTotal || 0, this.restSecondsLeft);
      this.restAlarmPlayed = false;
      document.getElementById('rest-close')?.classList.add('hidden');
      document.getElementById('rest-actions')?.classList.remove('hidden');
      const label = document.getElementById('rest-label');
      if (label) label.textContent = 'Descanso';
    }
    this.updateRestCircle();
  },

  skipRest() {
    // record rest used on last set if possible
    const used = (this.restTotal || 0) - Math.max(0, this.restSecondsLeft);
    if (this.currentWorkout && this._restExIdx != null && this._restSetIdx != null) {
      const set = this.currentWorkout.exercises[this._restExIdx]?.sets?.[this._restSetIdx];
      if (set) set.restAfter = Math.max(0, used);
      this.currentWorkout.rests = this.currentWorkout.rests || [];
      this.currentWorkout.rests.push({ seconds: Math.max(0, used), at: Date.now() });
    }
    clearInterval(this.restTimer);
    this.restTimer = null;
    this.restSecondsLeft = 0;
    document.getElementById('rest-overlay')?.classList.add('hidden');
  },

  async cancelWorkout() {
    const ok = await this.showConfirm('Cancelar sesión', '¿Cancelar la sesión actual? No se guardará.');
    if (!ok) return;
    this.currentWorkout = null;
    clearInterval(this.restTimer);
    this.clearSessionTimer();
    this.render();
  },

  async finishWorkout() {
    const w = this.currentWorkout;
    if (!w || w.exercises.every(e => e.sets.length === 0)) {
      await this.showAlert('Sesión vacía', 'Añade al menos un set antes de terminar.');
      return;
    }
    const user = Storage.getUser();
    w.calories = this.estimateCalories(w, user);
    w.durationSeconds = w.startedAt ? Math.floor((Date.now() - w.startedAt) / 1000) : 0;
    user.totalWorkouts = (user.totalWorkouts || 0) + 1;
    Storage.saveUser(user);
    Storage.addWorkout(w);
    this.currentWorkout = null;
    clearInterval(this.restTimer);
    this.clearSessionTimer();
    await this.showAlert('Sesión guardada', `Calorías estimadas: ~${this.formatKcal(w.calories)} kcal · Duración: ${this.formatDuration(w.durationSeconds)}`);
    this.setView('home');
  },

  // ---------- LIBRARY ----------
  renderLibrary(c) {
    c.innerHTML = `
      <div class="page">
        <h2>Ejercicios</h2>
        <p class="muted mb">Nombres técnicos · Progresiones · Dificultad 0-10</p>
        <div class="filters" id="cat-filters">
          <button class="chip active" data-cat="all" onclick="App.filterLib('all')">Todos</button>
          ${Object.entries(CATEGORIES).map(([k,v]) => `
            <button class="chip" data-cat="${k}" onclick="App.filterLib('${k}')">${v.name}</button>
          `).join('')}
        </div>
        <div id="lib-list" class="lib-list">
          ${this.renderLibCards(EXERCISES)}
        </div>
      </div>
    `;
  },

  filterLib(cat) {
    document.querySelectorAll('#cat-filters .chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
    const list = cat === 'all' ? EXERCISES : EXERCISES.filter(e => e.category === cat);
    document.getElementById('lib-list').innerHTML = this.renderLibCards(list);
  },

  renderLibCards(list) {
    return list.map(e => {
      const label = getDifficultyLabel(e.difficulty);
      return `
        <button class="lib-card" onclick="App.showExercise('${e.id}')">
          <div class="lib-card-top">
            <strong>${e.technicalName || e.name}</strong>
            <span class="diff-badge">${e.difficulty.toFixed(1)}/10</span>
          </div>
          <div class="lib-meta">
            <span class="tag">${CATEGORIES[e.category]?.name}</span>
            <span class="range-label">${label}</span>
          </div>
          <div class="muted small">${(e.muscles||[]).slice(0,3).join(' · ')}${e.equipment ? ' · ' + e.equipment.join('/') : ''}</div>
        </button>
      `;
    }).join('');
  },

  showExercise(id) {
    const e = EXERCISES.find(x => x.id === id);
    if (!e) return;
    const label = getDifficultyLabel(e.difficulty);
    const progs = e.progressions || [];

    const modal = document.createElement('div');
    modal.className = 'modal-bg';
    modal.id = 'ex-modal';
    modal.innerHTML = `
      <div class="modal large">
        <div class="modal-head">
          <h3>${e.technicalName || e.name}</h3>
          <button class="icon-btn" onclick="document.getElementById('ex-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <div class="detail-grid">
            <div><span class="muted">Dificultad</span><br><strong>${e.difficulty.toFixed(1)}/10</strong> · ${label}</div>
            <div><span class="muted">Tipo</span><br><strong>${e.type === 'hold' ? 'Isométrico' : 'Repeticiones'}</strong></div>
            <div><span class="muted">Nivel</span><br><strong>${e.recommendedLevel || '—'}</strong></div>
          </div>
          <p class="desc">${e.description}</p>
          <p class="muted small"><strong>Categoría:</strong> ${CATEGORIES[e.category]?.name || ''}</p>
          <p class="muted small"><strong>Músculos:</strong> ${(e.muscles||[]).join(', ')}</p>
          <p class="muted small"><strong>Equipamiento:</strong> ${(e.equipment||['suelo']).join(', ')}</p>
          ${e.formTips ? `<div class="tip-box"><strong>Tips de forma</strong><br>${e.formTips}</div>` : ''}
          ${progs.length ? `
            <h4 class="mt">Progresión</h4>
            <div class="prog-tree">
              ${progs.map(p => `
                <div class="prog-node ${p.current ? 'current' : ''}">
                  <div class="prog-line"></div>
                  <div class="prog-dot"></div>
                  <div class="prog-content">
                    <strong>${p.name}</strong>
                    <span class="muted">${p.req || ''}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${e.variations ? `
            <h4 class="mt">Variaciones comunes</h4>
            <div class="var-list">${e.variations.map(v => `<span class="var-chip">${v}</span>`).join('')}</div>
          ` : ''}
          <button class="btn btn-primary btn-full mt" onclick="App.addExercise('${e.id}');document.getElementById('ex-modal').remove()">
            Añadir a sesión
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // ---------- RANGO ----------
  selectedRangeExercise: null,

  renderRange(c) {
    const selected = this.selectedRangeExercise;
    const e = selected ? EXERCISES.find(x => x.id === selected) : null;
    c.innerHTML = `
      <div class="page">
        <h2>Evaluar Rango</h2>
        <p class="muted mb">Selecciona un ejercicio y registra tu rendimiento real.</p>
        <div class="field">
          <label>Ejercicio</label>
          <button type="button" class="custom-select" id="range-ex-btn" onclick="App.openRangePicker()">
            <span id="range-ex-label">${e ? (e.technicalName || e.name) : '— Selecciona un ejercicio —'}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <input type="hidden" id="range-ex" value="${selected || ''}">
        </div>
        <div id="range-form" class="range-form ${selected ? '' : 'hidden'}"></div>
        <div id="range-result" class="range-result hidden"></div>
      </div>
    `;
    if (selected) this.updateRangeForm();
  },

  openRangePicker() {
    const modal = document.createElement('div');
    modal.className = 'modal-bg';
    modal.id = 'range-picker-modal';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-head">
          <h3>Seleccionar ejercicio</h3>
          <button class="icon-btn" onclick="document.getElementById('range-picker-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <input type="search" class="input" placeholder="Buscar ejercicio..." id="range-search" oninput="App.filterRangePicker(this.value)">
          <div id="range-picker-list" class="add-list">
            ${EXERCISES.map(ex => `
              <button class="add-item" onclick="App.pickRangeExercise('${ex.id}')">
                <strong>${ex.technicalName || ex.name}</strong>
                <span class="muted">${CATEGORIES[ex.category]?.name || ''} · ${ex.difficulty.toFixed(1)}/10</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => document.getElementById('range-search')?.focus(), 100);
  },

  filterRangePicker(q) {
    const list = document.getElementById('range-picker-list');
    if (!list) return;
    const f = EXERCISES.filter(e => (e.technicalName || e.name).toLowerCase().includes((q||'').toLowerCase()));
    list.innerHTML = f.map(ex => `
      <button class="add-item" onclick="App.pickRangeExercise('${ex.id}')">
        <strong>${ex.technicalName || ex.name}</strong>
        <span class="muted">${CATEGORIES[ex.category]?.name || ''} · ${ex.difficulty.toFixed(1)}/10</span>
      </button>
    `).join('') || '<p class="muted">Sin resultados</p>';
  },

  pickRangeExercise(id) {
    this.selectedRangeExercise = id;
    document.getElementById('range-picker-modal')?.remove();
    this.render();
  },

  updateRangeForm() {
    const id = this.selectedRangeExercise || document.getElementById('range-ex')?.value;
    const form = document.getElementById('range-form');
    const result = document.getElementById('range-result');
    if (result) { result.classList.add('hidden'); result.innerHTML = ''; }
    if (!form) return;
    if (!id) { form.classList.add('hidden'); form.innerHTML = ''; return; }

    const e = EXERCISES.find(x => x.id === id);
    if (!e) return;
    form.classList.remove('hidden');
    const { grips, variations } = this.getExerciseOptions(e);
    const options = [...grips, ...variations.filter(v => !grips.includes(v))];

    let html = '';
    if (e.type === 'reps') {
      html += `
        <div class="field"><label>Repeticiones totales (máximo seguido)</label>
          <input type="number" id="r-total" class="input" min="0" placeholder="Ej: 13"></div>
        <div class="field"><label>Repeticiones con técnica estricta</label>
          <input type="number" id="r-strict" class="input" min="0" placeholder="Ej: 11"></div>`;
    } else {
      html += `
        <div class="field"><label>Segundos de hold (máximo)</label>
          <input type="number" id="r-hold" class="input" min="0" placeholder="Ej: 25"></div>
        <div class="field"><label>Segundos con técnica estricta</label>
          <input type="number" id="r-strict-hold" class="input" min="0" placeholder="Ej: 18"></div>`;
    }

    if (options.length) {
      html += `
        <div class="field">
          <label>Rendimiento por variante / agarre</label>
          <p class="muted small mb">Puedes poner reps o segundos independientes en cada una.</p>
          <div class="var-inputs">
            ${options.map((v, i) => `
              <div class="var-input-row">
                <span class="var-input-label">${this.escape(v)}</span>
                <input type="number" min="0" class="input input-sm" data-var="${this.escape(v)}" id="r-var-${i}" placeholder="${e.type==='hold'?'seg':'reps'}">
              </div>
            `).join('')}
          </div>
        </div>`;
    }

    html += `<button class="btn btn-primary btn-full" onclick="App.calculateRange('${id}')">Calcular mi rango</button>`;
    form.innerHTML = html;
  },

  calculateRange(id) {
    const e = EXERCISES.find(x => x.id === id);
    const result = document.getElementById('range-result');
    let score = 0;
    let details = [];
    const variantScores = [];

    if (e.type === 'reps') {
      const total = parseInt(document.getElementById('r-total')?.value) || 0;
      const strict = parseInt(document.getElementById('r-strict')?.value) || 0;
      details.push(`${total} reps totales`, `${strict} con técnica estricta`);
      if (e.rangeCriteria) {
        const c = e.rangeCriteria;
        if (strict >= (c.elite?.strict||999) || total >= (c.elite?.total||999)) score = 9.5;
        else if (strict >= (c.avanzado?.strict||999) || total >= (c.avanzado?.total||999)) score = 7.5;
        else if (strict >= (c.intermedio?.strict||999) || total >= (c.intermedio?.total||999)) score = 5;
        else if (total >= 1) score = 2.5;
        else score = 0.5;
      } else {
        if (total >= 20) score = 8; else if (total >= 12) score = 6.5;
        else if (total >= 6) score = 4.5; else if (total >= 1) score = 2.5;
      }
    } else {
      const hold = parseInt(document.getElementById('r-hold')?.value) || 0;
      const strictH = parseInt(document.getElementById('r-strict-hold')?.value) || 0;
      details.push(`${hold}s hold`, `${strictH}s estrictos`);
      if (e.rangeCriteria) {
        const c = e.rangeCriteria;
        if (strictH >= (c.elite?.hold||999) || hold >= (c.elite?.hold||999)) score = 9.5;
        else if (strictH >= (c.avanzado?.hold||999) || hold >= (c.avanzado?.hold||999)) score = 7.5;
        else if (strictH >= (c.intermedio?.hold||999) || hold >= (c.intermedio?.hold||999)) score = 5;
        else if (hold >= 3) score = 2.5; else score = 0.5;
      } else {
        if (hold >= 40) score = 8; else if (hold >= 20) score = 6;
        else if (hold >= 10) score = 4; else if (hold >= 3) score = 2;
      }
    }

    // Per-variant independent values
    document.querySelectorAll('[data-var]').forEach(inp => {
      const val = parseInt(inp.value);
      if (!val || val < 1) return;
      const name = inp.getAttribute('data-var');
      variantScores.push({ name, value: val });
      details.push(`${name}: ${val}${e.type==='hold'?'s':' reps'}`);
      // boost score slightly for each solid variant
      score = Math.min(10, score + 0.25);
    });

    const label = getDifficultyLabel(score);
    const ref = REFERENCE_AVERAGES[id];
    const caps = Storage.getCapabilities();
    caps[id] = {
      score, label, details,
      vars: variantScores.map(v => v.name),
      variantScores,
      updated: new Date().toISOString()
    };
    Storage.saveCapabilities(caps);

    result.classList.remove('hidden');
    result.innerHTML = `
      <div class="result-card">
        <div class="result-label">Tu rango en ${e.technicalName || e.name}</div>
        <div class="result-score">${score.toFixed(1)}/10</div>
        <div class="result-rank">${label}</div>
        <ul class="result-details">${details.map(d => `<li>${d}</li>`).join('')}</ul>
        ${ref ? `<div class="ref-box"><div class="muted small">Referencia comunidad:</div>
          <div class="ref-row">Int. ≈ ${ref.intermedio}${e.type==='hold'?'s':''} · Av. ≈ ${ref.avanzado}${e.type==='hold'?'s':''} · Élite ≈ ${ref.elite}${e.type==='hold'?'s':''}</div></div>` : ''}
        <p class="muted small mt">Guardado en Capacidades actuales (Perfil).</p>
      </div>`;
  },

  // ---------- PROGRESS ----------
  renderProgress(c, user) {
    if (this.progressDetailId != null) {
      this.renderProgressDetail(c, user);
      return;
    }
    const workouts = Storage.getWorkouts();
    const tb = this.timeBreakdown(user.startDate);
    const totalKcal = workouts.reduce((s, w) => s + (w.calories || 0), 0);
    const totalTime = workouts.reduce((s, w) => s + (w.durationSeconds || 0), 0);
    const n = workouts.length || 0;
    const avgKcal = n ? Math.round((totalKcal / n) * 10) / 10 : 0;
    const avgTime = n ? Math.round(totalTime / n) : 0;

    c.innerHTML = `
      <div class="page">
        <h2>Progreso</h2>
        <div class="time-grid mb">
          <div class="time-card"><span class="time-num">${tb.years}</span><span class="time-lbl">Años</span></div>
          <div class="time-card"><span class="time-num">${tb.months}</span><span class="time-lbl">Meses</span></div>
          <div class="time-card"><span class="time-num">${tb.weeks}</span><span class="time-lbl">Semanas</span></div>
          <div class="time-card"><span class="time-num">${tb.days}</span><span class="time-lbl">Días</span></div>
        </div>
        <div class="stats-grid mb">
          <div class="stat-card"><span class="stat-val">${n}</span><span class="stat-lbl">Sesiones</span></div>
          <div class="stat-card"><span class="stat-val">~${this.formatKcal(totalKcal)}</span><span class="stat-lbl">kcal totales</span></div>
          <div class="stat-card"><span class="stat-val">${this.formatDuration(avgTime)}</span><span class="stat-lbl">Tiempo promedio</span></div>
          <div class="stat-card"><span class="stat-val">~${this.formatKcal(avgKcal)}</span><span class="stat-lbl">kcal promedio</span></div>
        </div>
        <div class="section">
          <h3>Historial de sesiones</h3>
          ${workouts.length === 0 ? '<p class="muted">Aún no hay sesiones.</p>' :
            workouts.map((w, i) => {
              const d = new Date(w.date);
              const fecha = d.toLocaleDateString('es');
              const dia = this.dayName(w.date);
              const tiempo = this.formatDuration(w.durationSeconds || 0);
              const kcal = w.calories != null ? `~${this.formatKcal(w.calories)} kcal` : '—';
              return `
                <button class="list-item session-item" onclick="App.openSessionDetail(${i})">
                  <div>
                    <strong>${this.escape(w.name)}</strong>
                    <div class="muted small">${fecha} · ${dia}</div>
                    <div class="session-sum">${tiempo} · ${kcal} · ${(w.exercises||[]).length} ejercicios</div>
                  </div>
                  <span class="chevron">›</span>
                </button>
              `;
            }).join('')}
        </div>
      </div>
    `;
  },

  openSessionDetail(index) {
    this.progressDetailId = index;
    this.render();
  },

  closeSessionDetail() {
    this.progressDetailId = null;
    this.render();
  },

  renderProgressDetail(c, user) {
    const workouts = Storage.getWorkouts();
    const w = workouts[this.progressDetailId];
    if (!w) {
      this.progressDetailId = null;
      this.renderProgress(c, user);
      return;
    }
    const d = new Date(w.date);
    c.innerHTML = `
      <div class="page">
        <div class="workout-top">
          <button class="btn btn-ghost" onclick="App.closeSessionDetail()">← Volver</button>
          <h2>Detalle</h2>
          <span></span>
        </div>
        <div class="detail-card mb">
          <strong>${this.escape(w.name)}</strong>
          <div class="muted">${d.toLocaleString('es')} · ${this.dayName(w.date)}</div>
          <div class="detail-grid mt">
            <div><span class="muted">Duración</span><br><strong>${this.formatDuration(w.durationSeconds || 0)}</strong></div>
            <div><span class="muted">Calorías</span><br><strong>~${this.formatKcal(w.calories || 0)} kcal</strong></div>
            <div><span class="muted">Ejercicios</span><br><strong>${(w.exercises||[]).length}</strong></div>
          </div>
        </div>
        <div class="section">
          <h3>Ejercicios del día</h3>
          ${(w.exercises||[]).map(ex => {
            const e = EXERCISES.find(x => x.id === ex.exerciseId);
            const name = e ? (e.technicalName || e.name) : ex.exerciseId;
            const rests = (ex.sets||[]).filter(s => s.restAfter != null).map(s => s.restAfter + 's');
            return `
              <div class="ex-block">
                <div class="ex-block-head">
                  <strong>${this.escape(name)}${ex.variant ? ' · ' + this.escape(ex.variant) : ''}</strong>
                  <span class="tag">${(ex.sets||[]).length} sets</span>
                </div>
                <div class="sets-row">
                  ${(ex.sets||[]).map((s, si) => `
                    <span class="set-pill">S${si+1}: ${s.value}${e && e.type==='hold'?'s':''}${s.restAfter != null ? ' · desc. '+s.restAfter+'s' : ''}</span>
                  `).join('') || '<span class="muted small">Sin sets</span>'}
                </div>
                ${rests.length ? `<div class="muted small mt">Descansos entre sets: ${rests.join(' · ')}</div>` : ''}
              </div>
            `;
          }).join('') || '<p class="muted">Sin ejercicios registrados.</p>'}
        </div>
        ${(w.rests||[]).length ? `
          <div class="section">
            <h3>Descansos de la sesión</h3>
            <p class="muted small">Promedio: ${Math.round(w.rests.reduce((a,r)=>a+(r.seconds||0),0)/w.rests.length)}s · Total descansos: ${w.rests.length}</p>
          </div>
        ` : ''}
      </div>
    `;
  },

  // ---------- DATOS ----------
  renderData(c, user) {
    c.innerHTML = `
      <div class="page">
        <h2>Datos</h2>
        <p class="muted mb">Importa, exporta o elimina la información guardada en este dispositivo.</p>

        <div class="section">
          <h3>Exportar</h3>
          <p class="muted small mb">Descarga un archivo JSON con tu perfil, entrenamientos, capacidades y ajustes.</p>
          <button class="btn btn-primary btn-full" onclick="App.exportData()">Exportar datos</button>
        </div>

        <div class="section">
          <h3>Importar</h3>
          <p class="muted small mb">Carga un archivo JSON exportado previamente. Reemplazará los datos actuales.</p>
          <label class="btn btn-outline btn-full file-btn">
            Importar datos
            <input type="file" accept="application/json,.json" id="import-file" hidden onchange="App.importData(event)">
          </label>
        </div>

        <div class="section">
          <h3>Zona de peligro</h3>
          <p class="muted small mb">Esta acción borra todo de forma permanente en este dispositivo.</p>
          <button class="btn btn-danger btn-full" onclick="App.deleteAllData()">Eliminar todos los datos</button>
        </div>
      </div>
    `;
  },

  exportData() {
    const payload = {
      version: 3,
      exportedAt: new Date().toISOString(),
      user: Storage.getUser(),
      workouts: Storage.getWorkouts(),
      capabilities: Storage.getCapabilities(),
      settings: Storage.getSettings()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calisbros-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },

  importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || typeof data !== 'object') throw new Error('Archivo inválido');
        const ok = await this.showConfirm(
          'Importar datos',
          '¿Importar estos datos? Se reemplazarán los datos actuales de la app.'
        );
        if (!ok) { event.target.value = ''; return; }
        if (data.user) Storage.saveUser(data.user);
        if (Array.isArray(data.workouts)) Storage.saveWorkouts(data.workouts);
        if (data.capabilities) Storage.saveCapabilities(data.capabilities);
        if (data.settings) Storage.saveSettings(data.settings);
        await this.showAlert('Importación', 'Datos importados correctamente.');
        this.applyTheme();
        this.setView('home');
      } catch (err) {
        await this.showAlert('Error', 'No se pudo importar el archivo. Verifica que sea un backup de CalisBros válido.');
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  },

  async deleteAllData() {
    const ok1 = await this.showConfirm(
      'Eliminar todos los datos',
      '¿Eliminar TODOS los datos de CalisBros en este dispositivo? Esta acción no se puede deshacer.',
      'Eliminar', 'Cancelar'
    );
    if (!ok1) return;
    const ok2 = await this.showConfirm(
      'Confirmación final',
      'Se borrará perfil, entrenamientos y capacidades.',
      'Borrar todo', 'Cancelar'
    );
    if (!ok2) return;
    Storage.clearAll();
    location.reload();
  },

  // ---------- PROFILE ----------
  renderProfile(c, user) {
    const caps = Storage.getCapabilities();
    const s = Storage.getSettings();
    const bmi = this.calcBMI(user.weight, user.height);
    const maxH = this.predictMaxHeight(user.sex, user.fatherHeight, user.motherHeight);
    const capIds = Object.keys(caps);

    c.innerHTML = `
      <div class="page">
        <div class="profile-head">
          <div class="avatar">${(user.name||'?').charAt(0).toUpperCase()}</div>
          <button class="name-btn" onclick="App.openPersonalData()">
            <h2>${this.escape(user.name)}</h2>
            <span class="muted small">Toca para editar datos personales</span>
          </button>
          <p class="muted">${LEVELS.find(l => l.id === user.level)?.name || user.level}</p>
        </div>

        ${this.needsBodyUpdate() ? `
          <div class="notice notice-warn">
            <strong>Actualización mensual</strong>
            <p class="muted small">Ha pasado un mes desde la última revisión de peso/altura. Puedes confirmar los mismos valores o actualizarlos.</p>
            <button class="btn btn-sm btn-primary" onclick="App.openPersonalData()">Actualizar peso y altura</button>
          </div>
        ` : ''}

        <div class="body-stats">
          <div class="body-stat">
            <span class="body-val">${bmi != null ? bmi.toFixed(1) : '—'}</span>
            <span class="body-lbl">IMC</span>
            <span class="body-sub">${this.bmiCategory(bmi)}</span>
          </div>
          <div class="body-stat">
            <span class="body-val">${maxH != null ? maxH.toFixed(0) + ' cm' : '—'}</span>
            <span class="body-lbl">Altura diana</span>
            <span class="body-sub">según padres</span>
          </div>
          <div class="body-stat">
            <span class="body-val">${user.weight ? user.weight + ' kg' : '—'}</span>
            <span class="body-lbl">Peso</span>
            <span class="body-sub">${user.height ? user.height + ' cm' : ''}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-head">
            <h3>Registro de peso y altura</h3>
            <button class="btn btn-sm btn-primary" onclick="App.openPersonalData()">+ Registrar</button>
          </div>
          ${(user.bodyLog && user.bodyLog.length) ? `
            <div class="list">
              ${user.bodyLog.slice(0, 12).map(b => `
                <div class="list-item static">
                  <div>
                    <strong>${b.weight != null ? b.weight + ' kg' : '—'} · ${b.height != null ? b.height + ' cm' : '—'}</strong>
                    <div class="muted small">${new Date(b.date).toLocaleString('es')}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '<p class="muted small">Aún no hay registros. Al guardar peso/altura en datos personales se crea el histórico.</p>'}
        </div>

        <div class="section">
          <div class="section-head">
            <h3>Capacidades actuales</h3>
            <button class="btn btn-sm btn-primary" onclick="App.openAddCapability()">+ Añadir</button>
          </div>
          <p class="muted small mb">Añade los ejercicios que quieras seguir. Evalúalos en la pestaña Rango.</p>
          ${capIds.length === 0 ? '<p class="muted">Ninguna skill registrada todavía.</p>' : `
            <div class="cap-list">
              ${capIds.map(id => {
                const e = EXERCISES.find(x => x.id === id);
                const cap = caps[id];
                return `
                  <div class="cap-row">
                    <div class="cap-info">
                      <strong>${e?.technicalName || e?.name || id}</strong>
                      <div class="muted small">${cap.score.toFixed(1)}/10 · ${cap.label}</div>
                    </div>
                    <div class="cap-actions">
                      <button class="btn btn-sm btn-ghost" onclick="App.setView('range')">Eval.</button>
                      <button class="btn btn-sm btn-ghost danger" onclick="App.removeCapability('${id}')">✕</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
          ${capIds.length >= 3 ? `
            <canvas id="radar-chart" width="320" height="280" class="radar-canvas"></canvas>
            <p class="muted small center">Gráfico de capacidades</p>
          ` : ''}
        </div>

        <div class="section">
          <h3>Objetivos</h3>
          <div class="tag-list">
            ${(user.goals||[]).map(g => {
              const go = GOALS.find(x => x.id === g);
              return `<span class="tag">${go?.name || g}</span>`;
            }).join('')}
          </div>
        </div>

        <div class="section">
          <h3>Apariencia</h3>
          <div class="field">
            <label>Tema</label>
            <select id="set-theme" class="input" onchange="App.changeTheme(this.value)">
              <option value="dark" ${s.theme==='dark'?'selected':''}>Oscuro</option>
              <option value="light" ${s.theme==='light'?'selected':''}>Claro</option>
            </select>
          </div>
          <div class="field">
            <label>Color de acento</label>
            <div class="color-row">
              ${['#f97316','#3b82f6','#22c55e','#a855f7','#ef4444','#eab308','#14b8a6'].map(col => `
                <button class="color-swatch ${s.accent===col?'active':''}" style="background:${col}" onclick="App.changeAccent('${col}')"></button>
              `).join('')}
            </div>
          </div>
          <div class="field">
            <label>Descanso por defecto (seg)</label>
            <input type="number" id="set-rest" class="input" value="${s.restSeconds}" min="30" max="300">
            <button class="btn btn-sm btn-primary mt" onclick="App.saveRest()">Guardar</button>
          </div>
        </div>

        <div class="section about">
          <h3>Acerca de</h3>
          <p>CalisBros es una herramienta personal de seguimiento de calistenia. Sin rankings sociales.</p>
          <p class="signature">Desarrollado por <strong>Oscar Antonio Alvarez Collado</strong></p>
          <button class="btn btn-outline btn-sm mt" onclick="App.deleteAllData()">Resetear datos</button>
        </div>
      </div>
    `;

    if (capIds.length >= 3) {
      setTimeout(() => this.drawRadar(capIds.slice(0, 8), caps), 60);
    }
  },

  openPersonalData() {
    const user = Storage.getUser();
    const modal = document.createElement('div');
    modal.className = 'modal-bg';
    modal.id = 'personal-modal';
    modal.innerHTML = `
      <div class="modal large">
        <div class="modal-head">
          <h3>Datos personales</h3>
          <button class="icon-btn" onclick="document.getElementById('personal-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>Nombre / apodo</label>
            <input type="text" id="pd-name" class="input" value="${this.escape(user.name)}" maxlength="24">
          </div>
          <div class="field">
            <label>Fecha de inicio de entrenamiento</label>
            <input type="date" id="pd-start" class="input" value="${user.startDate || ''}">
          </div>
          <div class="field">
            <label>Edad</label>
            <input type="number" id="pd-age" class="input" min="10" max="100" value="${user.age || ''}" placeholder="Ej: 22">
          </div>
          <div class="field">
            <label>Fecha de nacimiento</label>
            <input type="date" id="pd-birth" class="input" value="${user.birthDate || ''}">
            <span class="muted small">Si la defines, la edad se actualiza sola el día de tu cumpleaños.</span>
          </div>
          <div class="field">
            <label>Sexo</label>
            <div class="sex-pills" id="pd-sex-wrap">
              <button type="button" class="sex-pill ${!user.sex?'active':''}" data-sex="" onclick="App.setSexPill(this)">No especificar</button>
              <button type="button" class="sex-pill ${user.sex==='masculino'?'active':''}" data-sex="masculino" onclick="App.setSexPill(this)">Masculino</button>
              <button type="button" class="sex-pill ${user.sex==='femenino'?'active':''}" data-sex="femenino" onclick="App.setSexPill(this)">Femenino</button>
            </div>
            <input type="hidden" id="pd-sex" value="${user.sex || ''}">
          </div>
          <div class="field">
            <label>Peso (kg)</label>
            <input type="number" id="pd-weight" class="input" min="30" max="250" step="0.1" value="${user.weight || ''}" placeholder="Ej: 72.5">
          </div>
          <div class="field">
            <label>Altura (cm)</label>
            <input type="number" id="pd-height" class="input" min="100" max="250" value="${user.height || ''}" placeholder="Ej: 178">
          </div>
          <div class="field">
            <label>Altura del padre (cm)</label>
            <input type="number" id="pd-father" class="input" min="100" max="250" value="${user.fatherHeight || ''}" placeholder="Para predicción de altura">
          </div>
          <div class="field">
            <label>Altura de la madre (cm)</label>
            <input type="number" id="pd-mother" class="input" min="100" max="250" value="${user.motherHeight || ''}" placeholder="Para predicción de altura">
          </div>
          <button class="btn btn-primary btn-full" onclick="App.savePersonalData()">Guardar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },


  setSexPill(btn) {
    document.querySelectorAll('#pd-sex-wrap .sex-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const input = document.getElementById('pd-sex');
    if (input) input.value = (btn && btn.dataset.sex) ? btn.dataset.sex : '';
  },

  savePersonalData() {
    const user = Storage.getUser();
    user.name = document.getElementById('pd-name').value.trim() || user.name;
    user.startDate = document.getElementById('pd-start').value || user.startDate;
    user.age = parseInt(document.getElementById('pd-age').value) || null;
    const birth = document.getElementById('pd-birth')?.value || '';
    user.birthDate = birth || null;
    user.sex = document.getElementById('pd-sex').value || null;
    const w = document.getElementById('pd-weight').value;
    const h = document.getElementById('pd-height').value;
    // Flexible: allow same values; empty keeps previous
    if (w !== '') user.weight = parseFloat(w) || user.weight || null;
    if (h !== '') user.height = parseFloat(h) || user.height || null;
    user.fatherHeight = parseFloat(document.getElementById('pd-father').value) || null;
    user.motherHeight = parseFloat(document.getElementById('pd-mother').value) || null;
    user.lastBodyUpdate = new Date().toISOString();
    // Registro histórico de peso/altura (permite repetir valores)
    if (user.weight != null || user.height != null) {
      user.bodyLog = Array.isArray(user.bodyLog) ? user.bodyLog : [];
      const last = user.bodyLog[0];
      const entry = {
        date: new Date().toISOString(),
        weight: user.weight,
        height: user.height
      };
      // Siempre registra al guardar desde el modal (histórico flexible)
      user.bodyLog.unshift(entry);
      if (user.bodyLog.length > 100) user.bodyLog.length = 100;
    }
    Storage.saveUser(user);
    document.getElementById('personal-modal')?.remove();
    this.showToast('Datos personales guardados');
    this.render();
  },

  openAddCapability() {
    const caps = Storage.getCapabilities();
    const available = EXERCISES.filter(e => !caps[e.id]);
    const modal = document.createElement('div');
    modal.className = 'modal-bg';
    modal.id = 'cap-add-modal';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-head">
          <h3>Añadir capacidad</h3>
          <button class="icon-btn" onclick="document.getElementById('cap-add-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <input type="search" class="input" placeholder="Buscar ejercicio..." oninput="App.filterCapList(this.value)">
          <div id="cap-add-list" class="add-list">
            ${available.map(e => `
              <button class="add-item" onclick="App.addCapability('${e.id}')">
                <strong>${e.technicalName || e.name}</strong>
                <span class="muted">${CATEGORIES[e.category]?.name}</span>
              </button>
            `).join('') || '<p class="muted">Todos los ejercicios ya están añadidos.</p>'}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  filterCapList(q) {
    const caps = Storage.getCapabilities();
    const list = document.getElementById('cap-add-list');
    const available = EXERCISES.filter(e => !caps[e.id] && (e.technicalName || e.name).toLowerCase().includes(q.toLowerCase()));
    list.innerHTML = available.map(e => `
      <button class="add-item" onclick="App.addCapability('${e.id}')">
        <strong>${e.technicalName || e.name}</strong>
        <span class="muted">${CATEGORIES[e.category]?.name}</span>
      </button>
    `).join('') || '<p class="muted">Sin resultados</p>';
  },

  addCapability(id) {
    const caps = Storage.getCapabilities();
    if (!caps[id]) {
      caps[id] = { score: 0, label: 'Sin evaluar', details: [], vars: [], updated: new Date().toISOString() };
      Storage.saveCapabilities(caps);
    }
    document.getElementById('cap-add-modal')?.remove();
    this.render();
  },

  async removeCapability(id) {
    const ok = await this.showConfirm('Quitar capacidad', '¿Quitar esta capacidad de tu lista?');
    if (!ok) return;
    const caps = Storage.getCapabilities();
    delete caps[id];
    Storage.saveCapabilities(caps);
    this.render();
  },

  drawRadar(skillIds, caps) {
    const canvas = document.getElementById('radar-chart');
    if (!canvas || skillIds.length < 3) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2 + 10;
    const radius = Math.min(w, h) * 0.36;
    const n = skillIds.length;
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#f97316';
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#e8eef7';
    const grid = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#243047';

    ctx.clearRect(0, 0, w, h);
    for (let lvl = 1; lvl <= 5; lvl++) {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
        const r = (radius * lvl) / 5;
        const x = cx + r * Math.cos(ang), y = cy + r * Math.sin(ang);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = grid; ctx.lineWidth = 1; ctx.stroke();
    }
    for (let i = 0; i < n; i++) {
      const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius * Math.cos(ang), cy + radius * Math.sin(ang));
      ctx.strokeStyle = grid; ctx.stroke();
    }
    const values = skillIds.map(id => (caps[id]?.score || 0) / 10);
    ctx.beginPath();
    values.forEach((v, i) => {
      const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = radius * Math.max(0.05, v);
      const x = cx + r * Math.cos(ang), y = cy + r * Math.sin(ang);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = accent + '40'; ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();

    skillIds.forEach((id, i) => {
      const e = EXERCISES.find(x => x.id === id);
      const label = e ? (e.name.length > 12 ? e.name.slice(0, 11) + '…' : e.name) : id;
      const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + (radius + 16) * Math.cos(ang);
      const y = cy + (radius + 16) * Math.sin(ang);
      ctx.fillStyle = textColor;
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    });
  },

  changeTheme(val) {
    const s = Storage.getSettings();
    s.theme = val;
    Storage.saveSettings(s);
    this.applyTheme();
    this.render();
  },

  changeAccent(col) {
    const s = Storage.getSettings();
    s.accent = col;
    Storage.saveSettings(s);
    this.applyTheme();
    this.render();
  },

  saveRest() {
    const s = Storage.getSettings();
    s.restSeconds = parseInt(document.getElementById('set-rest').value) || 90;
    Storage.saveSettings(s);
    this.showToast('Descanso guardado');
  }
};

/** kcal ≈ MET-minutos × peso(kg) / 60  (equivale a MET × kg × horas) */
function metHoursToKcal(metMinutes, weightKg) {
  return (metMinutes / 60) * weightKg;
}

document.addEventListener('DOMContentLoaded', () => App.init());

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
