/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable react/no-unescaped-entities */

import { React, useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import './App.css';
import Login from './Login';
import Home from './Home';
import List from './List';

import EditBook from './EditBook';
import BooksReducer from './BooksReducer';
import BooksContext from './BooksContext';
import Mainmenu from './Mainmenu';

export default function App() {
  const [stateStatus, setStateStatus] = useState(false);
  const initialState = { books: [] };
  const [state, dispatch] = useReducer(BooksReducer, initialState);
  const getBooks = () => {
    axios.get('/book').then((response) => {
      const books = [];
      response.data.data.forEach((book) => {
        let bookImage = null;
        try {
          bookImage = book.image;
        } catch (error) {
          bookImage = null;
        }
        books.push({
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          categoryid: book.categoryid,
          availability: book.availability,
          description: book.description,
          image: bookImage,
        });
      });
      dispatch({ type: 'set-books', bookList: books });
      setStateStatus(true);
    });
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    /* eslint-disable react/jsx-no-constructed-context-values */
    <div className="App">
      <BooksContext.Provider value={{ state, dispatch, stateStatus, getBooks }}>
        <BrowserRouter>
          <Mainmenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editbook/:id" element={<EditBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </BrowserRouter>
      </BooksContext.Provider>
    </div>
  );
}
