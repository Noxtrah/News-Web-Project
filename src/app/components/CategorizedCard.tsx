// Define the CategorizedCard type
interface CategorizedCard {
    Title: string;
    Description: string;
    Insertion_hour: string;
    Resource: string;
    Resource_icon: string;
    Category: string;
    Like_count: string;
    Dislike_count: string;
    NewsID: number;
    Image: string;
  }
  
  // Now use this type in your component
  interface CategorizedCardProps {
    news: CategorizedCard;
  }
  
  const NewsItem: React.FC<CategorizedCardProps> = ({ news }) => {
    return (
      <div className="p-4 border-b border-gray-200">
        <img src={news.Image} alt={news.Title} className="w-full h-48 object-cover mb-2" />
        <h2 className="text-xl font-bold mb-2">{news.Title}</h2>
        <p className="text-gray-700 mb-2">{news.Description}</p>
        <div className="text-sm text-gray-500">{news.Resource} - {new Date(news.Insertion_hour).toLocaleDateString()}</div>
      </div>
    );
  };
  
  export default NewsItem;
  