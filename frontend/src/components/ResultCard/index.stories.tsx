import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ResultCard, { ResultCardProps } from './';

export default {
  title: 'Components/ResultCard',
  component: ResultCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ResultCardProps> = (args) => <ResultCard {...args} />;

export const Default = Template.bind({});

Default.args = {
    id: 1,
    title: "How to succeed as a data engineer without the burnout",
    excerpt: "The key strategies for building a headache-free data platform",
    url: "https://www.example.com/",
    rating: 42,
    provider: "Stack Overflow Blog",
};
