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
            const goalQuery = parseFloat(searchGoal);
            const results = jsonData.filter(item => item.goal === goalQuery)
            setSearchResults(results);
            ReactGA.event({
                category: new Date().getFullYear()  + ' Goals Served',
                label: 'Goal #' + goalQuery,
                value: 1
            });

        }

        const search1Value = document.getElementById('search-text-1').value.length;
        if (search1Value > 2) {
            const results = jsonData.filter((item) => {
                const search =
                    item.season + ' ' +
                    item.type.replace('ENG', '') + ' ' +
                    item.month + ' ' +
                    item.day + ' ' +
                    item.year + ' ' +
                    item.goalie + ' ' + item.goalie2 + ' ' +
                    item.team + ' ' +
                    item.arena + ' ' +
                    item.search + ' ' +
                    item.btn1 + ' ' + item.btn2 + ' ' + item.btn3
                return (
                    search.replace('undefined', '').toLowerCase().includes(searchText1) &&
                    search.replace('undefined', '').toLowerCase().includes(searchText2) &&
                    search.replace('undefined', '').toLowerCase().includes(searchText3) &&
                    item.season.includes(document.getElementById('type').value)
                );
            });
            document.getElementById('advanced').classList.add('show');
            document.getElementById('minimum').classList.remove('show');
            document.getElementById('count').setAttribute('data-count', results.length);
            document.getElementById('count').innerHTML = results.length + ' Result';
            setSearchResults(results);
        }
        if (search1Value === 0) {
            document.getElementById('advanced').classList.remove('show');
            document.getElementById('minimum').classList.remove('show');
        } else if (search1Value < 3) {
            document.getElementById('advanced').classList.remove('show');
            document.getElementById('minimum').classList.add('show');
            setSearchResults([]);
        }
    }, [searchGoal, searchText1, searchText2, searchText3, jsonData]);

    useEffect(() => {
        const query = window.location.search.slice(1).split('?')[0].replace(/-/g, ' ').toLowerCase();
        const queryInteger = parseFloat(query);
        if (!['20th', '30th', '40th', '50th', '60th', '2nd', '3rd', '4th', '6v5', '5v3', '4v4'].includes(query) && queryInteger > 0 && queryInteger <= totalGoals) {
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

    const allstar = () => {
        const input = parseFloat(document.querySelector('#search-goal').value)
        if (input === 81.01) {setSearchGoal(137.03)}
        else if (input === 137.02) {setSearchGoal(588.07)}
        else if (input === 137.03) {setSearchGoal(548.06)}
        else if (input === 194.04) {setSearchGoal(813.08)}
        else if (input === 288.05) {setSearchGoal(194.04)}
        else if (input === 548.06) {setSearchGoal(137.02)}
        else if (input === 588.07) {setSearchGoal(288.05)}
        else {setSearchGoal(81.01)}
    };

    function buttonClick(value) {
        randomGoal(value);
    }

    const canadaGoal = () => {
        randomAway(['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']);
    };

    const clickGoal = () => {
        document.getElementById('click-goal').addEventListener('click', function(event) {
            const page = document.querySelector('body').getBoundingClientRect();
            const x = event.clientX - page.left;
            const y = event.clientY - page.top;
            document.getElementById('puck').setAttribute('style', 'left:' + x + 'px;top:' + y + 'px;');
            document.querySelector('body').classList.add('shot');
            setTimeout(function() {
                document.querySelector('body').classList.add('goal-lights');
                document.querySelector('body').classList.remove('shot');
                setTimeout(function() {
                    document.querySelector('body').classList.remove('goal-lights');
                }, 1000);
            }, 500);
        });
    };

    const fourth = () => {
        const input = parseInt(document.querySelector('#search-goal').value)
        if (input === 128) {setSearchGoal(397)}
        else if (input === 141) {setSearchGoal(565)}
        else if (input === 397) {setSearchGoal(141)}
        else {setSearchGoal(128)}
    };

    const handleColumnChange = (event) => {
        const columnValue = parseInt(document.getElementById('column').value);
        document.getElementById('wrapper').classList.remove('column-2', 'column-3', 'multi-column');
        if (columnValue !== 1) {
            document.getElementById('wrapper').classList.add('column-' + columnValue, 'multi-column');
        }
    };

    const handleGoalChange = (event) => {
        if (event.target.value < totalGoals + 1) {
            setSearchGoal(event.target.value);
        }
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

    const outdoor = () => {
        const input = parseInt(document.querySelector('#search-goal').value)
        if (input === 440) {setSearchGoal(598)}
        else if (input === 475) {setSearchGoal(602)}
        else if (input === 598) {setSearchGoal(475)}
        else {setSearchGoal(440)}
    };

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomAway(type) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                type.includes(value)
            ) && item.season === 'NHL' && item.arena === 'Away'
        );
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    function randomGoal(type) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                type.includes(value)
            )
        );
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    const reset = () => {
        resultsHide();
        setSearchGoal('');
        setSearchResults([]);
    };

    function resultsHide() {
        document.querySelector('.search-accordion').classList.remove('show');
        document.getElementById('column').value = '1';
        document.getElementById('type').value = '';
        document.getElementById('wrapper').classList.remove('column-2', 'column-3', 'multi-column');
        setSearchText1('');
        setSearchText2('');
        setSearchText3('');
    }

    const shg = () => {
        const input = parseInt(document.querySelector('#search-goal').value)
        if (input === 8) {setSearchGoal(190)}
        else if (input === 36) {setSearchGoal(38)}
        else if (input === 38) {setSearchGoal(732)}
        else if (input === 190) {setSearchGoal(36)}
        else {setSearchGoal(8)}
    };

    return (
        <div>
            <div id="click-goal" onClick={clickGoal}></div>
            <div id="goal">
                <img alt="Goal Net" src="icons/net.svg"/>
            </div>
            <form onSubmit={preventSubmit}>
                <div className="search-group">
                    <h2 className="number"><a href="/about.html#number">Search by Number</a></h2>
                    <label className="hide" htmlFor="search-goal">Number</label>
                    <input id="search-goal" min="1" max={totalGoals} step="any" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
                    <h2><a href="/about.html#text"><span className="hide">Search by </span>Text</a></h2>
                    <label className="hide" htmlFor="search-text-1">Text</label>
                    <label className="hide" htmlFor="search-text-2">Text</label>
                    <label className="hide" htmlFor="search-text-3">Text</label>
                    <input id="search-text-1" type="text" placeholder="Search" value={searchText1} onChange={handleText1}/>
                    <input id="search-text-2" type="text" placeholder="And" value={searchText2} onChange={handleText2}/>
                    <input id="search-text-3" type="text" placeholder="And" value={searchText3} onChange={handleText3}/>
                    <div>
                        <strong>or</strong>
                        <h3><button onClick={(event) => buttonClick([''])} title="Random Goal" type="button">Random</button></h3>
                    </div>
                </div>
                <div className="buttons-group">
                    <div>
                        <button onClick={(event) => buttonClick(['Red Russia', 'White Russia'])} className="jersey-button" title="Russia" type="button">
                            <img alt="Throwback logo" className="jersey-logo" src="/jerseys/russia.svg" />
                        </button>
                        <button onClick={(event) => buttonClick(['Capitol', 'Screagle'])} className="jersey-button multi-logo" title="Capitol / Screagle" type="button">
                            <span>
                                <img alt="Capitol logo" className="jersey-logo" src="/jerseys/capitol.svg" />
                            </span>
                            <span>
                                <img alt="Screagle logo" className="jersey-logo" src="/jerseys/screagle.svg" />
                            </span>
                        </button>
                        <button onClick={(event) => buttonClick(['Red Capitals', 'White Capitals'])} className="jersey-button" title="Capitals" type="button">
                            <img alt="Capitals logo" className="jersey-logo" src="/jerseys/capitals.svg" />
                        </button>
                        <button onClick={(event) => buttonClick(['Red Throwback', 'White Throwback'])} className="jersey-button" title="Throwback Third" type="button">
                            <img alt="Throwback logo" className="jersey-logo" src="/jerseys/throwback.svg" />
                        </button>
                        <button onClick={outdoor} className="jersey-button multi-logo" title="Brick / Stadium" type="button">
                            <span>
                                <img alt="Brick Stripes logo" className="jersey-logo" src="/jerseys/brick.svg" />
                            </span>
                            <span>
                                <img alt="Stadium Series logo" className="jersey-logo" src="/jerseys/caps.svg" />
                            </span>
                        </button>
                        <button onClick={(event) => buttonClick(['Navy Third'])} className="jersey-button" title="Navy Third" type="button">
                            <img alt="Navy logo" className="jersey-logo" src="/jerseys/navy.svg" />
                        </button>
                        <button onClick={(event) => buttonClick(['Black Reverse Retro', 'Red Reverse Retro'])} className="jersey-button" title="Reverse Retro" type="button">
                            <img alt="Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg" />
                        </button>
                        <button onClick={(event) => buttonClick(['Blue Dynamo', 'White Dynamo'])} className="jersey-button" title="HC Dynamo Moscow" type="button">
                            <img alt="HC Dynamo Moscow logo" className="jersey-logo" src="/jerseys/dynamo.svg" />
                        </button>
                    </div>
                    <div>
                        <button onClick={(event) => buttonClick(['Home'])} title="Home Goal" type="button">Home</button>
                        <button onClick={(event) => buttonClick(['Away'])} title="Away Goal" type="button">Away</button>
                        <button onClick={(event) => buttonClick(['PPG'])} title="Power Play Goal" type="button">PPG</button>
                        <button onClick={shg} title="Shorthand Goal" type="button">SHG</button>
                        <button onClick={(event) => buttonClick(['Empty Net'])} title="Empty Net Goal" type="button">ENG</button>
                        <button onClick={(event) => buttonClick(['GWG', 'OT'])} title="Game Winning Goal" type="button">GWG</button>
                        <button onClick={(event) => buttonClick(['OT'])} title="Overtime Goal" type="button">OT</button>
                        <button onClick={(event) => buttonClick(['Hat Trick'])} title="Hat Trick Goal" type="button">Hats</button>
                    </div>
                    <div>
                        <button onClick={(event) => setSearchGoal(random(1, 52))} title="Rookie Goal" type="button">Rookie</button>
                        <button onClick={allstar} title="All Star Goal" type="button">All&nbsp;Star</button>
                        <button onClick={(event) => buttonClick(['5v3'])} title="5v3 Goal" type="button">5v3</button>
                        <button onClick={fourth} title="Fourth Goal" type="button">4th</button>
                        <button onClick={(event) => buttonClick(['Backhand'])} title="Backhand Goal" type="button">Backhand</button>
                        <button onClick={(event) => buttonClick(['Post'])} title="Post Goal" type="button">Post</button>
                        <button onClick={(event) => buttonClick(['Tip'])} title="Tip Goal" type="button">Tip</button>
                        <button onClick={canadaGoal} title="Canada Goal" type="button">Canada</button>
                    </div>
                 {/*<div>
                        <button onClick={(event) => setSearchGoal(random(1, 112))} className="coach-button" title="Glen Hanlon" type="button">Hanlon</button>
                        <button onClick={(event) => setSearchGoal(random(113, 309))} className="coach-button" title="Bruce Boudreau" type="button">Bruce</button>
                        <button onClick={(event) => setSearchGoal(random(310, 339))} className="coach-button" title="Dale Hunter" type="button">Hunter</button>
                        <button onClick={(event) => setSearchGoal(random(340, 422))} className="coach-button" title="Adam Oates" type="button">Oates</button>
                        <button onClick={(event) => setSearchGoal(random(423, 607))} className="coach-button" title="Barry Trotz" type="button">Trotz</button>
                        <button onClick={(event) => setSearchGoal(random(608, 706))} className="coach-button" title="Todd Reirden" type="button">Reirden</button>
                        <button onClick={(event) => setSearchGoal(random(707, 853))} className="coach-button" title="Peter Laviolette" type="button">Lavi</button>
                        <button onClick={(event) => setSearchGoal(random(854, totalGoals))} className="coach-button" title="Spencer Carbery" type="button">Carbery</button>
                    </div>*/}
                </div>
                <button onClick={reset} title="Reset Filters" type="button">Reset</button>
            </form>

            <div className="search-accordion" id="minimum">
                <strong>Search Requires 3 Letters Minimum</strong>
            </div>

            <div className="search-accordion" id="advanced">
                <strong id="count"></strong>
                <strong>of</strong>
                <label htmlFor="type">Type</label>
                <select id="type" name="Type" onChange={handleSeasonChange}>
                    <option name="All" value="" selected>All</option>
                    <option name="Regular" value="NHL">NHL Regular</option>
                    <option name="Playoff" value="Playoff">NHL Playoff</option>
                    <option name="All Star" value="All Star">NHL All Star</option>
                    <option name="IIHF" value="IIHF">IIHF</option>
                    <option name="KHL" value="KHL">KHL</option>
                    <option name="Olympic" value="Olympic">Olympic</option>
                    <option name="World Cup" value="World Cup">World Cup</option>
                </select>
                <strong className="column-control">in</strong>
                <select className="column-control" id="column" name="column" onChange={handleColumnChange}>
                    <option name="1" value="1" selected>1</option>
                    <option name="2" value="2">2</option>
                    <option name="3" value="3">3</option>
                </select>
                <label className="column-control" htmlFor="column">Column</label>
            </div>

            <div id="wrapper">
                {searchResults.map((result, index) => (
                    <div className="frame" key={index}>
                        <div className="note" data-season={result.season}>
                            <div>
                                <strong className="goal-count">
                                    <span>{result.goal.toString().split('.')[0]}</span>
                                    <span data-float={result.goal.toString().split('.')[1]}>{result.goal.toString().split('.')[1]}</span>
                                </strong>
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
                        <small className="tags">{result.search} {result.btn1} {result.btn2} {result.btn3}</small>
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
