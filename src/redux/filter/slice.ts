import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortType: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter', // название
  initialState, // начальное состояние

  //   actions
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sortType = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.PRICE_DESC,
        };
      }
    },
  },
});

// export actions for use in components
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

// export all actions (reduser) for use in components
export default filterSlice.reducer;
