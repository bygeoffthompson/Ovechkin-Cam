import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-5RVBYX6N0S');

const totalGoals = 908;

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
                    item.month +
                    ' ' + item.day +
                    ' ' + item.year +
                    ' ' + item.goalie +
                    ' ' + item.team +
                    ' ' + item.tags +
                    ' ' + item.type +
                    ' ' + item.season +
                    ' ' + item.jersey + ' Jersey';
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
        if (queryInteger >= 1 && queryInteger <= totalGoals) {
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

    const awayGoal = () => {
        goalButton(['Away']);
        clickTrack('Away');
    };

    const canadaGoal = () => {
        canada(['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']);
        clickTrack('Canada');
    };

    const copyFunction = () => {
        const link = document.querySelector('.link strong').innerHTML;
        navigator.clipboard.writeText(link);
    };

    const emptyNetGoal = () => {
        goalButton(['ENG']);
        clickTrack('Empty Net');
    };

    const homeGoal = () => {
        goalButton(['Home']);
        clickTrack('Home');
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

    function canada(type) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                type.includes(value)
            ) && item.season === 'Regular' && item.arena === 'Away'
        );
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    function goalButton(type) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                type.includes(value)
            ) && item.season === 'Regular'
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

    const reset = () => {
        setSearchGoal('');
        setSearchResults([]);
        resultsHide();
    };

    const capitol = () => {
        goalButton(['Capitol']);
        clickTrack('Capitol Jersey');
    };
    const screagle = () => {
        goalButton(['Screagle']);
        clickTrack('Screagle Jersey');
    };
    const red = () => {
        goalButton(['Red']);
        clickTrack('Red Jersey');
    };
    const white = () => {
        goalButton(['White']);
        clickTrack('White Jersey');
    };
    const brick = () => {
        const input = document.querySelector('#search-goal').value;
        if (input === '440') {
            setSearchGoal(475)
        } else {
            setSearchGoal(440)
        }
        clickTrack('Brick Jersey');
    };
    const throwback = () => {
        goalButton(['Red Throwback', 'White Throwback']);
        clickTrack('Throwback Jersey');
    };
    const navy = () => {
        goalButton(['Navy Third', 'Navy Stadium Series']);
        clickTrack('Navy Jersey');
    };
    const reverseRetro = () => {
        goalButton(['Reverse Retro Black', 'Reverse Retro Red']);
        clickTrack('Reverse Retro Jersey');
    };

    const clickGoal = () => {
        document.getElementById('click-goal').addEventListener('click', function(event) {
            const page = document.querySelector('body').getBoundingClientRect();
            const x = event.clientX - page.left;
            const y = event.clientY - page.top;
            document.getElementById('puck').setAttribute('style', 'left:' + x + 'px;top:' + y + 'px;');
            document.querySelector('body').classList.add('cursor',);
            document.getElementById('puck').classList.add('shot');
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
                    <input id="search-goal" min="1" max={totalGoals} tabIndex="0" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
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
                    &nbsp;<small>Type</small>
                    <button onClick={homeGoal} name="Home Goal" title="Home Goal" type="button">Home</button>
                    <button onClick={awayGoal} name="Away Goal" title="Away Goal" type="button">Away</button>
                    <button onClick={canadaGoal} name="Canadian Goal" title="Canadian Goal" type="button">Canada</button>
                    <button onClick={powerPlayGoal} name="Power Play Goal" title="A Power Play Goal" type="button">PPG</button>
                    <button onClick={gameWinningGoal} name="Game Winning Goal" title="A Game Winning Goal" type="button">GWG</button>
                    <button onClick={emptyNetGoal} name="Empty Net Goal" title="An Empty Net Goal" type="button">ENG</button>
                    <button onClick={overtimeGoal} name="Overtime Goal" title="An Overtime Goal" type="button">OT Goal</button>
                    <button onClick={hatTrickGoal} name="Hat Trick Goal" title="A Hat Trick Goal" type="button">Hat Trick</button>
                </div>
                <div>
                    <small>Jersey</small>
                    <button onClick={capitol} className="jersey-button" name="Capitol" title="Capitol" type="button">
                        <img alt="Capitol logo" className="jersey-logo" src="/jerseys/capitol.svgz" />
                    </button>
                    <button onClick={screagle} className="jersey-button" name="Screagle" title="Screagle" type="button">
                        <img alt="Screagle logo" className="jersey-logo" src="/jerseys/screagle.svgz" />
                    </button>
                    <button onClick={red} className="jersey-button" name="Red" title="Red" type="button">
                        <img alt="Red logo" className="jersey-logo" src="/jerseys/capitals.svgz" />
                    </button>
                    <button onClick={white} className="jersey-button" name="White" title="White" type="button">
                        <img alt="White logo" className="jersey-logo" src="/jerseys/capitals.svgz" />
                    </button>
                    <button onClick={throwback} className="jersey-button" name="Throwback" title="Throwback Third" type="button">
                        <img alt="Throwback logo" className="jersey-logo" src="/jerseys/throwback.svgz" />
                    </button>
                    <button onClick={brick} className="jersey-button" name="Brick" title="Brick" type="button">
                        <img alt="Brick Stripes logo" className="jersey-logo" src="/jerseys/brick.svgz" />
                    </button>
                    <button onClick={navy} className="jersey-button" name="Navy" title="Navy" type="button">
                        <img alt="Navy logo" className="jersey-logo" src="/jerseys/navy.svgz" />
                    </button>
                    <button onClick={reverseRetro} className="jersey-button" name="Reverse Retro" title="Reverse Retro" type="button">
                        <img alt="Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svgz" />
                    </button>
                </div>
                <div>
                    <button onClick={reset} name="Reset" type="button">Reset</button>
                </div>
            </form>

            <div id="advanced">
                <label htmlFor="season" hidden>Filter By Season</label>
                <select id="season" name="Season" onChange={handleSeasonChange}>
                    <option name="All" value="" selected>All</option>
                    <option name="Regular Season" value="Regular">Regular Season</option>
                    <option name="Playoffs" value="Playoffs">Playoffs</option>
                    <option name="All Star Game" value="All Star">All Star Game</option>
                    <option name="KHL" value="KHL">KHL</option>
                </select>
                <strong id="count"></strong>
            </div>

            <div id="click-goal" onClick={clickGoal}></div>

            <div className="wrapper">
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
                        <div className="link" data-season={result.season}>
                            <strong>ovechkin.cam/?{result.goal}</strong>
                            <button onClick={copyFunction} className="copy" title="Copy Link">Copy</button>
                        </div>
                    </div>
                ))}
            </div>
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
