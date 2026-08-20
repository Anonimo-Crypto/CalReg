// CalisBros - Almacenamiento
// Oscar Antonio Alvarez Collado

const Storage = {
  KEYS: {
    USER: 'calisbros_user_v3',
    WORKOUTS: 'calisbros_workouts_v3',
    CAPABILITIES: 'calisbros_capabilities_v3',
    SETTINGS: 'calisbros_settings_v3'
  },

  getUser() {
    try {
      const d = localStorage.getItem(this.KEYS.USER);
      return d ? JSON.parse(d) : null;
    } catch { return null; }
  },

  saveUser(user) {
    localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
  },

  getWorkouts() {
    try {
      const d = localStorage.getItem(this.KEYS.WORKOUTS);
      return d ? JSON.parse(d) : [];
    } catch { return []; }
  },

  saveWorkouts(list) {
    localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(list));
  },

  addWorkout(w) {
    const list = this.getWorkouts();
    list.unshift(w);
    if (list.length > 300) list.length = 300;
    this.saveWorkouts(list);
  },

  getCapabilities() {
    try {
      const d = localStorage.getItem(this.KEYS.CAPABILITIES);
      return d ? JSON.parse(d) : {};
    } catch { return {}; }
  },

  saveCapabilities(caps) {
    localStorage.setItem(this.KEYS.CAPABILITIES, JSON.stringify(caps));
  },

  getSettings() {
    try {
      const d = localStorage.getItem(this.KEYS.SETTINGS);
      return d ? JSON.parse(d) : {
        restSeconds: 90,
        theme: 'dark',
        accent: '#f97316'
      };
    } catch {
      return { restSeconds: 90, theme: 'dark', accent: '#f97316' };
    }
  },

  saveSettings(s) {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(s));
  },

  clearAll() {
    Object.values(this.KEYS).forEach(k => localStorage.removeItem(k));
  }
};
