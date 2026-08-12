const KEY = "cabin-crew-progress";

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}