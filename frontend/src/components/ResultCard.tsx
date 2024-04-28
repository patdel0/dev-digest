import React, { ReactElement, useEffect, useState } from "react";

interface Article {
    id: number,
    title: string,
    excerpt: string,
    url: string,
    rating: number,
    provider: string,
}

export default function ResultCard({ id, title, excerpt, url, rating: initialRating, provider }: Article): ReactElement {
    const [rating, setRating] = useState(initialRating);

    useEffect(() => {
        updateDbRating()
    }, [rating])



    function updateDbRating() {
        fetch(`http://localhost:7860/api/articles/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    function handleVote(ratingChange): void {
        setRating(previousRating => previousRating + ratingChange)
    }

    return <article>
        <a href={url}>
            <h3>{title}</h3>
        </a>
        <h4>{provider}</h4>
        <p>{excerpt}</p>
        <p data-testid="rating">{rating}</p>
        <button data-testid="upvote" onClick={() => handleVote(1)}>Upvote</button>
        <button data-testid="downvote" onClick={() => handleVote(-1)}>Downvote</button>
    </article>
}
