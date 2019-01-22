export const enableLazy = !!(
    typeof document !== undefined &&
    typeof document.documentMode === 'number' ||
    typeof navigator !== 'undefined' &&
    typeof navigator.userAgent === 'string' &&
    /\bEdge\/\d/.test(navigator.userAgent)
)

export const emptyObject = {}

export const emptyFunction = () => {}