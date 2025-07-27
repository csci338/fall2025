async function getArtists(artistName) {
    const url = `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${artistName}&limit=1`;
    const response = await fetch(url);
    const artists = await response.json();
    if (artists.length > 0) {
        displayArtist(artists[0]);
    } else {
        console.error("no matching artist found");
    }
}

// function definition:
function displayArtist(artists) {
    console.log(artists);

    /*
    Output an HTML representation of the second artist to the
       DOM element with the id of "tasks" as follows:

       <section>
            <h2>Name of artist</h2>
            <img src="image_url_of_artist" />
       </section>
    */
}

// function invocation:
getArtists("Beyonce");
getArtists("Taylor Swift");
getArtists("!960ll999DW&RE&*1r23");
