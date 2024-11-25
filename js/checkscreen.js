var b1 = document.getElementById("change-game-board");
var b2 = document.getElementById("change-game-board2");
var b3 = document.getElementById("change-game-board3");
var b4 = document.getElementById("text-change-board");
var b5 = document.getElementById("timer-try");
var b6 = document.getElementById("rating-button");

function loadScript(url) {
    const script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

if (window.innerWidth <= 768) {
    b1.remove();
    b2.remove();
    b3.remove();
    b4.remove();
    b5.remove();
    b6.remove();
    loadScript('js/scriptMobile.js');
} else {
    loadScript('js/4x3board.js');
}