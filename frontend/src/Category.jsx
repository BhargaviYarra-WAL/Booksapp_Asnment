import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './styles/Categories.css';
import BooksContext from './BooksContext';

export default function Category() {
  const { dispatch } = useContext(BooksContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/category').then((response) => {
      const categoriess = response.data.data;
      /* eslint-disable camelcase */
      const category_all = { id: 0, name: 'All' };
      setCategories([category_all, ...categoriess]);
    });
  }, []);
  console.log(categories);

  return (
    <div className="categories">
      {categories.map((categorie) => {
        const category_name = categorie.name;
        const category = category_name.replace(' ', '-').replace("'", '');
        const categoryid = categorie.id;
        console.log(category);
        if (category === 'All') {
          return (
            <button
              type="button"
              className="btn text-light category-item All current-category"
              key={category}
              onClick={() => {
                dispatch({ type: 'filter', categoryid, category });
              }}
            >
              {category}
            </button>
          );
        }
        return (
          <button
            type="button"
            className={`btn text-light category-item ${category}`}
            key={category}
            onClick={() => {
              dispatch({ type: 'filter', categoryid, category });
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
