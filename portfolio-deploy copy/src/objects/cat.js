import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initCat(scene) {
  return await createObjectWithPlaceholder('cat', scene);
}
