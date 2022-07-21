import React from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id);
        setPizza(data);
      } catch (err) {
        console.log(err);
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="full-pizza">
      <img className="full-pizza__img" src={pizza.imageUrl} alt={pizza.title} />

      <div className="full-pizza__descr">
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Назад</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
