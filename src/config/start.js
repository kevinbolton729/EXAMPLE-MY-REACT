import React from 'react';
import ReactDOM from 'react-dom';

export const start = (App, elementNode = 'root') => {
  ReactDOM.render(<App />, document.getElementById(elementNode));
};
