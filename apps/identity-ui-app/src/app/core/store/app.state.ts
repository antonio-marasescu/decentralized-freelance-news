import { ActionReducerMap } from '@ngrx/store';
import { appReducer, AppState } from './app.reducers';
import { AppEffects } from './app.effects';

export interface RootState {
  appState: AppState;
}

export const RootReducers: ActionReducerMap<RootState> = {
  appState: appReducer,
};

export const RootEffects = [AppEffects];
