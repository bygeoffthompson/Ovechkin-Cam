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
            resultsHide();
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
            const results = jsonData.filter(item => item.goal <= 897 && item.goal === goalQuery)
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
        }
        if (searchText) {
            const results = jsonData.filter((item) => {
                const search =
                    item.month + ' ' + item.day + ' ' + item.year + ' ' + item.season + ' ' + item.goalie + ' ' + item.tags + ' ' + item.team;
                return (
                    search.toLowerCase().includes(searchText) && item.season.includes(document.getElementById('season').value)
                );
            });
            if (results.length > 0) {
                document.querySelector('#advanced').classList.add('show');
            }
            if (results.length === 1) {
                document.querySelector('#count').innerHTML = results.length + ' Result';
            } else {
                document.querySelector('#count').innerHTML = results.length + ' Results';
            }
            setSearchResults(results);
        }
    }, [searchGoal, searchText, jsonData]);

    useEffect(() => {
        const query = window.location.search.slice(1);
        const queryInteger = parseInt(query);
        if (queryInteger >= 1 && queryInteger <= 897) {
            setSearchGoal(queryInteger);
        } else {
            setSearchText(query);
        }
    },[]);

    const copyFunction = () => {
        var link = document.querySelector(".link strong").innerHTML;
        navigator.clipboard.writeText(link);
    };

    const gameWinningGoal = () => {
        resultsHide();
        const gwg = ['OT', 'GWG'];

        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                gwg.includes(value)
            )
        );

        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);

        if (!window.location.hostname.includes('localhost')) {
            ReactGA.event({
                category: "Click",
                action: "Game Winning Goal Click",
                value: 1
            });
        }
    };

    const handleGoalChange = (event) => {
        setSearchGoal(event.target.value);
    };

    const handleSeasonChange = (event) => {
        const query = document.getElementById('search-text').value;
        setSearchText([query]);
    };

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleTextInput = () => {
        setSearchGoal('');
    };

    const highlightGoal = () => {
        resultsHide();
        const highlights = ['Century', 'Four', 'Fifty', 'Hat Trick', 'Outdoor', 'Penalty Shot', 'Shorthanded', 'Sixty'];

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

    const overtimeGoal = () => {
        resultsHide();
        const ot = ['OT'];

        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                ot.includes(item.type)
            )
        );

        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);

        if (!window.location.hostname.includes('localhost')) {
            ReactGA.event({
                category: "Click",
                action: "Overtime Goal Click",
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

    function resultsHide() {
        setSearchText('');
        document.querySelector('#advanced').classList.remove('show');
    }

    const randomGoal = () => {
        resultsHide();
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

    const reset = () => {
        setSearchResults([]);
        setSearchGoal('');
        resultsHide();
    };

    const todayGoal = () => {
        resultsHide();
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
                    <input id="search-text" type="text" placeholder="Date, Goalie, Team, etc." value={searchText} onChange={handleTextChange} onKeyDown={handleTextInput}/>
                    <button onClick={reset} name="Reset" type="button">Reset</button>
                </div>
                <div>
                    <button onClick={randomGoal} name="Random Goal" type="button">Random Goal</button>/
                    <button onClick={gameWinningGoal} name="Game Winning Goal" type="button">GWG</button>/
                    <button onClick={highlightGoal} name="Highlight Goal" type="button">Highlight Goal</button>/
                    <button onClick={overtimeGoal} name="Overtime Goal" type="button">Overtime Goal</button>/
                    <button onClick={todayGoal} name="Today's Goal" type="button">Today's Goal</button>
                </div>
            </form>

            <div id="advanced">
                <label htmlFor="season">Season</label>
                <select id="season" name="Season" onChange={handleSeasonChange}>
                    <option name="Regular Season" value="regular" selected>Regular</option>
                    <option name="Playoff Season" value="playoff">Playoff</option>
                    <option name="All Seasons" value="">All</option>
                </select>
                <strong id="count"></strong>
            </div>


            {searchResults.map((result, index) => (
                <div className="frame" key={index}>
                    <div className="note">
                        <div>
                            <img alt="Goal Siren icon" className="goal-siren" src="/icons/goal-siren.svg" />
                            <strong className="type">{result.type}</strong>
                        </div>
                        <h3>#{result.goal}</h3>
                        <div>
                            <strong>{result.month} {result.day} {result.year}</strong>
                            <img alt={result.team + ' logo'} className="logo" src={'/teams/' + result.team + '.svgz'} />
                        </div>
                        <div>
                            <strong className="goalie">{result.goalie}</strong>
                            <span className="mask"></span>
                        </div>
                        <strong>{result.text}</strong>
                    </div>
                    <div className="shadow">
                        <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="Alex Ovechkin Goal Video"
                            referrerPolicy="no-referrer" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="link">
                        <strong>ovechkin.cam/?{result.goal}</strong>
                        <button onClick={copyFunction} className="copy" title="Copy Link">Copy</button>
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