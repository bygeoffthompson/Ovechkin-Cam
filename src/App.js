import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="goals">
        <form class="goal-search">
          <label htmlFor="goal">Goal Number:</label>
          <input type="number" id="goal" name="goal" min="1" max="897"/>
          <input type="submit" value="Submit"/>
        </form>
        <div className="goal" id="goal-1">
          <p>Goal 1</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/BoGOoO9WTOE?si=OdZBpn3y3W7un6r0" title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen></iframe>
        </div>
        <div className="goal" id="goal-1">
          <p>Goal 100</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/F7jFSVOVWyU?si=CnWW9ylYbomIzBGM" title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen></iframe>
        </div>
      </div>
  );
}

export default App;
