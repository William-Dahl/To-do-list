import React from 'react';
import { render, screen } from '@testing-library/react';

import ToDoList from './todolist';

describe('ToDoList', () => {
  test('renders ToDoList component', () => {
    const { getByTestId } = render(<ToDoList/>);

    expect()
  });
});