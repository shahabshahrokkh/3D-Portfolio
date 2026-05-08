import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initLaptop(scene) {
  return await createObjectWithPlaceholder('laptop', scene);
}
