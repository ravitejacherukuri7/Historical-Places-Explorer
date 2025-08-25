import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import placesReducer from './slices/placesSlice';
import { placesEpics } from './epics/placesEpics';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(placesEpics[0]);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;