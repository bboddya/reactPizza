import { RootState } from '../store';

// selector for replace useSelector on pages
export const selectFilter = (state: RootState) => state.filter;
