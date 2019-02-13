export let _enabled = true

export function setEnabled(enabled) {
  _enabled = !!enabled
}

export function isEnabled() {
  return _enabled
}