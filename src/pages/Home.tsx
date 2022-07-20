import React from 'react';
import { useSelector } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, Skeleton, Pagination } from '../components';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';

import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback(
    (index: number) => {
      // вызов экшена setCategoryId через функцию хука dispatch
      dispatch(setCategoryId(index));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
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
          currentPage: String(currentPage),
        }),
      );

      window.scrollTo(0, 0);
    };

    getPizzas();
  }, [categoryId, sortType.sortProperty, searchValue, currentPage, dispatch]);

  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />

        <SortPopup value={sortType} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
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
