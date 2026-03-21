import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Economic = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEconomicEvents = async () => {
      const options = {
        method: 'GET',
        url: 'https://economic-events-calendar.p.rapidapi.com/economic-events/tradingview',
        params: { countries: 'US,GB' },
        headers: {
          'x-rapidapi-host': 'economic-events-calendar.p.rapidapi.com',
          'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
        },
      };

      try {
        const response = await axios.request(options);
        setEvents(response.data.events || []); // Assuming the API response contains an `events` array
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch economic events');
        setLoading(false);
      }
    };

    fetchEconomicEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Economic Events</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-secondary-dark-bg border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Country</th>
              <th className="px-4 py-2 border-b">Event</th>
              <th className="px-4 py-2 border-b">Impact</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="px-4 py-2 border-b">{event.date || 'N/A'}</td>
                <td className="px-4 py-2 border-b">{event.country || 'N/A'}</td>
                <td className="px-4 py-2 border-b">{event.event || 'N/A'}</td>
                <td className="px-4 py-2 border-b">{event.impact || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Economic;