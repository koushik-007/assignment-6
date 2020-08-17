const searchLyrics = document.getElementById('searchLyrics');
const songTitle = document.getElementsByClassName('songTitle');
const artist = document.getElementsByClassName('artistName');
const lyrics = document.getElementById('lyrics');
const lyricsArtist = document.getElementById('lyrics-artist');
const lyricsTitle = document.getElementById('lyrics-title');
const bonusLyrics = document.getElementById('bonusLyrics');
const bonusLyricsOne = document.getElementById('bonusLyricsOne');
const bonusLyricsTwo = document.getElementById('bonusLyricsTwo');
const bonusLyricsThree = document.getElementById('bonusLyricsThree');

document.getElementById('searchBtn').addEventListener('click', function(){
    const searchLyricsName = searchLyrics.value;
    searchSongs(searchLyricsName);
})

function searchSongs(searchSongName) {
    fetch(` https://api.lyrics.ovh/suggest/${searchSongName}`)
.then(response => response.json())
.then(data => {
    const songDetails = data.data;
    const title = songDetails.map( element => element.title);
    
    for(let i=0;i<songTitle.length;i++)
    {
      songTitle[i].innerText = title[i];
    }
    const artistName = songDetails.map( element => element.artist.name);
    for(let i=0;i<artist.length;i++)
    {
      artist[i].innerText = artistName[i];
    }
})
}

const getLyrics = document.getElementsByClassName("getLyricsBtn");

  for (let i = 0; i < getLyrics.length; i++) {
    getLyrics[i].addEventListener('click',function(){
      const songTitleName = songTitle[i].innerText;
      const artistName = artist[i].innerText;

      if (i<10) {
        lyricsArtist.innerText = artistName;
        lyricsTitle.innerText = songTitleName;

      lyricsSearch(artistName, songTitleName,lyrics);
      }
      else if(i==10){
        lyricsSearch(songTitleName, artistName, bonusLyrics);
      }
      else if(i==11){
        lyricsSearch(songTitleName, artistName, bonusLyricsOne);
      }
      else if(i==12){
        lyricsSearch(songTitleName, artistName, bonusLyricsTwo);
      }
      else if(i==13){
        lyricsSearch(songTitleName, artistName, bonusLyricsThree);
      }
    })
  }
  function lyricsSearch(artist, title, lyricsDetails) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data=> {
      
        if (data.lyrics == undefined) {
          lyricsDetails.innerText = "No lyrics found";
        } else {
          lyricsDetails.innerText = data.lyrics;
        }
    })
  }