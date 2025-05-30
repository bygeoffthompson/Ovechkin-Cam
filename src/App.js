import React, {useState, useEffect} from 'react';
import ReactGA from "react-ga4";

ReactGA.initialize("G-5RVBYX6N0S");

function SearchForm({jsonData}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = jsonData.filter(item =>
                Object.values(item).some(value =>
                    typeof value === 'number' && value === parseInt(searchTerm)
                )
            );
            setSearchResults(results);
            console.log("Goal " + parseInt(searchTerm))
            ReactGA.event({
                category: "Individual Goals",
                action: "Goal " + parseInt(searchTerm),
                value: 1
            });
            ReactGA.event({
                category: "Total Goals",
                action: "Total Goals",
                value: 1
            });

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

    const copyFunction = () => {
        var link = document.getElementById("link").innerHTML;
        navigator.clipboard.writeText(link);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const highlightGoal = () => {
        const highlights = ['bullseye', 'four', 'fifty', 'hat', 'mega', 'moon', 'penalty', 'sixty', 'sun', 'trophy'];

        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                highlights.includes(value)
            )
        );

        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchTerm(goal[0]);
    };

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomGoal = () => {
        const randomGoal = random(1, 897);
        setSearchTerm(randomGoal);
    };

    const todayGoal = () => {
        const date = new Date();
        const hash = (date.getMonth() + 1) * date.getDate();
        const goal = hash * 2.41129;
        setSearchTerm(Math.trunc(goal));
    };

    return (
        <div>
            <form onSubmit={preventSubmit}>
                <div>
                    <span>Goal&nbsp;</span>
                    <input min="0" max="897" id="search" type="number" placeholder="#" value={searchTerm} onChange={handleInputChange}/>
                    <span>&nbsp;or</span>
                </div>
                <div>
                    <button onClick={randomGoal} type="button">Random Goal</button>
                    <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                    <button onClick={highlightGoal} type="button">Highlight Goal</button>
                    <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                    <button onClick={todayGoal} type="button">Today's Goal</button>
                </div>
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