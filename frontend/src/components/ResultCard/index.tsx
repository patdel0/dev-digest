import React, { ReactElement, useEffect, useState } from "react";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";

export interface ResultCardProps {
  id: number;
  title: string;
  excerpt: string;
  url: string;
  rating: number;
  provider: string;
}

async function updateDbRating(id, rating): Promise<void> {
  try {
    const response = await fetch(`http://localhost:7860/api/articles/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function ResultCard({
  id,
  title,
  excerpt,
  url,
  rating: initialRating,
  provider,
}): ReactElement<ResultCardProps> {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    if (rating !== initialRating) updateDbRating(id, rating);
  }, [rating]);

  function handleVote(ratingChange: number): void {
    setRating((previousRating: number) => previousRating + ratingChange);
  }

  return (
    <article className="my-10 p-10 min-w-80 max-w-screen-sm shadow rounded-md">
      <a className="underline" href={url}>
        <h3 className="font-bold text-lg">{title}</h3>
      </a>
      <h4 className="italic mb-5">{provider}</h4>
      <p>{excerpt}</p>
      <div className="flex mt-5">
        <button data-testid="upvote" onClick={() => handleVote(1)}>
          <TiArrowUpThick />
        </button>
        <p className="w-4 mx-2" data-testid="rating">
          {rating}
        </p>
        <button data-testid="downvote" onClick={() => handleVote(-1)}>
          <TiArrowDownThick />
        </button>
      </div>
    </article>
  );
}
