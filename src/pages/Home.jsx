import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination, sortList } from '../components';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = (id) => {
    // вызов экшена setCategoryId через функцию хука dispatch
    dispatch(setCategoryId(id));
  };

  const onChangePage = (numder) => {
    dispatch(setCurrentPage(numder));
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (
      window.location.search &&
      window.location.search !== '?sortProperty=rating&categoryId=0&currentPage=1'
    ) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    const getPizzas = async () => {
      const sortBy = sortType.sortProperty.replace('-', '');
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `search=${searchValue}` : '';

      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage,
        }),
      );
    };

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => onChangeCategory(id)} />

        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === 'err' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
