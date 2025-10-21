import React, { useState, useEffect } from 'react';
import { getLocationSuggestions } from '../utils/geocoding';

const LocationSearchPanel = ({ 
  activeField, 
  onLocationSelect, 
  setPanelOpen, 
  setVehiclePanel,
  initialText,
  updateQuery
}) => {
  const [query, setQuery] = useState(initialText || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update local query when initialText changes
  useEffect(() => {
    setQuery(initialText || '');
  }, [initialText]);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await getLocationSuggestions(query);
        setSuggestions(results);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (updateQuery) {
      updateQuery(newQuery);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    onLocationSelect(activeField, { 
      lat: suggestion.lat, 
      lng: suggestion.lng, 
      text: suggestion.name 
    });
    setPanelOpen(false);

    // If user was picking destination, open vehicle panel after select
    if (activeField === 'destination') {
      setTimeout(() => setVehiclePanel(true), 400);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h4 className="text-lg font-semibold mb-3">
        {activeField === 'pickup' ? 'Select a pickup location' : 'Select a destination'}
      </h4>

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={activeField === 'pickup' ? 'Search pickup locations' : 'Search destinations'}
        className="w-full p-3 border rounded-lg mb-3"
        autoFocus
      />

      {loading && <p className="text-gray-500 text-sm">Loading suggestions...</p>}

      {!loading && suggestions.length === 0 && query.length > 0 && (
        <p className="text-gray-400 text-sm">No results found</p>
      )}

      <div className="space-y-2">
        {suggestions.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSuggestionSelect(s)}
            className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
          >
            <i className="ri-map-pin-fill mr-2 text-gray-600"></i>
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;