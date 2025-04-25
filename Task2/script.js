const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const progressBarFill = document.getElementById("progress-bar-fill");
const volumeSlider = document.getElementById("volume-slider");
const muteButton = document.getElementById("mute-button");
const songTitleDisplay = document.getElementById("song-title");
const artistNameDisplay = document.getElementById("artist-name");
const albumArtDisplay = document.getElementById("album-art");
const musicList = document.getElementById("music-list");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-button");
const playlistList = document.getElementById("playlist-list");
const createPlaylistButton = document.getElementById("create-playlist-button");
const newPlaylistInput = document.getElementById("new-playlist-input");
const newPlaylistNameInput = document.getElementById("new-playlist-name");
const createPlaylistConfirmButton = document.getElementById(
  "create-playlist-confirm"
);
const createPlaylistCancelButton = document.getElementById(
  "create-playlist-cancel"
);
const currentPlaylistView = document.getElementById("current-playlist-view");
const currentPlaylistNameDisplay = document.getElementById(
  "current-playlist-name-display"
);
const currentPlaylistSongsList = document.getElementById(
  "current-playlist-songs"
);
const closePlaylistViewButton = document.getElementById("close-playlist-view");
let isPlaying = false;
let isMuted = false;
let currentSongIndex = 0;
let currentPlaylist = null;

// Track the currently displayed playlist
let allPlaylists = [];

// Sample music library (replace with your actual music data)
const musicLibrary = [
  {
    title: "Paon Ki Jutti_320kpbs",
    artist: "Artist A",
    album: "Album 1",
    genre: "Pop",
    src: "audio/Paon Ki Jutti_320(PagalWorld.com.sb).mp3",
    albumArt: "image/Paon Ki Jutti_320kpbs - Artist A.jpg",
  },
  {
    title: "Sajni Re Lapata ladies_320kpb",
    artist: "Artist B",
    album: "Album 2",
    genre: "Rock",
    src: "audio/Sajni Re_320(PagalWorld.com.sb).mp3",
    albumArt: "image/Sajni Re Lapata ladies_320kpb - Artist B.jpg",
  },
  {
    title: "Bebe Bapu_320kbps",
    artist: "Artist C",
    album: "Album 3",
    genre: "Jazz",
    src: "audio/Bebe Bapu.mp3",
    albumArt: "image/Bebe Bapu_320kbps - Artist C.jpg",
  },
  {
    title: "Baarish Ke Aane Se - Shreya Ghoshal 320 Kbps",
    artist: "Artist A",
    album: "Album 1",
    genre: "Pop",
    src: "audio/Baarish Ke Aane Se - Shreya Ghoshal 320 Kbps.mp3",
    albumArt:
      "image/Baarish Ke Aane Se - Shreya Ghoshal 320 Kbps - Artist A.jpg",
  },
  {
    title: "Diwali Apurva 128 Kbps",
    artist: "Artist D",
    album: "Album 4",
    genre: "Rock",
    src: "audio/Diwali Apurva 128 Kbps.mp3",
    albumArt: "image/Diwali Apurva 128 Kbps - Artist D.jpg",
  },
  {
    title: "Mere Yaaraa - Sooryavanshi 320 Kbps",
    artist: "Artist C",
    album: "Album 3",
    genre: "Jazz",
    src: "audio/Mere Yaaraa - Sooryavanshi 320 Kbps.mp3",
    albumArt: "image/Mere Yaaraa - Sooryavanshi 320 Kbps - Artist C.jpg",
  },
];

