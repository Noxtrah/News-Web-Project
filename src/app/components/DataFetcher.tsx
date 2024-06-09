// FetchData.tsx
import React, { useEffect, useState } from 'react';

interface Props {
  query: string | null;
  category: string;
  children: (data: any, loading: boolean) => React.ReactNode;
}

const FetchData: React.FC<Props> = ({ query, category, children }) => {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = '';
        // if (query && query !== '') {
        //   endpoint = `http://localhost:5000/searchedNews?searchQuery=${query}`;
        // } else {
        //   endpoint = `http://localhost:5000/categorizedNews?category=${category}`;
        // }
        if (category && category !== query){
            endpoint = `http://localhost:5000/categorizedNews?category=${category}`;
        }
        else {
            endpoint = `http://localhost:5000/searchedNews?searchQuery=${query}`;
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
  }, [query, category]);

  console.log('Fetched news data:', newsData); // Log the fetched data

  return <>{children(newsData, loading)}</>;
};

export default FetchData;
