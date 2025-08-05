import React, {useState, useEffect} from 'react';
import ReactGA from "react-ga4";

ReactGA.initialize("G-5RVBYX6N0S");

function SearchForm({jsonData}) {
    const [searchGoal, setSearchGoal] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchGoal) {
            setSearchText('');
            const goalQuery = parseInt(searchGoal);
            function suffix(goal) {
                const j = goal % 10;
                const k = goal % 100;
                if (j === 1 && k !== 11) {
                    return goal + "st";
                }
                if (j === 2 && k !== 12) {
                    return goal + "nd";
                }
                if (j === 3 && k !== 13) {
                    return goal + "rd";
                }
                return goal + "th";
            }
            const results = jsonData.filter(item => item.goal === goalQuery)
            setSearchResults(results);

            if (!window.location.hostname.includes('localhost')) {
                ReactGA.event({
                    category: "Goals",
                    action: "Goal " + goalQuery,
                    value: 1
                });
                ReactGA.event({
                    category: "Total",
                    action: "Total Goals",
                    value: 1
                });
            }

            document.querySelector('h1').innerHTML = 'Alex Ovechkin\'s ' + suffix(goalQuery) + ' Goal';
            document.querySelector('title').innerHTML = goalQuery + ' | Ovechkin Cam';
            document.querySelector('meta[name="description"]').setAttribute('content', 'Watch broadcast footage of Alex Ovechkin\'s ' + suffix(goalQuery) + ' career NHL goal.');
        }
        if (searchText) {
            const results = jsonData.filter((item) => {
                return (
                    item.goalie.toLowerCase().includes(searchText) ||
                    item.team.toLowerCase().includes(searchText)
                );
            });
            setSearchResults(results);
        }
    }, [searchGoal, searchText, jsonData]);

    useEffect(() => {
        const query = parseInt(window.location.search.slice(1));
        if (query >= 1 && query <= 897) {
            setSearchGoal(query);
        }
    },[]);

    const copyFunction = () => {
        var link = document.getElementById("link").innerHTML;
        navigator.clipboard.writeText(link);
    };

    const handleGoalChange = (event) => {
        setSearchGoal(event.target.value);
    };

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleTextClick = () => {
        setSearchGoal('');
    };

    const highlightGoal = () => {
        setSearchText('');
        const highlights = ['four', 'fifty', 'hat', 'mega', 'moon', 'penalty', 'sixty', 'sun', 'trophy'];

        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                highlights.includes(value)
            )
        );

        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);

        if (!window.location.hostname.includes('localhost')) {
            ReactGA.event({
                category: "Click",
                action: "Highlight Goal Click",
                value: 1
            });
        }
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
        setSearchText('');
        const randomGoal = random(1, 897);
        setSearchGoal(randomGoal);

        if (!window.location.hostname.includes('localhost')) {
            ReactGA.event({
                category: "Click",
                action: "Random Goal Click",
                value: 1
            });
        }
    };

    const todayGoal = () => {
        setSearchText('');
        const date = new Date();
        const hash = (date.getMonth() + 1) * date.getDate();
        const goal = hash * 2.41129;
        setSearchGoal(Math.trunc(goal));
        
        if (!window.location.hostname.includes('localhost')) {
            ReactGA.event({
                category: "Click",
                action: "Today's Goal Click",
                value: 1
            });
        }
    };

    return (
        <div>
            <form onSubmit={preventSubmit}>
                <div>
                    <h2>Search</h2>
                    <label htmlFor="search-goal">Goal</label>
                    <input min="1" max="897" id="search-goal" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
                    <label htmlFor="search-text">Text</label>
                    <input id="search-text" type="text" placeholder="Goalie, Opponent" value={searchText} onChange={handleTextChange} onClick={handleTextClick}/>
                </div>
                <div>
                    <button onClick={randomGoal} name="Random Goal" type="button">Random Goal</button>/
                    <button onClick={highlightGoal} name="Highlight Goal" type="button">Highlight Goal</button>/
                    <button onClick={todayGoal} name="Today's Goal" type="button">Today's Goal</button>
                </div>
            </form>

            {searchResults.map((result, index) => (
                <div className="frame" key={index}>
                    <div id="note" className={result.highlight}>
                        <span><span id="icon"></span></span>
                        <strong>{result.text}</strong>
                    </div>
                    <div id="shadow">
                        <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="Alex Ovechkin Goal Video"
                            referrerPolicy="no-referrer" allowFullScreen loading="lazy"></iframe>
                    </div>
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