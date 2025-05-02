import Cookies, { CookieSetOptions } from 'universal-cookie';

// Khởi tạo instance của Cookies
const cookies = new Cookies();

export const setCookie = (
  key: string,
  value: string | object,
  options: CookieSetOptions = { path: '/' }
): void => {
  cookies.set(key, value, options);
};

export const removeCookie = (
  key: string,
  options: CookieSetOptions = { path: '/' }
): void => {
  cookies.remove(key, options);
};

export const getCookie = (key: string): string => {
  const value = cookies.get(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
