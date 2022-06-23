import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter', // название
  initialState, // начальное состояние

  //   actions
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    },
  },
});

// selector for replace useSelector on pages
export const selectFilter = (state) => state.filter;

// export actions for use in components
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

// export all actions (reduser) for use in components
export default filterSlice.reducer;
