/* Elementler */
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')
const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')
const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

///sıra 
let index = 4

//döngü 
let loop = true

//karıştır

//json verisi
const songsList = [
    {
        name: "Senden güzeli mi var ?",
        link: "assets/sendengüzelimivar.mp3",
        artist: "Emre Fel",
        image: "assets/sendengüzeli.jpg"
    },
    {
        name: "Ayrılmam",
        link: "assets/ayrilmam.mp3",
        artist: "Berkay Altunyay",
        image: "assets/berkayy.jpg"
    },
    {
        name: "Ara beni lütfen",
        link: "assets/arabenilütfen.mp3",
        artist: "Kenan Doğulu",
        image: "assets/kenand.jpg"
    },
    {
        name: "Gurbet",
        link: "assets/gurbet.mp3",
        artist: "Özdemir Erdoğan",
        image: "assets/gurbet.jpg"
    },
    {
        name: "Bir imkansız var",
        link: "assets/birimkansiz.mp3",
        artist: "Emrah Karaduman & Merve Özbey",
        image: "assets/emrahmerve.jpg"
    }

]

// durdur
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

// şarkıları atama 
const setSong = (arrayIndex) => {
    let { name, link, artist, image } = songsList[arrayIndex]

    songName.innerHTML = name
    audio.src = link
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadedmetadata = () => {
        //saniye hesapla
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playListContainer.classList.add('hide')
    playAudio()
}





//saniye kontorlu
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    //ilerleme çubuğu aktifleştirme 
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}

//progress bar ilerletme

progressBar.addEventListener("click", (event) => {
    // İlerleme çubuğunun sol koordinatını al
    let coordStart = progressBar.getBoundingClientRect().left

    // Tıklanan noktanın x koordinatını al
    let coordEnd = event.clientX

    // İlerlemenin yüzdesini hesapla
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    // Şu anki ilerlemeyi ayarla
    currentProgress.style.width = progress * 100 + "%"

    // Şarkıyı ilerlet
    audio.currentTime = progress * audio.duration

    // Şarkıyı oynat
    audio.play()

    // Duraklat düğmesini gizle, oynat düğmesini göster
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
})



//önceki 
const previousSong = () => {
    if (index > 0) {
        pauseAudio()
        index = index - 1
    } else {
        index = songsList.length - 1
    }
    setSong(index)
}

//sonraki
const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index = index + 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
}

//tekrar
const reptSong = () => {
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active")
        audio.loop = false
    } else {
        repeatButton.classList.add("active")
        audio.loop = true
    }
}

//karıştır 
const shuffleSong = () => {
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active")
        audio.loop = true
    } else {
        shuffleButton.classList.add("active")
        audio.loop = false
    }
}


//ses oynatma
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}

//oynat butonuna tıklamak
playButton.addEventListener('click', playAudio)

//durdurma 
pauseButton.addEventListener("click", pauseAudio)

//geri butonu
prevButton.addEventListener("click", previousSong)

//ileri butonu
nextButton.addEventListener("click", nextSong)

//tekrar butonu
repeatButton.addEventListener("click", reptSong)

//oto şarkı değiştirme
audio.onended = () => {
    nextSong()
}

//playlist açma
playListButton.addEventListener("click", () => {
    playListContainer.classList.remove("hide")
})

//kapama
closeButton.addEventListener("click",() =>{
    playListContainer.classList.add("hide")
})






//karıştır butonu
shuffleButton.addEventListener("click", shuffleSong)

const initializePlaylist = () => {
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class= "playlist-image-container" >
        <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
         <span id="playlist-song-name">
        ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
        ${songsList[i].artist}
         
          </span>
         </div>
        </li>
        `

    }
}


window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}