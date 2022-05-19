const BooksReducer = (state, action) => {
  let book;
  if (action.type === 'set-books') {
    return { books: [...action.bookList] };
  }

  if (action.type === 'filter') {
    const category = action.category.replace(' ', '-').replace("'", '');
    const categoryid = action.categoryid;

    document.querySelectorAll('.category-item').forEach((categoryItem) => {
      if (categoryItem.classList.contains(categoryid)) {
        categoryItem.classList.add('active-category');
        categoryItem.classList.add('font-weight-bold');
      } else {
        categoryItem.classList.remove('active-category');
        categoryItem.classList.remove('font-weight-bold');
      }
    });

    if (category !== 'All') {
      document.querySelectorAll('.book').forEach((item) => {
        book = item;
        if (book.classList.contains(categoryid)) {
          console.log(book);
          book.style.display = 'block';
        } else {
          book.style.display = 'none';
        }
      });
    } else {
      document.querySelectorAll('.book').forEach((item) => {
        book = item;
        book.style.display = 'block';
      });
    }
    return { books: [...state.books] };
  }
  return { books: [...state.books] };
};

export default BooksReducer;