// Function to load and display the music library
function loadMusicList(songs) {
  musicList.innerHTML = "";
  songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <div class="song-info">
                <span>${song.title} - ${song.artist}</span>
            </div>
            <div class="playlist-actions">
                <button class="play-btn" data-index="${index}">Play</button>
                <button class="add-to-playlist-btn" data-index="${index}">Add to Playlist</button>
            </div>
        `;
    musicList.appendChild(listItem);
  });

  // Add event listeners to the "Play" buttons
  const playButtons = document.querySelectorAll(".play-btn");
  playButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const songIndex = parseInt(event.target.dataset.index);
      currentSongIndex = songIndex;
      currentPlaylist = null; // Clear any previous playlist
      playSong(musicLibrary[songIndex]);
    });
  });

  // Add event listeners to the "Add to Playlist" buttons
  const addToPlaylistButtons = document.querySelectorAll(
    ".add-to-playlist-btn"
  );
  addToPlaylistButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const songIndex = parseInt(event.target.dataset.index);
      openPlaylistSelection(musicLibrary[songIndex]);
    });
  });
}

 // Function to play a song
 function playSong(song) {
    audioPlayer.src = song.src;
    songTitleDisplay.textContent = song.title;
    artistNameDisplay.textContent = song.artist;
    albumArtDisplay.src = song.albumArt;
    audioPlayer.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
}
// Function to pause the song
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}
// Function for the next song
function playNextSong() {
    if (currentPlaylist) {
        currentSongIndex = (currentSongIndex + 1) % currentPlaylist.songs.length;
        playSong(currentPlaylist.songs[currentSongIndex]);
    } else {
        currentSongIndex = (currentSongIndex + 1) % musicLibrary.length;
        playSong(musicLibrary[currentSongIndex]);
    }
}
   // Function for the previous song
   function playPreviousSong() {
    if (currentPlaylist) {
        currentSongIndex = (currentSongIndex - 1 + currentPlaylist.songs.length) % currentPlaylist.songs.length;
        playSong(currentPlaylist.songs[currentSongIndex]);
    }
    else {
        currentSongIndex = (currentSongIndex - 1 + musicLibrary.length) % musicLibrary.length;
        playSong(musicLibrary[currentSongIndex]);
    }
}
   // Event listeners for playback controls
   playBtn.addEventListener('click', () => {
    if (!audioPlayer.src && musicLibrary.length > 0) {
        playSong(musicLibrary[currentSongIndex]);
    } else if (!isPlaying) {
        playSong(musicLibrary[currentSongIndex]);
    }
});
pauseBtn.addEventListener('click', pauseSong);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPreviousSong);
// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBarFill.style.width = `${progress}%`;
    }
});
 // Seek functionality
 progressBar.addEventListener('click', (event) => {
    if (audioPlayer.duration) {
        const clickPosition = event.offsetX / progressBar.offsetWidth;
        const seekTime = clickPosition * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
});
// Volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
    isMuted = false;
    muteButton.textContent = 'Mute';
});
  // Mute functionality
  muteButton.addEventListener('click', () => {
    if (isMuted) {
        audioPlayer.volume = volumeSlider.value;
        muteButton.textContent = 'Mute';
        isMuted = false;
    } else {
        audioPlayer.volume = 0;
        muteButton.textContent = 'Unmute';
        isMuted = true;
    }
});
// Search functionality
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredSongs = musicLibrary.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.album.toLowerCase().includes(searchTerm) ||
        song.genre.toLowerCase().includes(searchTerm)
    );
    loadMusicList(filteredSongs);
});
 // Category filtering
 categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        if (category === 'all') {
            loadMusicList(musicLibrary);
        } else {
            const filteredSongs = musicLibrary.filter(song => song.genre.toLowerCase() === category.toLowerCase());
            loadMusicList(filteredSongs);
        }
    });
});
 // Playlist functionality
 function displayPlaylists() {
    playlistList.innerHTML = '';
    allPlaylists.forEach((playlist, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <span>${playlist.name} (${playlist.songs.length} songs)</span>
            </div>
            <div class="playlist-actions">
                <button class="view-playlist-btn" data-index="${index}">View</button>
                <button class="delete-playlist-btn" data-index="${index}">Delete</button>
            </div>
        `;
        playlistList.appendChild(listItem);
    });
    // Event listener for viewing a playlist
    const viewPlaylistButtons = document.querySelectorAll('.view-playlist-btn');
    viewPlaylistButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const playlistIndex = parseInt(event.target.dataset.index);
            showPlaylist(allPlaylists[playlistIndex]);
        });
    });
      // Event listener for deleting a playlist
      const deletePlaylistButtons = document.querySelectorAll('.delete-playlist-btn');
      deletePlaylistButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              const playlistIndex = parseInt(event.target.dataset.index);
              deletePlaylist(playlistIndex);
          });
      });
  }
  // Function to show the selected playlist
