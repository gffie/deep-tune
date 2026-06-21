// 페이지 이동

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

// 기본 음악 데이터

const songs = [

    {
        title: "party 4 u",
        artist: "Charli xcx",
        genre: "하이퍼팝"
    },

    {
        title: "census designated",
        artist: "Jane Remover",
        genre: "하이퍼팝"
    },

    {
        title: "New Jeans",
        artist: "NewJeans",
        genre: "인디"
    },

    {
        title: "DNA",
        artist: "Kendrick Lamar",
        genre: "힙합"
    },

    {
        title: "Strobe",
        artist: "deadmau5",
        genre: "전자음악"
    },

    {
        title: "Yellow",
        artist: "Coldplay",
        genre: "록"
    }

];

// 저장 데이터

let savedSongs =
JSON.parse(localStorage.getItem("savedSongs")) || [];

let playlists =
JSON.parse(localStorage.getItem("playlists")) || [];

let nickname =
localStorage.getItem("nickname") || "";

// 홈 추천

function loadRecommendations() {

    const container =
    document.getElementById("recommendedSongs");

    container.innerHTML = "";

    songs.forEach(song => {

        container.innerHTML += `
        <div class="song-card">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <p>${song.genre}</p>

            <button onclick="saveSong('${song.title}')">
                저장
            </button>
        </div>
        `;
    });

}

loadRecommendations();

// 음악 검색

function searchSongs() {

    const keyword =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    const result =
    songs.filter(song =>

        song.title.toLowerCase().includes(keyword) ||

        song.artist.toLowerCase().includes(keyword)

    );

    displaySongs(result);

    showPage("explore");

}

// 음악 표시

function displaySongs(list) {

    const container =
    document.getElementById("songContainer");

    container.innerHTML = "";

    list.forEach(song => {

        container.innerHTML += `
        <div class="song-card">

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

            <p>${song.genre}</p>

            <button onclick="saveSong('${song.title}')">
                저장
            </button>

        </div>
        `;
    });

}

displaySongs(songs);

// 장르 필터

function filterSongs() {

    const genre =
    document.getElementById("genreFilter").value;

    if (genre === "전체") {

        displaySongs(songs);
        return;

    }

    const filtered =
    songs.filter(song => song.genre === genre);

    displaySongs(filtered);

}

// 음악 저장

function saveSong(title) {

    const song =
    songs.find(s => s.title === title);

    savedSongs.push({

        ...song,

        date:
        new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "savedSongs",
        JSON.stringify(savedSongs)
    );

    updateLog();
    updateStats();

    alert("저장 완료!");

}

// 디깅 로그

function updateLog() {

    const log =
    document.getElementById("diggingLog");

    log.innerHTML = "";

    savedSongs.forEach(song => {

        log.innerHTML += `
        <div class="song-card">

            <strong>${song.title}</strong>

            <p>${song.artist}</p>

            <p>${song.date}</p>

        </div>
        `;

    });

}

updateLog();

// 플레이리스트 생성

function createPlaylist() {

    const name =
    document.getElementById("playlistName")
    .value;

    if (!name) return;

    playlists.push(name);

    localStorage.setItem(
        "playlists",
        JSON.stringify(playlists)
    );

    renderPlaylists();

    document.getElementById("playlistName")
    .value = "";

}

function renderPlaylists() {

    const container =
    document.getElementById("playlistContainer");

    container.innerHTML = "";

    playlists.forEach((playlist, index) => {

        container.innerHTML += `
        <div class="song-card">

            <strong>${playlist}</strong>

            <br>

            <button onclick="deletePlaylist(${index})">
                삭제
            </button>

        </div>
        `;

    });

}

function deletePlaylist(index) {

    playlists.splice(index, 1);

    localStorage.setItem(
        "playlists",
        JSON.stringify(playlists)
    );

    renderPlaylists();

}

renderPlaylists();

// 닉네임

function saveNickname() {

    const value =
    document.getElementById("nicknameInput")
    .value;

    localStorage.setItem(
        "nickname",
        value
    );

    document.getElementById(
        "nicknameDisplay"
    ).innerText =
    `닉네임: ${value}`;

}

if (nickname) {

    document.getElementById(
        "nicknameDisplay"
    ).innerText =
    `닉네임: ${nickname}`;

}

// 통계

function updateStats() {

    document.getElementById(
        "savedCount"
    ).innerText =
    `저장한 음악 수: ${savedSongs.length}`;

    if (savedSongs.length === 0) return;

    const genreCount = {};
    const artistCount = {};

    savedSongs.forEach(song => {

        genreCount[song.genre] =
        (genreCount[song.genre] || 0) + 1;

        artistCount[song.artist] =
        (artistCount[song.artist] || 0) + 1;

    });

    const topGenre =
    Object.keys(genreCount)
    .reduce((a,b)=>

        genreCount[a] > genreCount[b]
        ? a : b

    );

    const topArtist =
    Object.keys(artistCount)
    .reduce((a,b)=>

        artistCount[a] > artistCount[b]
        ? a : b

    );

    document.getElementById(
        "topGenre"
    ).innerText =
    `가장 많이 저장한 장르: ${topGenre}`;

    document.getElementById(
        "topArtist"
    ).innerText =
    `가장 많이 저장한 아티스트: ${topArtist}`;

}

updateStats();