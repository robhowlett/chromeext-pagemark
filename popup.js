var bgpage = chrome.extension.getBackgroundPage();
// bgpage.someBackgroundPageFunction([SOME VARIABLE(S) FROM POPUP]).

function doAction(action) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        if(action == "mark"){
            bgpage.mark(tabs[0].id);
        }else if(action == "clear"){
            bgpage.clear(tabs[0].id);
        }else if(action == "jump"){
            bgpage.jump(tabs[0].id);
        }else if(action == "jumpAndClear"){
            bgpage.jumpAndClear(tabs[0].id);
        }
        window.close();
    });
}

document.getElementById('mark').addEventListener('click', function(){
    doAction('mark');
});
document.getElementById('clear').addEventListener('click', function(){
    doAction('clear');
});
document.getElementById('jump').addEventListener('click', function(){
    doAction('jump');
});
document.getElementById('jumpAndClear').addEventListener('click', function(){
    doAction('jumpAndClear');
});
