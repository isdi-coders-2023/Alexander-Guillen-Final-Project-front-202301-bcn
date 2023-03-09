export interface User {
  id: string;
  username: string;
  token: string;
}

export interface TokenResponse {
  token: string;
}

export interface UserState extends User {
  isLogged: boolean;
}
