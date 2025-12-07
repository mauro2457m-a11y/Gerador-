
export interface DigitalProduct {
  title: string;
  description: string;
  price: string;
  content: string; 
  coverImageUrl: string; 
}

export enum AppStep {
  Idea,
  Loading,
  Result,
}
