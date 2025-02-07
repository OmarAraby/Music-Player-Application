var audio = document.querySelector("audio");
var audioRange = document.querySelector("input[name='audioRange']");
var volumeRange = document.querySelector("input[name='volumeRange']");

var currentTimeDisplay = document.getElementById("currentTime");
var durationDisplay = document.getElementById("duration");
var title = document.getElementById("songTitle");
var playing = document.querySelector("button[onclick='playAudio()']");

var audioList = [
    { title: "Helium", song: "music/Sia - Helium (Lyrics)(M4A_128K).m4a", img: "images/heluim.jfif" },
    { title: "Past Lives", song: "music/pastlives.mp3", img: "images/pastlives.jfif" },
    { title: "2alo 3aleky", song: "music/2alo 3aleky.mp3", img: "images/قالوا عليكي.jfif" },
    { title: "Main Title - Game of Thrones", song: "music/01   Main Title - Game of Thrones Season 1 - Soundtrack(M4A_128K).m4a", img: "images/song.jfif" },
    { title: "Another Love", song: "music/Another Love.mp3", img: "images/Another love.jfif" },
    { title: "Abtal Kora", song: "music/Abtal kora.mp3", img: "images/kora.jfif" },
    { title: "Monaya", song: "music/monaya.mp3", img: "images/song.jfif" },
    { title: "Another One Bites the Dust", song: "music/Another one bits the Dust.mp3", img: "images/queen01.jfif" },
    { title: "Bohemian Rhapsody", song: "music/bohemian rhapsody.mp3", img: "images/queen.jfif" },
    { title: "Rockabye", song: "music/Clean Bandit - Rockabye ft. Sean Paul _ Anne-Marie(M4A_128K).m4a", img: "images/song.jfif" },
    { title: "Demons", song: "music/Demons - Imagine Dragons(M4A_128K).m4a", img: "images/Imagine Dragons_ Demons.jfif" },
    { title: "Dari Ya Alby", song: "music/Hamza Namira - Dari Ya Alby (Acoustic Version) _ حمزة نمرة - داري يا قلبي (جيتار)ـ(MP3_128K).mp3", img: "images/song.jfif" },
    { title: "Interstellar Soundtrack", song: "music/Intersteller Soundtrack.mp3", img: "images/interstellar.jfif" },
    { title: "Killer Queen", song: "music/killer Queen.mp3", img: "images/Killer Queen.jfif" },
    { title: "Leftovers Soundtrack", song: "music/Leftovers-soundtrack.mp3", img: "images/the leftovers.jfif" },
    { title: "Leve Palestina", song: "music/Leve Palestina.mp3", img: "images/song.jfif" },
    { title: "Ala Hesb Wedad", song: "music/Ala Hesb Wedad.mp3", img: "images/song.jfif" },
    { title: "Qareat El Fengan", song: "music/Qareat El Fengan.mp3", img: "images/song.jfif" },
    { title: "Diamonds", song: "music/Rihanna Diamonds lyrics(M4A_128K).m4a", img: "images/We're beautiful like diamonds in the sky.jfif" },
    { title: "The Greatest", song: "music/Sia - The Greatest (Lyrics)(M4A_128K).m4a", img: "images/heluim.jfif" },
    { title: "Unstoppable", song: "music/Sia - Unstoppable lyrics(M4A_128K).m4a", img: "images/heluim.jfif" },
    { title: "Blank Space", song: "music/Taylor Swift - Blank Space(M4A_128K).m4a", img: "images/song.jfif" },
    { title: "Telk Qadya", song: "music/Telk Qadya.mp3", img: "images/song.jfif" },
    { title: "We Are the Champions", song: "music/We are the champion.mp3", img: "images/queen.jfif" },
    { title: "JE VEUX", song: "music/ZAZ - JE VEUX (LIVE) - SUB ESP(M4A_128K).m4a", img: "images/song.jfif" }
];

var currentAudioIndex = 0;
var songImage = document.querySelector("img");
var previousVolume = 1; 

function playAudio() {
    audio.play();
    playing.textContent = '| |';
    songImage.classList.add("playing");
    updateAudioRange();
}

function pauseAudio() {
    audio.pause();
    playing.textContent = 'Play';
    songImage.classList.remove("playing");
}

function stopAudio() {
    audio.load();
    audio.pause();  // Pause the audio
    playing.textContent = 'Play';  
}

function muteAudio() {
    if (audio.muted) {
        audio.muted = false; // Unmute the audio
        audio.volume = previousVolume; 
        volumeRange.value = previousVolume; 
    } else {
        previousVolume = audio.volume; 
        audio.muted = true; // Mute the audio
        audio.volume = 0; // Set volume to 0
        volumeRange.value = 0; 
    }
}

function changeVolume(_vol) {
    if (audio.muted) {
        audio.muted = false; // Unmute if the user adjusts the volume
    }
    audio.volume = _vol.value; // Set the audio volume to the slider value
    previousVolume = _vol.value; // Update the previous volume
}

function changeTime() {
    audio.currentTime = audioRange.value;
}

function changeAudio() {
    currentAudioIndex = (currentAudioIndex + 1) % audioList.length; // Loop through the audio list
    audio.src = audioList[currentAudioIndex].song; 
    songImage.src = audioList[currentAudioIndex].img;
    title.textContent = `Title: ${audioList[currentAudioIndex].title}`; // Update the title
    audio.load();
    playAudio(); // Auto play the next audio
}

function prevAudio() {
    currentAudioIndex = (currentAudioIndex -1) % audioList.length; // Loop through the audio list
    audio.src = audioList[currentAudioIndex].song; 
    songImage.src = audioList[currentAudioIndex].img;
    title.textContent = `Title: ${audioList[currentAudioIndex].title}`; // Update the title
    audio.load();
    playAudio(); // Auto play the next audio
}



function updateAudioRange() {
    audioRange.setAttribute("max", audio.duration);
    audioRange.value = audio.currentTime;
    updateTimeDisplay();
}

function updateTimeDisplay() {
    var currentMinutes = Math.floor(audio.currentTime / 60);
    var currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    var durationMinutes = Math.floor(audio.duration / 60);
    var durationSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

audio.addEventListener("loadedmetadata", updateTimeDisplay);
audio.addEventListener("timeupdate", updateAudioRange);
audio.addEventListener("ended", changeAudio);

window.addEventListener("load", function() {
    audio.src = audioList[currentAudioIndex].song;
    songImage.src = audioList[currentAudioIndex].img;
    title.textContent = `Title: ${audioList[currentAudioIndex].title}`;
    audio.load();
    volumeRange.value = previousVolume; 
});


