export default function SearchResults(props) {
    return (
        <ul>
            {props.searchResults.map( (result) =>
                <li>
                    {result[1]}
                </li>
            )}
        </ul>
    );
}