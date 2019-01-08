const canUseLazy = !!(
    typeof document !== undefined &&
    typeof document.documentMode === 'number' ||
    typeof navigator !== 'undefined' &&
    typeof navigator.userAgent === 'string' &&
    /\bEdge\/\d/.test(navigator.userAgent)
)