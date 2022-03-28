import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TaskItem from '../taskItem';

describe('TaskItem', () => {
  test('Remove button should show on hover', async () => {
    const mockRemoveTask = jest.fn();
    const { getByTestId, findByTestId } = render(<TaskItem onRemove={mockRemoveTask} testId='TaskItem'/>);

    const taskItem = getByTestId('TaskItem');
    fireEvent.mouseOver(taskItem);

    const removeButton = await findByTestId('TaskItem--RemoveButton');
    expect(removeButton).toBeInTheDocument();
  });

  test('Remove button should call remove function when clicked', async () => {
    const mockRemoveTask = jest.fn();
    const { getByTestId, findByTestId } = render(<TaskItem onRemove={mockRemoveTask} testId='TaskItem'/>);

    const taskItem = getByTestId('TaskItem');
    fireEvent.mouseOver(taskItem);

    const removeButton = await findByTestId('TaskItem--RemoveButton');

    fireEvent.click(removeButton);
    expect(mockRemoveTask).toHaveBeenCalledTimes(1);
  });

  test('Checkbox label should display prop value', () => {
    const { getByLabelText } = render(<TaskItem value='test item' testId='TaskItem'/>);

    const taskItemCheckbox = getByLabelText('test item');
    expect(taskItemCheckbox).toBeInTheDocument();
  });
});