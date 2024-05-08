import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://gigchain-backend.vercel.app/api/gig/search?query=${searchQuery}`
      );
      setSearchResults(response.data.gigs);
    } catch (error) {
      console.error("Error searching gigs:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search gigs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* {searchResults.map((gig) => (
        <div key={gig._id}>
          <h3>{gig.title}</h3>
          <p>{gig.description}</p>
        </div>
      ))} */}
    </div>
  );
};

export default SearchBar;