function showPlaylist(playlist) {
    currentPlaylist = playlist;
    currentPlaylistView.style.display = 'block';
    currentPlaylistNameDisplay.textContent = playlist.name;
    currentPlaylistSongsList.innerHTML = '';
    playlist.songs.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="song-info">
                <span>${song.title} - ${song.artist}</span>
             </div>
            <button class="remove-from-playlist-btn" data-playlist-index="${allPlaylists.indexOf(playlist)}" data-song-index="${index} ">Remove</button>
        `;
        currentPlaylistSongsList.appendChild(listItem);
    });
                 // Event listener for removing a song from the playlist
                 const removeFromPlaylistButtons = document.querySelectorAll('.remove-from-playlist-btn');
                 removeFromPlaylistButtons.forEach(button => {
                     button.addEventListener('click', (event) => {
                         const playlistIndex = parseInt(event.target.dataset.playlistIndex);
     const songIndex = parseInt(event.target.dataset.songIndex);
                         allPlaylists[playlistIndex].songs.splice(songIndex, 1);
                         showPlaylist(allPlaylists[playlistIndex]); // Refresh the view
                         displayPlaylists(); // Update playlist list
                         if(allPlaylists[playlistIndex].songs.length === 0){
                             currentPlaylistView.style.display = 'none';
                         }
                     });
                 });
                 // Play the first song of the playlist if a song isn't already playing
                 if (!isPlaying && playlist.songs.length > 0) {
                     currentSongIndex = 0;
                     playSong(playlist.songs[0]);
                 }
             }
              // Event listener for creating a new playlist
 createPlaylistButton.addEventListener('click', () => {
    newPlaylistInput.style.display = 'flex';
    createPlaylistButton.style.display = 'none';
});
// Event listener for confirming the new playlist name
createPlaylistConfirmButton.addEventListener('click', () => {
    const playlistName = newPlaylistNameInput.value.trim();
    if (playlistName) {
        const newPlaylist = { name: playlistName, songs: [] };
        allPlaylists.push(newPlaylist);
        displayPlaylists();
        newPlaylistInput.style.display = 'none';
        createPlaylistButton.style.display = 'inline-block';
        newPlaylistNameInput.value = '';
    } else {
        alert('Please enter a playlist name.');
    }
});
// Event listener for canceling the new playlist creation
createPlaylistCancelButton.addEventListener('click', () => {
    newPlaylistInput.style.display = 'none';
    createPlaylistButton.style.display = 'inline-block';
    newPlaylistNameInput.value = '';
});
// Function to add a song to a playlist
function openPlaylistSelection(song) {
    if (allPlaylists.length === 0) {
        alert('Please create a playlist first.');
        return;
    }
    const playlistSelection = document.createElement('div');
    playlistSelection.innerHTML = '<p>Select a playlist:</p>';
    const selectElement = document.createElement('select');
    allPlaylists.forEach((playlist, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = playlist.name;
        selectElement.appendChild(option);
    });
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', () => {
        const selectedIndex = selectElement.value;
        allPlaylists[selectedIndex].songs.push(song);
        displayPlaylists(); // Update the playlist list
        if (currentPlaylistView.style.display === 'block')
        {
             showPlaylist(allPlaylists[selectedIndex]);
        }
        playlistSelection.remove();
        alert(`Song "${song.title}" added to playlist "${allPlaylists[selectedIndex].name}"`);
    });
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        playlistSelection.remove();
    });
    playlistSelection.appendChild(selectElement);
    playlistSelection.appendChild(addButton);
    playlistSelection.appendChild(cancelButton);
    document.body.appendChild(playlistSelection);
}
function deletePlaylist(indexToDelete) {
    if (confirm(`Are you sure you want to delete the playlist "${allPlaylists[indexToDelete].name}"?`)) {
        allPlaylists.splice(indexToDelete, 1);
        displayPlaylists();
        currentPlaylistView.style.display = 'none';
        currentPlaylist = null;
        if (allPlaylists.length === 0) {
            playlistList.innerHTML = '';
        }
    }
}
// Event for closing the playlist view
closePlaylistViewButton.addEventListener('click', () => {
    currentPlaylistView.style.display = 'none';
    currentPlaylist = null;
    currentPlaylistSongsList.innerHTML = '';
});
 // Initial setup
 loadMusicList(musicLibrary);
 displayPlaylists();
 audioPlayer.addEventListener('ended', () => {
     if (currentPlaylist) {
         playNextSong();
     }
     else{
          playNextSong();
     }
 });
