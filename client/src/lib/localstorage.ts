export function set(key: string, data: any) {
  if (typeof data === "string") {
    localStorage.setItem(key, data);
    return;
  }
  // json stringify for non-string types
  localStorage.setItem(key, JSON.stringify(data));
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
