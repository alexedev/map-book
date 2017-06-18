import React from 'react';
import BookButton from './BookButton';

const Book = props => (
  <div className="list--item">
    <div className="list--item_book">
      <img
        src={props.cover}
        alt={props.name}
        className="list--item_book-image"
      />
      <h2 className="header">{props.name}</h2>
      <div className="subheader">{props.author}</div>
      <div className="footer">
        <BookButton icon="eye-slash" inverted text="Don't show on map" />
      </div>
    </div>

  </div>
);

export default Book;
