import MAX_SIGNED_31_BIT_INT from './maxSigned31BitInt'

const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1

export const NoWork = 0
export const Never = 1
export const Sync = MAX_SIGNED_31_BIT_INT

// 到期时间的单位以10ms为标准
export function msToExpirationTime(ms) {
  // 添加一个offset防止clash
  return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
}