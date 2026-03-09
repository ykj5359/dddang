const KEYS = {
  MY_LANDS: 'dddang_my_lands',
  SAVED_LANDS: 'dddang_saved_lands',
};

export function loadMyLands(defaults) {
  try {
    const raw = localStorage.getItem(KEYS.MY_LANDS);
    return raw ? JSON.parse(raw) : defaults;
  } catch {
    return defaults;
  }
}

export function persistMyLands(lands) {
  localStorage.setItem(KEYS.MY_LANDS, JSON.stringify(lands));
}

export function loadSavedLands(defaults) {
  try {
    const raw = localStorage.getItem(KEYS.SAVED_LANDS);
    return raw ? JSON.parse(raw) : defaults;
  } catch {
    return defaults;
  }
}

export function persistSavedLands(lands) {
  localStorage.setItem(KEYS.SAVED_LANDS, JSON.stringify(lands));
}

export function exportAsJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
