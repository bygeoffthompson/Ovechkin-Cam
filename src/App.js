import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-5RVBYX6N0S');

const totalGoals = 911;

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
        const search1Value = document.getElementById('search-text-1').value.length;
        const search2Value = document.getElementById('search-text-2').value.length;
        const search3Value = document.getElementById('search-text-3').value.length;

        if (search1Value > 2 || searchText2 || searchText3) {
            const results = jsonData.filter((item) => {
                const search =
                    item.month +
                    ' ' + item.day +
                    ' ' + item.year +
                    ' ' + item.goalie +
                    ' ' + item.team +
                    ' ' + item.tags +
                    ' ' + item.type +
                    ' ' + item.season
                return (
                    search.toLowerCase().includes(searchText1) &&
                    search.toLowerCase().includes(searchText2) &&
                    search.toLowerCase().includes(searchText3) &&
                    item.season.includes(document.getElementById('season').value)
                );
            });
            document.querySelector('#advanced').classList.add('show');
            if (results.length === 1) {
                document.querySelector('#count').innerHTML = results.length + ' Result';
            } else {
                document.querySelector('#count').innerHTML = results.length + ' Results';
            }
            setSearchResults(results);
        }
        if (searchText1 && search1Value < 3 && search2Value === 0 && search3Value === 0) {
            document.getElementById('advanced').classList.remove('show');
            setSearchResults([]);
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

    function clickTrack(value) {
        ReactGA.event({
            category: 'Click',
            action: value,
            value: 1
        });
    }

    const awayGoal = () => {
        randomGoal(['Away']);
        clickTrack('Away Click');
    };

    const canadaGoal = () => {
        randomAway(['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']);
        clickTrack('Canada Click');
    };

    const copyFunction = () => {
        const link = document.querySelector('.link strong').innerHTML;
        navigator.clipboard.writeText(link);
    };

    const emptyNetGoal = () => {
        randomGoal(['ENG']);
        clickTrack('Empty Net Click');
    };

    const homeGoal = () => {
        randomGoal(['Home']);
        clickTrack('Home Click');
    };

    const gameWinningGoal = () => {
        randomGoal(['OT', 'GWG']);
        clickTrack('Game Winning Click');
    };

    const hatTrickGoal = () => {
        randomGoal(['Hat Trick']);
        clickTrack('Hat Trick Click');
    };

    const overtimeGoal = () => {
        randomGoal(['OT']);
        clickTrack('Overtime Click');
    };

    const powerPlayGoal = () => {
        randomGoal(['PPG']);
        clickTrack('Power Play Click');
    };

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    function randomAway(type) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                type.includes(value)
            ) && item.season === 'Regular' && item.arena === 'Away'
        );
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    function randomGoal(type) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                type.includes(value)
            ) && item.season === 'Regular'
        );
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const reset = () => {
        setSearchGoal('');
        setSearchResults([]);
        resultsHide();
    };

    function resultsHide() {
        setSearchText1('');
        setSearchText2('');
        setSearchText3('');
        document.querySelector('#advanced').classList.remove('show');
    }

    const capitol = () => {
        randomGoal(['Capitol']);
        clickTrack('Capitol Click');
    };

    const screagle = () => {
        randomGoal(['Screagle']);
        clickTrack('Screagle Click');
    };

    const red = () => {
        randomGoal(['Red']);
        clickTrack('Red Click');
    };

    const white = () => {
        randomGoal(['White']);
        clickTrack('White Click');
    };

    const brick = () => {
        const input = document.querySelector('#search-goal').value;
        if (input === '440') {
            setSearchGoal(475)
        } else {
            setSearchGoal(440)
        }
        clickTrack('Brick Click');
    };

    const throwback = () => {
        randomGoal(['Red Throwback', 'White Throwback']);
        clickTrack('Throwback Click');
    };

    const navy = () => {
        randomGoal(['Navy Third', 'Navy Stadium Series']);
        clickTrack('Navy Click');
    };

    const reverseRetro = () => {
        randomGoal(['Reverse Retro Black', 'Reverse Retro Red']);
        clickTrack('Reverse Retro Click');
    };

    const hanlon = () => {
        setSearchGoal(random(1, 112))
        clickTrack('Hanlon Click');
    };

    const boudreau = () => {
        setSearchGoal(random(113, 309))
        clickTrack('Boudreau Click');
    };

    const hunter = () => {
        setSearchGoal(random(310, 339))
        clickTrack('Hunter Click');
    };

    const oates = () => {
        setSearchGoal(random(340, 422))
        clickTrack('Oates Click');
    };

    const trotz = () => {
        setSearchGoal(random(423, 607))
        clickTrack('Trotz Click');
    };

    const reirden = () => {
        setSearchGoal(random(608, 706))
        clickTrack('Reirden Click');
    };

    const laviolette = () => {
        setSearchGoal(random(707, 853))
        clickTrack('Laviolette Click');
    };

    const carbery = () => {
        setSearchGoal(random(854, totalGoals))
        clickTrack('Carbery Click');
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
                    <input id="search-text-1" tabIndex="1" type="text" placeholder="3 Letters Minimum" value={searchText1} onChange={handleText1}/>
                    <input id="search-text-2" tabIndex="2" type="text" placeholder="And" value={searchText2} onChange={handleText2}/>
                    <input id="search-text-3" tabIndex="3" type="text" placeholder="And" value={searchText3} onChange={handleText3}/>
                    <h3 className="randomize">Randomize</h3>
                </div>
                <div className="buttons-group">
                    <div>
                        <small>Type</small>
                        <button onClick={homeGoal} name="Home Goal" title="Home Goal" type="button">Home</button>
                        <button onClick={awayGoal} name="Away Goal" title="Away Goal" type="button">Away</button>
                        <button onClick={canadaGoal} name="Canadian Goal" title="Canadian Goal" type="button">Canada</button>
                        <button onClick={powerPlayGoal} name="Power Play Goal" title="Power Play Goal" type="button">PPG</button>
                        <button onClick={gameWinningGoal} name="Game Winning Goal" title="Game Winning Goal" type="button">GWG</button>
                        <button onClick={emptyNetGoal} name="Empty Net Goal" title="Empty Net Goal" type="button">ENG</button>
                        <button onClick={overtimeGoal} name="Overtime Goal" title="Overtime Goal" type="button">OT</button>
                        <button onClick={hatTrickGoal} name="Hat Trick Goal" title="Hat Trick Goal" type="button">Trick</button>
                    </div>
                    <div>
                        <small>Jersey</small>
                        <button onClick={capitol} className="jersey-button" name="Capitol" title="Capitol" type="button">
                            <img alt="Capitol logo" className="jersey-logo" src="/jerseys/capitol.svg" />
                        </button>
                        <button onClick={screagle} className="jersey-button" name="Screagle" title="Screagle" type="button">
                            <img alt="Screagle logo" className="jersey-logo" src="/jerseys/screagle.svg" />
                        </button>
                        <button onClick={red} className="jersey-button" name="Red" title="Red" type="button">
                            <img alt="Red logo" className="jersey-logo" src="/jerseys/capitals.svg" />
                        </button>
                        <button onClick={white} className="jersey-button" name="White" title="White" type="button">
                            <img alt="White logo" className="jersey-logo" src="/jerseys/capitals.svg" />
                        </button>
                        <button onClick={throwback} className="jersey-button" name="Throwback" title="Throwback Third" type="button">
                            <img alt="Throwback logo" className="jersey-logo" src="/jerseys/throwback.svg" />
                        </button>
                        <button onClick={brick} className="jersey-button" name="Brick Stars & Stripes" title="Brick Stars & Stripes" type="button">
                            <img alt="Brick Stripes logo" className="jersey-logo" src="/jerseys/brick.svg" />
                        </button>
                        <button onClick={navy} className="jersey-button" name="Navy" title="Navy" type="button">
                            <img alt="Navy logo" className="jersey-logo" src="/jerseys/navy.svg" />
                        </button>
                        <button onClick={reverseRetro} className="jersey-button" name="Reverse Retro" title="Reverse Retro" type="button">
                            <img alt="Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg" />
                        </button>
                    </div>
                    <div>
                        <small>Coach</small>
                        <button onClick={hanlon} className="coach-button" name="Glen Hanlon" title="Glen Hanlon" type="button">Hanlon</button>
                        <button onClick={boudreau} className="coach-button" name="Bruce Boudreau" title="Bruce Boudreau" type="button">Bruce</button>
                        <button onClick={hunter} className="coach-button" name="Dale Hunter" title="Dale Hunter" type="button">Hunter</button>
                        <button onClick={oates} className="coach-button" name="Adam Oates" title="Adam Oates" type="button">Oates</button>
                        <button onClick={trotz} className="coach-button" name="Barry Trotz" title="Barry Trotz" type="button">Trotz</button>
                        <button onClick={reirden} className="coach-button" name="Todd Reirden" title="Todd Reirden" type="button">Reirden</button>
                        <button onClick={laviolette} className="coach-button" name="Peter Laviolette" title="Peter Laviolette" type="button">Lavi</button>
                        <button onClick={carbery} className="coach-button" name="Spencer Carbery" title="Spencer Carbery" type="button">Carbery</button>
                    </div>
                </div>
                <button onClick={reset} name="Reset" type="button">Reset</button>
            </form>

            <div id="advanced">
                <strong id="count"></strong>
                <label htmlFor="season" hidden>Filter By Season</label>
                <select id="season" name="Season" onChange={handleSeasonChange}>
                    <option name="All" value="" selected>All</option>
                    <option name="Regular Season" value="Regular">Regular Season</option>
                    <option name="Playoffs" value="Playoff">Playoffs</option>
                    <option name="All Star Game" value="All Star">All Star Game</option>
                    <option name="KHL" value="KHL">KHL</option>
                </select>
            </div>

            <div id="click-goal" onClick={clickGoal}></div>

            <div className="wrapper">
                {searchResults.map((result, index) => (
                    <div className="frame" key={index}>
                        <div className="note" data-season={result.season}>
                            <div>
                                <strong className="goal-count">{result.goal}</strong>
                                <div className="goal-siren">
                                    <img alt="Goal Siren icon" src="/icons/goal-siren.svg"/>
                                    <strong className="type">{result.type}</strong>
                                </div>
                                <div>
                                    <img alt={result.team + ' logo'} className="logo" src={'/teams/' + result.team + '.svg'} title={result.team}/>
                                </div>
                            </div>
                            <div>
                                <strong className="goalie">{result.goalie}</strong>
                                <strong><small>{result.month} {result.day} {result.year}</small></strong>
                            </div>
                        </div>
                        <div className="shadow">
                            <iframe width="560" height="315" src={result.link.replace(/"/g, "")} title="Alex Ovechkin Goal Video"
                                referrerPolicy="cross-origin-with-strict-origin" allowFullScreen loading="lazy"></iframe>
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
