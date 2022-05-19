/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
import React from 'react';

export default function Book(props) {
  const { book } = props;
  const category = book.categoryid;

  return (
    <div className={`card m-3 book card ${category}`}>
      <img className="card-img-top" src={book.image} alt={book.title} />
      <div className="card-body card-body text-left">
        <h6 className="card-title">{book.title}</h6>
        <p className="card-text text-muted">{book.description}</p>
        <h6>{book.author}</h6>

        <div className="mt-2 row">
          <h5 className="col price w-50 d-inline">{`₹ ${book.price}`}</h5>
        </div>
      </div>
    </div>
  );
}
