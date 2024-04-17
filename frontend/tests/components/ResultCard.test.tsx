import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ResultCard from '../../src/components/ResultCard';

describe("ResultCard", () => {
    const mockArticle = {
        title: "Card title",
        excerpt: "This is the article excerpt",
        url: "https://www.example.com/",
        rating: 42,
    }

    beforeEach(() => {
        render(<ResultCard {...mockArticle} />);
    });

    it("renders the title correctly", () => {
        const title = screen.getByRole("heading", { name: mockArticle.title });
        expect(title).toBeInTheDocument();
    });

    it("renders the excerpt correctly", () => {
        const excerpt = screen.getByText(mockArticle.excerpt);
        expect(excerpt).toBeInTheDocument();
    });

    it("wraps the title inside an anchor", () => {
        const link = screen.getByRole("link", { name: mockArticle.title }) as HTMLAnchorElement;
        expect(link.href).toBe(mockArticle.url);
    });

    it("renders the rating correctly", () => {
        const rating = screen.getByTestId("rating");
        expect(rating.textContent).toBe(mockArticle.rating.toString());
    });

    /* it("increases rating by one when user clicks upvote", () => {
     *     const upvoteButton = screen.getByTestId("upvote");

     * }) */
});
