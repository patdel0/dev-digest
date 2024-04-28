import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ResultCard from '../../src/components/ResultCard';

fetchMock.enableMocks();

describe("ResultCard", () => {
    const mockArticle = {
        id: 1,
        title: "Card title",
        excerpt: "This is the article excerpt",
        url: "https://www.example.com/",
        rating: 42,
        provider: "Example blog",
    }

    beforeEach(() => {
        fetchMock.resetMocks();
        render(<ResultCard {...mockArticle} />);
    });

    it("renders the title correctly", () => {
        const title = screen.getByRole("heading", { name: mockArticle.title });
        expect(title).toBeInTheDocument();
    });

    it("renders the title correctly", () => {
        const provider = screen.getByRole("heading", { name: mockArticle.provider });
        expect(provider).toBeInTheDocument();
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

    describe("rating interactions", () => {
        const getRating = () => Number(screen.getByTestId("rating").textContent);

        it("increases rating by 1 when user clicks upvote", () => {
            const upvoteButton = screen.getByTestId("upvote");
            const ratingBeforeClick = getRating();

            fireEvent.click(upvoteButton);

            fetchMock.mockResponseOnce(JSON.stringify({ rating: mockArticle.rating + 1 }));
            const ratingAfterClick = getRating();

            expect(ratingAfterClick).toBe(ratingBeforeClick + 1)
        });

        it("decreases rating by 1 when user clicks downvote", () => {
            const upvoteButton = screen.getByTestId("downvote");
            const ratingBeforeClick = getRating();

            fireEvent.click(upvoteButton);

            fetchMock.mockResponseOnce(JSON.stringify({ rating: mockArticle.rating - 1 }));
            const ratingAfterClick = getRating();

            expect(ratingAfterClick).toBe(ratingBeforeClick - 1)
        });
    });
});
