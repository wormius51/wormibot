const socket = io();
const notification = new Audio("/sounds/Pop.wav");
notification.volume = 0.3;

socket.on("message", () => {notification.play()});
socket.on("play music", musicScript => {playMusic(musicScript)});
socket.on("save music", saveMusic);
socket.on("play saved music", username => {
    let musicScript = popMusicScript(username);
    playMusic(musicScript);
});
socket.on("set volume", volumeString => {
    if (!isNaN(volumeString) && isFinite(volumeString)) {
        volume = parseFloat(volumeString);
    }
});

const musicScripts = {};

function saveMusic(data) {
    if (musicScripts[data.username]) {
        musicScripts[data.username] += " " + data.musicScript;
    } else {
        musicScripts[data.username] = data.musicScript;
    }
}

function popMusicScript(username) {
    if (musicScripts[username]) {
        let musicScript = musicScripts[username];
        musicScripts[username] = undefined;
        return musicScript;
    }
    return "";
}