export function getBlogCardMediaState(image) {
  if (typeof image !== 'string' || image.trim() === '') {
    return 'none';
  }

  return image.startsWith('/') ? 'local' : 'remote';
}
