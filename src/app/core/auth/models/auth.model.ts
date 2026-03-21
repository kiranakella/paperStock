import { User } from '../../models/user.model';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};
