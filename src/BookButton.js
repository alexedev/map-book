import React from 'react';
//uses css loaded in BookList component

const BookButton = props => (
  <a
    className={`button ${props.inverted ? 'button--inverted' : ''}`}
    onClick={props.onBookToggle}
  >
    <i className={`fa fa-${props.icon}`} aria-hidden="true" /> {props.text}
  </a>
);

export default BookButton;
