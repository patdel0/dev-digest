import React, { ReactElement } from "react";

interface Article {
    title: string,
    excerpt: string,
    url: string,
    rating: number
}

export default function ResultCard({ title, excerpt, url, rating }: Article): ReactElement {
    return <article>
        <a href={url}>
            <h3>{title}</h3>
        </a>
        <a href={url}>{url}</a>
        <p>{excerpt}</p>
        <p data-testid="rating">{rating}</p>
    </article>
}
