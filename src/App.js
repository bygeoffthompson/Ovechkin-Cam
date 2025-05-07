import React, { useState, useEffect } from 'react';

function SearchForm({ jsonData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = jsonData.filter(item =>
                Object.values(item).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, jsonData]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Search By Goal Number"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>{JSON.stringify(result)}</li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/goals.json');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SearchForm jsonData={data} />
        </div>
    );
}

export default App;