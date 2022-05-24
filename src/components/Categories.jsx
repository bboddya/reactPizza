import React from 'react';

function Categories(props) {
  const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeCategory, setActiveCategory] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {category.map((item, index) => (
          <li
            key={item}
            onClick={() => onClickCategory(index)}
            className={activeCategory === index ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
