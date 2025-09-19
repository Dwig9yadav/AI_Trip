
import { GoogleGenAI, Type } from "@google/genai";
import type { Itinerary, TripFormData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema = {
    type: Type.OBJECT,
    properties: {
        tripTitle: { type: Type.STRING, description: "A creative and exciting title for the trip." },
        totalEstimatedCost: { type: Type.NUMBER, description: "The total estimated cost for the entire trip in USD." },
        summary: { type: Type.STRING, description: "A brief, engaging summary of the trip plan." },
        days: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number of the itinerary." },
                    theme: { type: Type.STRING, description: "A theme for the day's activities (e.g., 'Historical Exploration', 'Relaxing Beach Day')." },
                    activities: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Name of the activity or attraction." },
                                description: { type: Type.STRING, description: "A short description of the activity." },
                                estimated_cost: { type: Type.NUMBER, description: "Estimated cost for this activity in USD." }
                            },
                            required: ['name', 'description', 'estimated_cost']
                        }
                    },
                    dining: {
                        type: Type.OBJECT,
                        properties: {
                            breakfast: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING, description: "Restaurant/cafe name for breakfast." },
                                    description: { type: Type.STRING, description: "Description of the place and what to eat." },
                                    estimated_cost: { type: Type.NUMBER, description: "Estimated cost for breakfast in USD." }
                                },
                                required: ['name', 'description', 'estimated_cost']
                            },
                            lunch: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING, description: "Restaurant/cafe name for lunch." },
                                    description: { type: Type.STRING, description: "Description of the place and what to eat." },
                                    estimated_cost: { type: Type.NUMBER, description: "Estimated cost for lunch in USD." }
                                },
                                required: ['name', 'description', 'estimated_cost']
                            },
                            dinner: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING, description: "Restaurant name for dinner." },
                                    description: { type: Type.STRING, description: "Description of the place and what to eat." },
                                    estimated_cost: { type: Type.NUMBER, description: "Estimated cost for dinner in USD." }
                                },
                                required: ['name', 'description', 'estimated_cost']
                            },
                        },
                        required: ['breakfast', 'lunch', 'dinner']
                    }
                },
                required: ['day', 'theme', 'activities', 'dining']
            }
        }
    },
    required: ['tripTitle', 'totalEstimatedCost', 'summary', 'days']
};

export const generateItinerary = async ({ city, budget, days }: TripFormData): Promise<Itinerary> => {
    const prompt = `
    You are an expert travel planner. Create a detailed, day-by-day travel itinerary for a trip to ${city} for ${days} days with a total budget of approximately $${budget} USD.

    Please provide the output in a valid JSON format that adheres to the provided schema.

    The itinerary should be creative and practical, balancing popular attractions with unique local experiences. For each day, provide a theme, a list of activities, and dining recommendations for breakfast, lunch, and dinner. Include estimated costs for activities and meals to help stay within the overall budget. The total estimated cost should be a reasonable approximation based on the suggestions.

    Do not include any introductory text or markdown formatting, just the raw JSON object.
  `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: itinerarySchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as Itinerary;

    } catch (error) {
        console.error("Error generating itinerary:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate itinerary: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the itinerary.");
    }
};
