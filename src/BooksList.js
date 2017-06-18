import React from 'react';
import Book from './Book';
import './BookList.css';

const BookList = props => (
  <div className="book--list">
    {props.books.map(book => (
      <Book key={book.name} name={book.name} author={book.author} />
    ))}

    <div style={{ textAlign: 'center', margin: '10px' }}>
      <div className="button button-inverted">close list of books</div>
    </div>
  </div>
);

export default BookList;
