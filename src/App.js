import React, {useState, useEffect} from 'react';

function SearchForm({jsonData}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = jsonData.filter(item =>
                Object.values(item).some(value =>
                    value.includes(searchTerm)
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
            <label for="goalSearch">Search By Goal Number</label>
            <br/>
            <input id="goalSearch" type="number" placeholder="Goal Number" value={searchTerm} onChange={handleInputChange}/>
            </form>

            {searchResults.map((result, index) => (
                <div key={index}>
                    <p>Watch goal {JSON.stringify(result.goal).replace(/"/g, "")}.</p>
                    <iframe width="560" height="315" src={JSON.stringify(result.link).replace(/"/g, "")} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                </div>
            ))}
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
            <SearchForm jsonData={data}/>
        </div>
    );
}

export default App;