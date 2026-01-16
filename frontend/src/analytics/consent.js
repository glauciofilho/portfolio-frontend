const CONSENT_KEY = "ga_consent";

export function hasConsent() {
  return localStorage.getItem(CONSENT_KEY) === "true";
}

export function giveConsent() {
  localStorage.setItem(CONSENT_KEY, "true");
}

export function revokeConsent() {
  localStorage.removeItem(CONSENT_KEY);
}