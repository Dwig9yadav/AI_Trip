
import React, { useState } from 'react';
import type { TripFormData } from '../types';

interface TripFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !budget || !days) {
      setError('All fields are required.');
      return;
    }
    const budgetNum = parseInt(budget, 10);
    const daysNum = parseInt(days, 10);
    if (isNaN(budgetNum) || budgetNum <= 0 || isNaN(daysNum) || daysNum <= 0) {
      setError('Please enter valid numbers for budget and days.');
      return;
    }
    setError('');
    onSubmit({ city, budget: budgetNum, days: daysNum });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
            Destination City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
            placeholder="e.g., Paris, France"
            disabled={isLoading}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
              Budget (USD)
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              placeholder="e.g., 2000"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-2">
              Number of Days
            </label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              placeholder="e.g., 7"
              disabled={isLoading}
            />
          </div>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-400"
        >
          {isLoading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </form>
    </div>
  );
};

export default TripForm;
