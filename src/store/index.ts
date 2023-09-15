import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import calendar from './calendar.slice';

export const rootReducer = combineReducers({
  calendar,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

export * from './calendar.slice';
