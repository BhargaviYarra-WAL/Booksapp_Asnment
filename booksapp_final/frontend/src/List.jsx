/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/List.css';

function List() {
  const [books, setBooks] = useState([]);
  const token = JSON.parse(localStorage.getItem('regtoken'));
  useEffect(() => {
    axios
      .get('/book')
      .then((response) => {
        console.log(response.data.data);
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  }, []);
  const deleteProduct = (id) => {
    const updatedBooks = books.filter((val) => {
      if (val.id === id) {
        return false;
      }
      return true;
    });
    setBooks(updatedBooks);
    axios.delete(`/book/${id}`, {
      headers: {
        token,
      },
    });
    console.log(id);
  };
  return (
    <div className="container-fluid">
      <h1 className="text-center mb-5">Listing Books</h1>
      <div className="row">
        {books.map((val) => {
          return (
            <div className="mb-3 col-lg-4 col-md-5 col-sm-6 ">
              <div className="card book-card">
                <div className="card-body card-body">
                  <img
                    className="card-img-top img"
                    // eslint-disable-next-line prefer-template
                    src={val.image}
                    alt=".."
                  />
                  <div className="titlediv">
                    <p className="title">
                      <b>{val.title}</b>
                    </p>
                  </div>
                  <div className="text-center">
                    <p>
                      <b>By {val.author}</b>
                    </p>
                  </div>

                  <p>{val.description}</p>
                  <div className="text-center">
                    <p>{val.availability ? 'available' : 'not available'}</p>
                  </div>

                  <p className="text-center">
                    <b>₹{val.price}</b>
                  </p>

                  <div className="d-flex justify-content-center ">
                    <Link to={`/admin/editproduct/${val.id}`}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm  team3-b-btn m-2"
                      >
                        Edit
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm team3-b-btn m-2"
                      onClick={() => deleteProduct(val.id)}
                    >
                      Delete
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default List;
