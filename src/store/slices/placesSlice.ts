import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoricalPlace } from '../../types';

interface PlacesState {
  list: HistoricalPlace[];
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  list: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<HistoricalPlace[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleVisited: (state, action: PayloadAction<number>) => {
      const place = state.list.find((p) => p.id === action.payload);
      if (place) {
        place.isVisited = !place.isVisited;
      }
    },
  },
});

export const { setPlaces, setLoading, setError, toggleVisited } = placesSlice.actions;
export default placesSlice.reducer;