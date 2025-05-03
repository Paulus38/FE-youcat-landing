// cookieUtils.ts
import Cookies from 'js-cookie';

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key); // js-cookie luôn trả string | undefined
};

export const setCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  Cookies.set(key, value, {
    path: '/',
    sameSite: 'lax',
    expires: new Date(Date.now() + 7 * 60 * 60 * 1000),
    ...options,
  });
};
export const removeCookie = (key: string) => {
  Cookies.remove(key, { path: '/' });
};
export const getAllCookies = () => {
  return Cookies.get();
};
export const removeAllCookies = () => {
  const allCookies = getAllCookies();
  for (const key in allCookies) {
    removeCookie(key);
  }
};
export const getCookieValue = (key: string): string | undefined => {
  const cookieValue = getCookie(key);
  if (cookieValue) {
    return decodeURIComponent(cookieValue);
  }
  return undefined;
};
