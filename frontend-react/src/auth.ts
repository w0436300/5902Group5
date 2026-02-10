/** Lightweight demo-auth helpers (localStorage-based). */

const AUTH_KEY = "demoAuth";

export function isDemoAuthed(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function loginDemo(): void {
  localStorage.setItem(AUTH_KEY, "true");
}

export function logoutDemo(): void {
  localStorage.removeItem(AUTH_KEY);
}
