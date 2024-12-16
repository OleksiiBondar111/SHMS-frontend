import {createReducer, on} from "@ngrx/store";
import {loginSuccess, logout} from "../actions/auth.actions";

export interface AuthState {
  access_token: string | null;
}

export const initialAuthState: AuthState = {
  access_token: null,
}

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, {access_token}) => ({...state, access_token})),
  on(logout, (state) => ({...state, access_token: null}))
);
