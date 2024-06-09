// FetchData.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  category: string;
  children: (data: any, loading: boolean, searchQuery: string | null) => React.ReactNode;
}

const FetchData: React.FC<Props> = ({ category, children }) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = '';
        const lowerCaseSearchQuery = searchQuery ? searchQuery.toLowerCase() : null;
        if (category && category !== searchQuery) {
          endpoint = `http://localhost:5000/categorizedNews?category=${category}`;
        } else {
          endpoint = `http://localhost:5000/searchedNews?searchQuery=${lowerCaseSearchQuery}`;
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, category]);

  return <>{children(newsData, loading, searchQuery)}</>;
};

export default FetchData;
