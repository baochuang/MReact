import { createFiberRoot } from './ReactFiberRoot'

// used by render
export function createContainer(
  containerInfo,
  isConcurrent,
  hydrate
) {
  return createFiberRoot(containerInfo, isConcurrent, hydrate)
}