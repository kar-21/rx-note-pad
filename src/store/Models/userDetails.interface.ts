export interface UserDetails {
  jwtToken: string;
  userName: string;
  userId: string;
}

export interface JwtType {
  exp: number;
  iat: number;
  userId: string;
}
