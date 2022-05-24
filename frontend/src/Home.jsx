import React, { useContext } from 'react';

import BooksContainer from './BooksContainer';
import BooksContext from './BooksContext';
import Category from './Category';

export default function Home() {
  const { stateStatus } = useContext(BooksContext);
  return (
    <div>
      {stateStatus ? (
        <>
          <Category />
          <BooksContainer />
        </>
      ) : null}
    </div>
  );
}
