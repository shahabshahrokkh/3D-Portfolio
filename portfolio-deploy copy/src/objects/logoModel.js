import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';

export async function initLogoModel(scene) {
  return await createObjectWithPlaceholder('logoModel', scene);
}
