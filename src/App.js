import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]); // Stores all countries
  const [filteredCountries, setFilteredCountries] = useState([]); // Stores filtered countries for display
  const [searchTerm, setSearchTerm] = useState(""); // Stores search input
  const [error, setError] = useState(null); // Error state

  const apiEndpoint = "https://xcountriesapi.onrender.com/all   ";

  // Fetch countries from API on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("Failed to fetch countries.");
        const data = await response.json();
        console.log(data);
        setCountries(data.data);
        setFilteredCountries(data.data); // Display all countries initially
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to fetch countries.");
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
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error-message">{error}</p>}

      <div className="grid-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="countryCard" key={country.name}>
              <img src={country.flag} alt={`Flag of ${country.name}`} />
              <p>{country.name}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
