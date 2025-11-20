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
                    item.month + ' ' + item.day + ' ' + item.year + ' ' + item.goalie + ' ' + item.team + item.tags + ' ' + item.type + ' ' + item.season;
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
        const query = window.location.search.slice(1).replace(/-/g, ' ').toLowerCase();
        const queryInteger = parseInt(query);
        if (queryInteger >= 1 && queryInteger <= 904) {
            setSearchGoal(queryInteger);
        } else if (query.includes('+')) {
            const multipleSearch = query.split('+');
            setSearchText1(multipleSearch[0].split('&', 1));
            setSearchText2(multipleSearch[1].split('&', 1));
            if (multipleSearch[2]) {
                setSearchText3(multipleSearch[2].split('&', 1));
            }
        } else if (query) {
            setSearchText1(query.split('&', 1));
            setSearchText2('');
            setSearchText3('');
        }
    },[]);

    const copyFunction = () => {
        var link = document.querySelector('.link strong').innerHTML;
        navigator.clipboard.writeText(link);
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
        setSearchText1(event.target.value.toLowerCase());
    };

    const handleText2 = (event) => {
        setSearchGoal('');
        setSearchText2(event.target.value.toLowerCase());
    };

    const handleText3 = (event) => {
        setSearchGoal('');
        setSearchText3(event.target.value.toLowerCase());
    };

    const emptyNetGoal = () => {
        goalButton(['ENG']);
        clickTrack('Empty Net');
    };

    const gameWinningGoal = () => {
        goalButton(['OT', 'GWG']);
        clickTrack('Game Winning');
    };

    const hatTrickGoal = () => {
        goalButton(['Hat Trick']);
        clickTrack('Hat Trick');
    };

    const overtimeGoal = () => {
        goalButton(['OT']);
        clickTrack('Overtime');
    };

    const powerPlayGoal = () => {
        goalButton(['PPG']);
        clickTrack('Power Play');
    };

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    function goalButton(type) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                type.includes(value)
            )
        );
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    function clickTrack(btn) {
        ReactGA.event({
            category: 'Click',
            action: btn + ' Goal Click',
            value: 1
        });
    }

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

    const anyGoal = () => {
        resultsHide();
        const anyGoal = random(1, 904);
        setSearchGoal(anyGoal);
        clickTrack('Random');
    };

    const reset = () => {
        setSearchGoal('');
        setSearchResults([]);
        resultsHide();
    };

    const clickGoal = () => {
        document.getElementById('goal-click').addEventListener('click', function(event) {
            const page = document.querySelector('body').getBoundingClientRect();
            const x = event.clientX - page.left;
            const y = event.clientY - page.top;
            document.getElementById('puck').setAttribute('style', 'left:' + x + 'px;top:' + y + 'px;');
            document.querySelector('body').classList.add('cursor',);
            document.getElementById('puck').classList.add('shot');
            setTimeout(function() {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            }, 300);
            setTimeout(function() {
                document.querySelector('body').classList.add('goal-lights');
                document.querySelector('body').classList.remove('cursor');
                document.getElementById('puck').classList.remove('shot');
                document.getElementById('puck').setAttribute('style', 'left:initial;top:initial;');
                setTimeout(function() {
                    document.querySelector('body').classList.remove('goal-lights');
                }, 1500);
            }, 750);
            ReactGA.event({
                category: 'Shots',
                action: 'Shots Taken',
                value: 1
            });
        });
    };

    return (
        <div>
            <div id="goal">
                <img alt="Goal Net" src="icons/net.svg"/>
            </div>
            <form onSubmit={preventSubmit}>
                <div>
                    <h2>Search</h2>
                    <label htmlFor="search-goal">Number</label>
                    <input id="search-goal" min="1" max="904" tabIndex="0" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
                    <label htmlFor="search-text-1">Text</label>
                    <label htmlFor="search-text-2" hidden>Text</label>
                    <label htmlFor="search-text-3" hidden>Text</label>
                    <input id="search-text-1" tabIndex="1" type="text" placeholder="Search" value={searchText1} onChange={handleText1}/>
                    <input id="search-text-2" tabIndex="2" type="text" placeholder="And" value={searchText2} onChange={handleText2}/>
                    <input id="search-text-3" tabIndex="3" type="text" placeholder="And" value={searchText3} onChange={handleText3}/>
                </div>
                <div>
                    <strong>or Randomize</strong>
                </div>
                <div>
                    <button onClick={anyGoal} name="Goal" title="Any Goal" type="button">Any Goal</button>
                    <button onClick={powerPlayGoal} name="Power Play Goal" title="A Power Play Goal" type="button">PPG</button>
                    <button onClick={gameWinningGoal} name="Game Winning Goal" title="A Game Winning Goal" type="button">GWG</button>
                    <button onClick={emptyNetGoal} name="Empty Net Goal" title="An Empty Net Goal" type="button">ENG</button>
                    <button onClick={overtimeGoal} name="Overtime Goal" title="An Overtime Goal" type="button">OT Goal</button>
                    <button onClick={hatTrickGoal} name="Hat Trick Goal" title="A Hat Trick Goal" type="button">Hat Trick Goal</button>
                    <button onClick={reset} name="Reset" type="button">Reset</button>
                </div>
            </form>

            <div id="advanced">
                <label htmlFor="season" hidden>Filter By Season</label>
                <select id="season" name="Season" onChange={handleSeasonChange}>
                    <option name="All" value="" selected>All</option>
                    <option name="Regular Season" value="Regular">Regular Season</option>
                    <option name="All Star Game" value="All Star Game">All Star Game</option>
                    <option name="Playoffs" value="Playoffs">Playoffs</option>
                    <option name="KHL" value="KHL">KHL</option>
                </select>
                <strong id="count"></strong>
            </div>

            <div id="goal-click" onClick={clickGoal}></div>

            {searchResults.map((result, index) => (
                <div className="frame" key={index}>
                    <div className="note">
                        <div>
                            <img alt="Goal Siren icon" className="goal-siren" src="/icons/goal-siren.svg" />
                            <strong className="type">{result.type}</strong>
                        </div>
                        <strong class="goal-count" data-season={result.season}><span>#{result.goal}</span></strong>
                        <div>
                            <strong className="goalie">{result.goalie}</strong>
                        </div>
                        <div>
                            <img alt={result.team + ' logo'} className="logo" src={'/teams/' + result.team + '.svgz'} />
                        </div>
                        <div>
                            <strong><i>{result.month} {result.day} {result.year}</i></strong>
                        </div>
                    </div>
                    <div className="shadow">
                        <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="Alex Ovechkin Goal Video"
                            referrerPolicy="cross-origin-with-strict-origin" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="goal-text">
                        <strong>{result.text}</strong>
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