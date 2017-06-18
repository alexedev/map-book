import React from 'react';
import './buttons.css';

const Button = props => (
  <a
    className={`button button--map ${props.inverted ? 'button--inverted' : ''}`}
    onClick={props.onBooklistToggle}
  >
    <i className={`fa fa-${props.icon}`} aria-hidden="true" /> {props.text}
  </a>
);

export default Button;
