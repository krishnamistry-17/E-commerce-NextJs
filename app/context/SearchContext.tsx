import axiosInstance from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [results, setResults] = useState(null);

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query) {
      setLoading(true);
      async function fetchResults() {
        try {
          const response = await axiosInstance.get(
            `/api/product/search?q=${query}`
          );
          setResults(response.data.results);
         
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults(null);
        } finally {
          setLoading(false);
        }
      }
      fetchResults();
    } else {
      setResults(null);
    }
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        results,
        setResults,
        loading,
        suggestions,
        setSuggestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
