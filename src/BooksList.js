import React from 'react';
import Book from './Book';
import './BookList.css';

const BookList = props => (
  <div>
    {props.books.map(book => (
      <Book key={book.name} name={book.name} author={book.author} />
    ))}
  </div>
);

export default BookList;
