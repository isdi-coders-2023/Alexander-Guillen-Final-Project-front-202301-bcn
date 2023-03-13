export interface LoginTokenPayload {
  id: string;
  username: string;
}
export interface UserCredentials {
  username: string;
  password: string;
}

export interface User extends LoginTokenPayload {
  token: string;
}

export interface TokenResponse {
  token: string;
}

export interface ErrorResponse {
  error: string;
}

export interface UserState extends User {
  isLogged: boolean;
}

export interface ModalPayload {
  title: string;
  message: string;
  isError: boolean;
}

export interface Modal extends ModalPayload {
  isOpened: boolean;
}

export interface UiState {
  openEyes: boolean;
  modal: Modal;
}
