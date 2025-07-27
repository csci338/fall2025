const artists = [
    {
        name: "Beyoncé",
        image_url:
            "https://i.scdn.co/image/ab6761610000e5eb12e3f20d05a8d6cfde988715",
        spotify_url: "https://open.spotify.com/artist/6vWDO969PvNqNYHIOW5v0m",
    },
    {
        name: "Taylor Swift",
        image_url:
            "https://i.scdn.co/image/ab6761610000e5eb6a224073987b930f99adc706",
        spotify_url: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02",
    },
];

// function definition:
function showArtists() {
    console.log(artists);

    /* Your tasks:
    1. Write the name of the first artist to the console.

    2. Write the image_url of of the second artist to the console.
    
    3. Output an HTML representation of the second artist to the
       DOM element with the id of "tasks" as follows:

       <section>
            <h2>Name of artist</h2>
            <img src="image_url_of_artist" />
       </section>
    */
}

// function invocation:
showArtists();
