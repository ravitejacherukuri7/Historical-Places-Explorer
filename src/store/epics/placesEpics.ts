import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { setPlaces, setLoading, setError } from '../slices/placesSlice';
import { fetchPlaces } from '../../utils/api';
import { Action } from '@reduxjs/toolkit';

export const fetchPlacesEpic: Epic = (action$) =>
  action$.pipe(
    ofType('places/fetchPlaces'),
    switchMap(() =>
      from(fetchPlaces()).pipe(
        map((places) => setPlaces(places)),
        catchError((error) => of(setError(error.message)))
      )
    )
  );

export const placesEpics = [fetchPlacesEpic];