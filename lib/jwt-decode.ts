// src/utils/jwtDecode.ts

import {jwtDecode} from 'jwt-decode';

export const decodeToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
