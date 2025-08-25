export interface HistoricalPlace {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  isVisited: boolean;
  location: string;
  yearBuilt: string;
}

export interface AppState {
  places: {
    list: HistoricalPlace[];
    loading: boolean;
    error: string | null;
  };
}