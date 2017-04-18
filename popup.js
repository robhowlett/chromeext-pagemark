var bgpage = chrome.extension.getBackgroundPage();
// bgpage.someBackgroundPageFunction([SOME VARIABLE(S) FROM POPUP]).

function set() {
    bgpage.xalert('set');
}

function clear() {
    bgpage.xalert('clear');
}

function jump() {
    bgpage.xalert('jump');
}

document.getElementById('set').addEventListener('click', set);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('jump').addEventListener('click', jump);
