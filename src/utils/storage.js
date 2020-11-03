export const getItem = (key) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = localStorage.getItem(key);
      resolve(JSON.parse(item));
    }, 1);
  });
}

export const setItem = (key, value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve({key, value});
    }, 1);
  });
}
