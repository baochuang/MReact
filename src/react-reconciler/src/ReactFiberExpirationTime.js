import MAX_SIGNED_31_BIT_INT from './maxSigned31BitInt'

export const NoWork = 0
export const Never = 1
export const Sync = MAX_SIGNED_31_BIT_INT

const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1

export function msToExpirationTime(ms) {
    return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0)
}