import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ sortBy, order, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );

    console.log(data);

    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'ok';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'err';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
