"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface SearchResult {
  url: string;
  title: string;
  snippet: string;
}

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await axios.get(
            `https://api.gsa.gov/technology/searchgov/v2/results/i14y`,
            {
              params: {
                affiliate: "ai2c",
                access_key: process.env.NEXT_PUBLIC_SEARCH_GOV_API_KEY,
                query,
              },
            }
          );
          setSearchResults(response.data.web.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <div className="mt-40 consisten-margin" key={index}>
            <a href={result.url}>{result.title}</a>
            <p>{result.snippet}</p>
          </div>
        ))
      ) : (
        <div className="mt-40 consistent-margin">
          <p>No results found for "{query}".</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;