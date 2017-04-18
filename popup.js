var bgpage = chrome.extension.getBackgroundPage();
// bgpage.someBackgroundPageFunction([SOME VARIABLE(S) FROM POPUP]).

function set() {
    bgpage.xalert('set');
}
function clear() {
    bgpage.xalert('clear');
}
function jump() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        bgpage.xalert('jump' + tabs[0].id);
    });

}
function jumpAndClear() {
    bgpage.xalert('jumpAndClear');
}

document.getElementById('set').addEventListener('click', set);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('jump').addEventListener('click', jump);
document.getElementById('jumpAndClear').addEventListener('click', jumpAndClear);
