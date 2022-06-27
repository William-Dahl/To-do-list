import React from 'react';
import { render, screen } from '@testing-library/react';

import TaskItemCreationModal from '../TaskItemCreationModal';

describe('TaskItemCreationModal', () => {
  test('renders ToDoList component', () => {
    const { getByTestId } = render(<TaskItemCreationModal/>);
  });
});