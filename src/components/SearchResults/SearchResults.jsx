import React from 'react';
import { useSelector } from 'react-redux';

function SearchResults() {
    //Grabbing search results from store
    const searchResults = useSelector(store => store.searchResults);
    console.log(searchResults);

    return(
        //Help this isn't working, attemping to loop through array of search results and display on DOM
        <div>
            <h1>This is the search results page</h1>
            {searchResults.map((plant) => {
                return (
                    <p>Plant ID: {plant.id}</p>
                )
            })}
        </div>
    )

};

export default SearchResults;