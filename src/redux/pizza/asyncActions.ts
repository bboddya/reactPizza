import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

// Record<string, string> - краткая записть типизации объекта, где тип значений одинаковый
// в createAsyncThunk можно сразу передать 2 типа => 1. Возвращаемый тип; 2. Типы аргументов
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;

    const { data } = await axios.get(
      `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );

    return data;
  },
);
