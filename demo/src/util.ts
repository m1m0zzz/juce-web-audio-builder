export function processorURL(path: string) {
  return import.meta.env.BASE_URL + 'processors/' + path;
}
