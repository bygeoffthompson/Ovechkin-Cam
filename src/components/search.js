function Search() {
    return (
        <form>
            <label htmlFor="goal">Goal Number:</label>
            <input type="number" id="goal" name="goal" min="1" max="897"/>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default Search;