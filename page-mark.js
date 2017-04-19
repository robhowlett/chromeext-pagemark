var scrollPos = -1;

function unmark(){
    var markerDiv = document.getElementById('markerDiv');
    markerDiv.parentNode.removeChild(markerDiv);
}

(function ($) {
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action == "mark"){
            if(scrollPos !== -1){
                unmark();
            }

            scrollPos = $(document).scrollTop();

            var div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "5px";
            div.style.background = "red";
            div.style.position = "absolute";
            div.style.top = scrollPos + "px";
            div.style.zIndex = "1000";
            div.style.opacity = "0.5";
            div.id = "markerDiv";
            document.body.appendChild(div);

            sendResponse({result: true});
        }else if(request.action == "jump"){
            $(document).scrollTop(scrollPos);
            sendResponse({result: true});
        }else if(request.action == "clear"){
            scrollPos = -1;
            unmark();
            sendResponse({result: true});
        }
    });
})(jQuery);
