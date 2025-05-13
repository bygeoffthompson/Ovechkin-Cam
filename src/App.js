import React, {useState, useEffect} from 'react';

function SearchForm({jsonData}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const query = parseInt(window.location.search.slice(1));

        if (query >= 1 && query <= 897) {
            setSearchTerm(query);
            document.getElementById('search').disabled = true;
        }

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

    const copyFunction = (event) => {
        var link = document.getElementById("link").innerHTML;
        navigator.clipboard.writeText(link);
    };

    const header = (
        <header>
            <img alt="Goal Light gif" className="goal-light" src="/goal-light.gif"/>
            <h1><a href="/" title="Home">Search and Watch Ovechkin Goal Videos</a></h1>
            <img alt="Record Light gif" className="record-light" src="/record-light.gif"/>
        </header>
    );

    const footer = (
        <footer>
            <a href="/about.txt">About</a>
            &nbsp;|&nbsp;
            <a href="https://x.com/bygeoffthompson" rel="noreferrer" target="_blank">Report an Error</a>
            &nbsp;|&nbsp;
            <a href="/thanks.txt">Thanks</a>
        </footer>
    );

    return (
        <div>
            {header}
            <form onSubmit={preventSubmit}>
                <input min="0" max="897" id="search" type="number" placeholder="#" value={searchTerm} onChange={handleInputChange}/>
                <button type="submit" disabled>Submit</button>
            </form>

            {searchResults.map((result, index) => (
                <div className="frame" key={index}>
                    <div id="note" className={result.icon}>
                        <span><span id="icon"></span></span>
                        <strong>{result.text}</strong>
                    </div>
                    <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div className="flex">
                        <strong id="link">https://www.ovechkin.cam/?{result.goal}</strong>
                        <button onClick={copyFunction} id="copy" title="Copy Link">Copy</button>
                    </div>
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