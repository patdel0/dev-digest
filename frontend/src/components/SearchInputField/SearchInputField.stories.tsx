import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import SearchInputField, { SearchInputFieldProps } from './SearchInputField';

export default {
  title: 'Components/SearchInputField',
  component: SearchInputField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<SearchInputFieldProps> = (args) => <SearchInputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter your search query',
  onSearch: (query: string) => console.log('Search query:', query),
};
