import React from 'react';
import ReactDOM from 'react-dom';
import Principal from './Principal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Principal/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
