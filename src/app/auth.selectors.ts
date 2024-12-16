import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth/store/reducers/auth.reducer";


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(selectAuthState, (state) => state.access_token);
