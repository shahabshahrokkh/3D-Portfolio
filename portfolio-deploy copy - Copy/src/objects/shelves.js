import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initShelves(scene) {
  return await createObjectWithPlaceholder('shelves', scene);
}
