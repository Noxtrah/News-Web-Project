export interface NewsItem {
  Title: string;
  Description: string;
  Insertion_hour: Date; // Alternatively, you can use Date type if you plan to convert this to a Date object
  Resource: string;
  Resource_icon: string;
  Category: string;
  Like_count: string; // Consider changing to number if these are numerical values
  Dislike_count: string; // Consider changing to number if these are numerical values
  NewsID: number;
  Image: string;
}

export type Translations = {
  [key: string]: {
    ALL: string;
    finance: string;
    weather: string;
    technology: string;
    sports: string;
    health: string;
    world: string;
    politics: string;
    environment: string;
    entertainment: string;
    food: string;
    travel: string;
    science: string;
    play: string;
    real_estate: string;
  };
};
