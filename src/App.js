import React from 'react';

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaItem from './components/PizzaBlock';
import Sort from './components/Sort';
import Sceleton from './components/PizzaBlock/Sceleton';

import './scss/app.scss';

function App() {
  // хранение состояния
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // если в аргумент массива пустой, то функция выполнится только после первого рендера
  // [items] - функция выполнится на каждое изменение переменной items
  React.useEffect(() => {
    fetch('https://62910af627f4ba1c65c70178.mockapi.io/items')
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />

            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
              : items.map((item) => <PizzaItem key={item.id} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
