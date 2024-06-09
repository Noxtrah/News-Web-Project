export interface NewsItem {
  Title: string;
  Description: string;
  Insertion_hour: Date;
  Resource: string;
  Resource_icon: string;
  Category: string;
  Like_count: string;
  Dislike_count: string;
  NewsID: number;
  Image: string;
  isLiked: number;
  isDisliked: number;
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

export type User = {
  firstName: string;
  lastName: string;
  userEmail: string;
  password: string;
  country: string;
  city: string;
};