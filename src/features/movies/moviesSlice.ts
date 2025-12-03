import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortOption = 'popularity.desc' | 'vote_average.desc' | 'release_date.desc' | 'title.asc';

interface MoviesState {
  searchQuery: string;
  selectedGenreId: number | null;
  sortBy: SortOption;
  currentPage: number;
}

const initialState: MoviesState = {
  searchQuery: '',
  selectedGenreId: null,
  sortBy: 'popularity.desc',
  currentPage: 1,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page on new search
    },
    setSelectedGenreId: (state, action: PayloadAction<number | null>) => {
      state.selectedGenreId = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedGenreId = null;
      state.sortBy = 'popularity.desc';
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedGenreId,
  setSortBy,
  setCurrentPage,
  resetFilters,
} = moviesSlice.actions;

export default moviesSlice.reducer;

