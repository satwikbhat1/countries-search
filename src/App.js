import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]); // Stores all countries
  const [filteredCountries, setFilteredCountries] = useState([]); // Stores filtered countries for display
  const [searchTerm, setSearchTerm] = useState(""); // Stores search input
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  const apiEndpoint = "https://xcountriesapi.onrender.com/all";

  // Fetch countries from API on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        const response = await fetch(apiEndpoint.trim()); // Trim API endpoint
        if (!response.ok) throw new Error("Failed to fetch countries.");

        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setCountries(data.data);
          setFilteredCountries(data.data); // Display all countries initially
        } else {
          throw new Error("Unexpected API response structure.");
        }
      } catch (err) {
        console.error("Error fetching countries:", err.message);
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCountries();
  }, []);

  // Update filtered countries when search term changes
  useEffect(() => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    const filtered = countries.filter((country) =>
      country.name?.toLowerCase().includes(trimmedTerm)
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div className="App">
      <h1>Country Search App</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading-message">Loading countries...</p>
      ) : (
        <div className="grid-container">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <div className="countryCard" key={`${country.name}-${index}`}>
                <img
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  className="country-flag"
                />
                <p className="country-name">{country.name}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No countries found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
