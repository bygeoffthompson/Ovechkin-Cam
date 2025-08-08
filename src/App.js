import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-5RVBYX6N0S');

function SearchForm({jsonData}) {
    const [searchGoal, setSearchGoal] = useState('');
    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [searchText3, setSearchText3] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchGoal) {
            resultsHide();
            const goalQuery = parseInt(searchGoal);
            const results = jsonData.filter(item => item.goal === goalQuery && item.season === 'Regular')
            setSearchResults(results);

            ReactGA.event({
                category: 'Goals',
                action: 'Goal ' + goalQuery,
                value: 1
            });
            ReactGA.event({
                category: 'Total',
                action: 'Total Goals',
                value: 1
            });
        }
        if (searchText1 || searchText2 || searchText3) {
            const results = jsonData.filter((item) => {
                const search =
                    item.month + ' ' + item.day + ' ' + item.year + ' ' + item.goalie + ' ' + item.tags + ' ' + item.type + ' ' + item.team;
                return (
                    search.toLowerCase().includes(searchText1) &&
                    search.toLowerCase().includes(searchText2) &&
                    search.toLowerCase().includes(searchText3) &&
                    item.season.includes(document.getElementById('season').value)
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
    }, [searchGoal, searchText1, searchText2, searchText3, jsonData]);

    useEffect(() => {
        const query = window.location.search.slice(1);
        const queryInteger = parseInt(query);
        if (queryInteger >= 1 && queryInteger <= 897) {
            setSearchGoal(queryInteger);
        } else {
            setSearchText1(query);
            setSearchText2('');
            setSearchText3('');
        }
    },[]);

    const copyFunction = () => {
        var link = document.querySelector('.link strong').innerHTML;
        navigator.clipboard.writeText(link);
    };

    const emptyNetGoal = () => {
        resultsHide();
        const eng = ['ENG'];

        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                eng.includes(value)
            )
        );

        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);

        ReactGA.event({
            category: 'Click',
            action: 'Empty Net Goal Click',
            value: 1
        });
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

        ReactGA.event({
            category: 'Click',
            action: 'Game Winning Goal Click',
            value: 1
        });
    };

    const handleGoalChange = (event) => {
        setSearchGoal(event.target.value);
    };

    const handleSeasonChange = (event) => {
        const searchText1 = document.getElementById('search-text-1').value;
        const searchText2 = document.getElementById('search-text-2').value;
        const searchText3 = document.getElementById('search-text-3').value;
        setSearchText1([searchText1]);
        setSearchText2([searchText2]);
        setSearchText3([searchText3]);
    };

    const handleText1 = (event) => {
        setSearchGoal('');
        setSearchText1(event.target.value);
    };

    const handleText2 = (event) => {
        setSearchGoal('');
        setSearchText2(event.target.value);
    };

    const handleText3 = (event) => {
        setSearchGoal('');
        setSearchText3(event.target.value);
    };

    const hatTrickGoal = () => {
        resultsHide();
        const hat = ['Hat Trick'];

        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                hat.includes(item.tags)
            )
        );

        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);

        ReactGA.event({
            category: 'Click',
            action: 'Hat Trick Goal Click',
            value: 1
        });
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

        ReactGA.event({
            category: 'Click',
            action: 'Overtime Goal Click',
            value: 1
        });
    };

    const powerPlayGoal = () => {
        resultsHide();
        const ppg = ['PPG'];

        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                ppg.includes(value)
            )
        );

        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);

        ReactGA.event({
             category: 'Click',
            action: 'Power Play Goal Click',
            value: 1
        });
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
        setSearchText1('');
        setSearchText2('');
        setSearchText3('');
        document.querySelector('#advanced').classList.remove('show');
    }

    const randomGoal = () => {
        resultsHide();
        const randomGoal = random(1, 897);
        setSearchGoal(randomGoal);

        ReactGA.event({
            category: 'Click',
            action: 'Random Goal Click',
            value: 1
        });
    };

    const reset = () => {
        setSearchResults([]);
        resultsHide();
    };

    const todayGoal = () => {
        resultsHide();
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        var goal = parseInt(day * 2.45);
        setSearchGoal(Math.trunc(goal));
        
        ReactGA.event({
            category: 'Click',
            action: 'Today\'s Goal Click',
            value: 1
        });
    };

    return (
        <div>
            <form onSubmit={preventSubmit}>
                <div>
                    <h2>Search</h2>
                    <label htmlFor="search-goal">Goal</label>
                    <input min="1" max="897" id="search-goal" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
                    <label htmlFor="search-text-1">Text</label>
                    <input id="search-text-1" type="text" placeholder="" value={searchText1} onChange={handleText1}/>
                    <label htmlFor="search-text-2" hidden>More Text</label>
                    <input id="search-text-2" type="text" placeholder="" value={searchText2} onChange={handleText2}/>
                    <label htmlFor="search-text-3" hidden>More Text</label>
                    <input id="search-text-3" type="text" placeholder="" value={searchText3} onChange={handleText3}/>
                </div>
                <div>
                    <button onClick={randomGoal} name="Goal" title="A Random Goal" type="button">Goal</button>
                    <button onClick={powerPlayGoal} name="Power Play Goal" title="A Power Play Goal" type="button">PPG</button>
                    <button onClick={gameWinningGoal} name="Game Winning Goal" title="A Game Winning Goal" type="button">GWG</button>
                    <button onClick={emptyNetGoal} name="Empty Net Goal" title="An Empty Net Goal" type="button">ENG</button>
                    <button onClick={overtimeGoal} name="Overtime Goal" title="An Overtime Goal" type="button">OT Goal</button>
                    <button onClick={hatTrickGoal} name="Hat Trick Goal" title="A Hat Trick Goal" type="button">Hat Trick Goal</button>
                    <button onClick={todayGoal} name="Today's Goal" title="A New Goal Chosen Daily" type="button">Today's Goal</button>
                    <button onClick={reset} name="Reset" type="button">Reset</button>
                </div>
            </form>

            <div id="advanced">
                <label htmlFor="season" hidden>Filter By Season</label>
                <select id="season" name="Season" onChange={handleSeasonChange}>
                    <option name="Regular Season" value="Regular" selected>Regular Season</option>
                    <option name="Playoffs" value="Playoff">Playoffs</option>
                    <option name="All" value="">All</option>
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