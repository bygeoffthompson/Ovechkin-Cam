import React, {useState, useEffect} from 'react';

function SearchForm({jsonData}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = jsonData.filter(item =>
                Object.values(item).some(value =>
                    typeof value === 'number' && value == searchTerm
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
            <form>
            <input type="number" placeholder="Goal Number" value={searchTerm} onChange={handleInputChange} />
            </form>

            {searchResults.map((result, index) => (
                <div key={index}>
                    <p>
                        <strong>Goal {result.goal}</strong>
                    </p>
                    <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                </div>
            ))}
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/Ovechkin-Bot/goals.json');
            //const response = await fetch('goals.json');
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
            <SearchForm jsonData={data}/>
        </div>
    );
}

export default App;