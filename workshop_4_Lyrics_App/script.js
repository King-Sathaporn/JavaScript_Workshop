const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const api_Base_Url = "https://api.lyrics.ovh";

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if(!searchTerm){
        alert('Please enter song name or artist name');
    }else{
        searchLyrics(searchTerm);
    }
});

async function searchLyrics(searchTerm){
    const res = await fetch(`${api_Base_Url}/suggest/${searchTerm}`)
    const allSongs = await res.json();
    showData(allSongs);
}

function showData(songs){
    console.log(songs);
    result.innerHTML = `
    <ul class="songs">
        ${songs.data.map(song=>
            `
            <li>
                <span>
                    <strong>${song.artist.name}</strong> - ${song.title}
                </span>
                <button class="btn" data-artist="${song.artist.name}"
                data-song-title="${song.title}">Layrics</button>
            </li>
            `
        ).join('')}
    </ul>
    `;
    if(songs.next || songs.prev){
        more.innerHTML =`
        ${songs.prev ? `<button class="btn" id="prev" onClick="getPrevSongs('${songs.prev}')">Prev</button>` : ''}
        ${songs.next ? `<button class="btn" id="more" onClick="getMoreSongs('${songs.next}')">More</button>` : ''}
        `
    }else{
        more.innerHTML = '';
    }
}

async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const allSongs = await res.json();
    showData(allSongs);
}

async function getPrevSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const allSongs = await res.json();
    showData(allSongs);
}

result.addEventListener('click', e => {
    const clickElement = e.target;
    if(clickElement.tagName === "BUTTON"){
        const artist = clickElement.getAttribute('data-artist');
        const songTitle = clickElement.getAttribute('data-song-title');
        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle){
    const res = await fetch(`${api_Base_Url}/v1/${artist}/${songTitle}`);
    const lyrics = await res.json();
    if(lyrics && res.result === 'success'){
        result.innerHTML = `
        <h2>
        <span>
        <strong>${artist}</strong> - ${songTitle}
        </span>
        </h2>
        <span>
        ${lyrics.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')}
        </span>
        `;
    }else{
        result.innerHTML = `
        <h2>
        <span>
        <strong>${artist}</strong> - ${songTitle}
        </span>
        </h2>
        <span>
        No Lyrics Found
        </span>
        `;
    }
    more.innerHTML = '';
}