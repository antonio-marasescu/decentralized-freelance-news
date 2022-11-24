import { createReducer, createSelector, on } from '@ngrx/store';
import { IIdentityUserDto } from '@decentralized-freelance-news/api-shared-lib';
import {
  ActionFailure,
  GetCurrentUser,
  GetCurrentUserSuccess,
  Login,
  LoginSuccess,
  Logout,
  Register,
  RegisterSuccess,
} from './app.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface AppState extends EntityState<IIdentityUserDto> {
  selectedUserId: string | null;
  loading: boolean;
  error: string;
}
export const adapter: EntityAdapter<IIdentityUserDto> = createEntityAdapter<IIdentityUserDto>({
  selectId: (model) => model.id,
});

export const initialAppState: AppState = adapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
});

export const appReducer = createReducer(
  initialAppState,
  on(GetCurrentUser, (state) => ({ ...state, loading: true })),
  on(GetCurrentUserSuccess, (state, { user }) => {
    return adapter.setOne(user, { ...state, loading: false, selectedUserId: user.id });
  }),
  on(Login, (state) => ({ ...state, loading: true })),
  on(LoginSuccess, (state) => ({ ...state, loading: false })),
  on(Register, (state) => ({ ...state, loading: true })),
  on(RegisterSuccess, (state) => ({ ...state, loading: false })),
  on(Logout, () => {
    return adapter.getInitialState({ selectedUserId: null, loading: false, error: null });
  }),
  on(ActionFailure, (state, { reason }) => ({ ...state, error: reason, loading: false }))
);

export const selectFeature = () => (state: { appState: AppState }) => state.appState;

export const selectUsers = () =>
  createSelector(selectFeature(), (state: AppState) => Object.values(state.entities));
export const selectCurrentUser = () =>
  createSelector(selectFeature(), (state: AppState) =>
    state.selectedUserId ? state.entities[state.selectedUserId] : null
  );
export const selectIsLoading = () =>
  createSelector(selectFeature(), (state: AppState) => state.loading);
