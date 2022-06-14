import React from 'react';

import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

const Home = () => {
  // хранение состояния
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [сategoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  // если в аргумент массива пустой, то функция выполнится только после первого рендера
  // [items] - функция выполнится на каждое изменение переменной items
  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = сategoryId > 0 ? `category=${сategoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://62910af627f4ba1c65c70178.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    window.scrollTo(0, 0);
  }, [сategoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaItem key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={сategoryId} onClickCategory={(id) => setCategoryId(id)} />

        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
