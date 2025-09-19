
import React from 'react';
import type { Itinerary, DailyPlan, Activity, DiningRecommendation } from '../types';

const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const ActivityCard: React.FC<{ activity: Activity, city: string }> = ({ activity, city }) => (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex justify-between items-start">
            <h4 className="font-semibold text-blue-300">{activity.name}</h4>
            <span className="text-sm font-mono text-gray-400">${activity.estimated_cost}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1 mb-3">{activity.description}</p>
        <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.name + ', ' + city)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
            <MapIcon /> View on Map
        </a>
    </div>
);

const DiningCard: React.FC<{ meal: string, recommendation: DiningRecommendation }> = ({ meal, recommendation }) => (
     <div className="bg-slate-900/50 p-4 rounded-lg">
        <p className="text-sm font-semibold text-gray-300 capitalize">{meal}</p>
        <div className="flex justify-between items-start mt-1">
            <h5 className="font-medium text-violet-300">{recommendation.name}</h5>
            <span className="text-xs font-mono text-gray-400">${recommendation.estimated_cost}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{recommendation.description}</p>
    </div>
);


const DailyPlanCard: React.FC<{ plan: DailyPlan, city: string }> = ({ plan, city }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700 mb-8">
        <div className="border-b border-slate-700 pb-3 mb-4">
            <h2 className="text-2xl font-bold text-white">Day {plan.day}: <span className="text-violet-400">{plan.theme}</span></h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                 <h3 className="text-lg font-semibold text-gray-200 mb-3">Activities</h3>
                 <div className="space-y-4">
                    {plan.activities.map((activity, index) => (
                        <ActivityCard key={index} activity={activity} city={city} />
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Dining</h3>
                <div className="space-y-3">
                   <DiningCard meal="breakfast" recommendation={plan.dining.breakfast} />
                   <DiningCard meal="lunch" recommendation={plan.dining.lunch} />
                   <DiningCard meal="dinner" recommendation={plan.dining.dinner} />
                </div>
            </div>
        </div>
    </div>
);


const ItineraryDisplay: React.FC<{ itinerary: Itinerary, city: string }> = ({ itinerary, city }) => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-12 animate-fade-in">
            <div className="text-center mb-10 p-6 bg-slate-800 rounded-xl border border-slate-700">
                <h1 className="text-4xl font-extrabold text-white mb-2">{itinerary.tripTitle}</h1>
                <p className="text-lg text-gray-300 mb-4">{itinerary.summary}</p>
                <div className="text-xl font-bold text-violet-400">
                    Total Estimated Cost: <span className="font-mono">${itinerary.totalEstimatedCost}</span>
                </div>
            </div>

            <div>
                {itinerary.days.map((plan) => (
                    <DailyPlanCard key={plan.day} plan={plan} city={city} />
                ))}
            </div>
        </div>
    );
};

export default ItineraryDisplay;
