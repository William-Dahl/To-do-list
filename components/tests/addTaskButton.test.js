import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AddTaskButton from '../AddTaskButton.js';

describe('AddTaskButton', () => {
  test('Button should call onClick method when clicked', () => {
    const mockCreateTask = jest.fn();
    const { getByTestId } = render(<AddTaskButton onClick={mockCreateTask} testId='AddTaskButton'/>);

    const button = getByTestId('AddTaskButton');
    fireEvent.click(button);

    expect(mockCreateTask).toHaveBeenCalledTimes(1);
  });
});