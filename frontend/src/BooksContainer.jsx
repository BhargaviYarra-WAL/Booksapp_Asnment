/* eslint-disable jsx-quotes */
import React, { useContext } from 'react';
import Book from './Book';
import BooksContext from './BooksContext';
import './styles/Books.css';

export default function BooksContainer() {
  const { state } = useContext(BooksContext);
  return (
    <div className="book-container clearfix">
      {state.books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}
