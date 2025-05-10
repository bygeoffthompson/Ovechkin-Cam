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

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    const header = (
        <header>
            <h1>Watch Every Ovechkin Goal</h1>
            <span className="record"></span>
        </header>
    );

    const footer = (
        <footer>
            <a href="/about.html">About</a>
            &nbsp;|&nbsp;
            <a href="https://x.com/bygeoffthompson" rel="noreferrer" target="_blank">Report an Error</a>
            &nbsp;|&nbsp;
            <a href="/thanks.html">Thanks</a>
        </footer>
    );

    return (
        <div>
            {header}
            <form onSubmit={preventSubmit}>
                <input type="number" placeholder="#" value={searchTerm} onChange={handleInputChange}/>
                <button type="submit" disabled>Submit</button>
            </form>

            {searchResults.map((result, index) => (
                <div className="iframe" key={index}>
                    <div className="light">
                        <div className="goal">{result.goal}</div>
                    </div>
                    <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            ))}
            {footer}
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('goals.json');
            const json = await response.json();
            setData(json);
        }

        fetchData();
    }, []);

    if (!data) {
        return <div className="loading">Loading...</div>;
    }

    return (
            <div>
                <SearchForm jsonData={data}/>
            </div>
    );
}

export default App;