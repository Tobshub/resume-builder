export function set(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
  return;
}

export function get(key: string) {
  const item = localStorage.getItem(key);
  if (item) {
    // parse the json data incase of non-string types
    return JSON.parse(item);
  }
  return;
}

export function remove(key: string) {
  localStorage.removeItem(key);
}
