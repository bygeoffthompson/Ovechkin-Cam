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

    useEffect(() => {
        const query = parseInt(window.location.search.slice(1));
        if (query >= 1 && query <= 897) {
            setSearchTerm(query);
        }
    },[]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const highlight = (event) => {
        const highlight = jsonData.filter(item =>
            Object.values(item).some(value =>
                value === 'bookmark'  ||
                value === 'bullseye'  ||
                value === 'four'  ||
                value === 'fifty' ||
                value === 'hat' ||
                value === 'mega' ||
                value === 'sixty' ||
                value === 'trophy'
            )
        );
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const goal = Object.values(highlight[getRandomInt(1, Object.keys(highlight).length)]);
        setSearchTerm(goal[0]);
    };

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    const random = () => {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        setSearchTerm(getRandomInt(0, 897));
    };

    const copyFunction = (event) => {
        var link = document.getElementById("link").innerHTML;
        navigator.clipboard.writeText(link);
    };

    return (
        <div>
            <form onSubmit={preventSubmit}>
                <span>Goal Number&nbsp;</span>
                <input min="0" max="897" id="search" type="number" placeholder="#" value={searchTerm} onChange={handleInputChange}/>
                <span>&nbsp;or&nbsp;</span>
                <button onClick={random} type="button">Random</button>
                <span>&nbsp;or a&nbsp;</span>
                <button onClick={highlight} type="button">Highlight</button>
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