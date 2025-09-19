
export interface TripFormData {
  city: string;
  budget: number;
  days: number;
}

export interface Activity {
  name: string;
  description: string;
  estimated_cost: number;
}

export interface DiningRecommendation {
  name: string;
  description: string;
  estimated_cost: number;
}

export interface Dining {
  breakfast: DiningRecommendation;
  lunch: DiningRecommendation;
  dinner: DiningRecommendation;
}

export interface DailyPlan {
  day: number;
  theme: string;
  activities: Activity[];
  dining: Dining;
}

export interface Itinerary {
  tripTitle: string;
  totalEstimatedCost: number;
  summary: string;
  days: DailyPlan[];
}
