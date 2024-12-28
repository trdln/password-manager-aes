import { jwtDecode } from 'jwt-decode';

export const decodeJwt = (token?: string | null) => {
  if (token) return jwtDecode<Types.Utils.JwtToken>(token);
  else return null;
};

export const isValidToken = (token: string) => {
  const decoded = decodeJwt(token);
  return !!decoded && (new Date(Number(decoded.exp) * 1000).getTime() - Date.now()) / 1000 > 0;
};
