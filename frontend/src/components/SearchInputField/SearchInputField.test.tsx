import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchInputField from './SearchInputField';

test('search input triggers onEnter', () => {
  const mockOnSearch = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <SearchInputField placeholder="Search..." onSearch={mockOnSearch} />
  );

  const inputElement = getByPlaceholderText('Search...');
  const buttonElement = getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'test' } });
  fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

  expect(mockOnSearch).toHaveBeenCalledWith('test');
});

test('search button triggers onSearch', () => {
  const mockOnSearch = jest.fn();
  const { getByText } = render(
    <SearchInputField placeholder="Search..." onSearch={mockOnSearch} />
  );

  const buttonElement = getByText('Search');

  fireEvent.click(buttonElement);

  expect(mockOnSearch).toHaveBeenCalled();
});

