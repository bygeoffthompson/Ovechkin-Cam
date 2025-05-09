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

    const header = (
        <header>
            <h1>Watch Every Ovechkin Goal</h1>
            <span className="record"></span>
        </header>
    );

    const footer = (
        <footer>
            <span className="acknowledgements" title="@Capitals, @EveryOvechkinGoal, @NHL895 and other embedded Youtube channels.">Acknowledgements</span>&nbsp;|&nbsp;
            <a href="https://x.com/bygeoffthompson" rel="noreferrer" target="_blank">Report an Error</a>
        </footer>
    );

    return (
        <div>
            {header}
            <form onsubmit="return false;">
                <input type="number" placeholder="#" value={searchTerm} onChange={handleInputChange}/>
                <button type="submit" disabled>Submit</button>
            </form>

            {searchResults.map((result, index) => (
                <div className="iframe" key={index}>
                    <div className="light">
                        <div className="goal">{result.goal}</div>
                    </div>
                    <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin"></iframe>
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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SearchForm jsonData={data}/>
        </div>
    );
}

export default App;