export interface UserDetails {
  jwtToken: string;
  userName: string;
  userId: string;
  iss: String,
  azp: String,
  aud: String,
  sub: String,
  email: String,
  email_verified: String,
  at_hash: String,
  name: String,
  picture: String,
  given_name: String,
  family_name: String,
  locale: String,
  iat: String,
  exp: String,
  alg: String,
  kid: String,
  typ: String,
}

export interface JwtType {
  exp: number;
  iat: number;
  userId: string;
}
