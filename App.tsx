
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { generateItinerary } from './services/geminiService';
import type { Itinerary, TripFormData } from './types';

function App() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string>('');

  const handleGenerateItinerary = useCallback(async (formData: TripFormData) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setCurrentCity(formData.city);

    try {
      const result = await generateItinerary(formData);
      setItinerary(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="mt-8">
          <TripForm onSubmit={handleGenerateItinerary} isLoading={isLoading} />
          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && <div className="max-w-2xl mx-auto"><ErrorDisplay message={error} /></div>}
            {itinerary && <ItineraryDisplay itinerary={itinerary} city={currentCity} />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
