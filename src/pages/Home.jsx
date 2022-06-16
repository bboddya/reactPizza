import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);

  // хранение состояния
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    // вызов экшена setCategoryId через функцию хука dispatch
    dispatch(setCategoryId(id));
  };

  const onChangePage = (numder) => {
    dispatch(setCurrentPage(numder));
  };

  // если в аргумент массива пустой, то функция выполнится только после первого рендера
  // [items] - функция выполнится на каждое изменение переменной items
  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://62910af627f4ba1c65c70178.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaItem key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => onChangeCategory(id)} />

        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
