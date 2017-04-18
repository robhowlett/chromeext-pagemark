/**
  * scroll-mark
  */

var scrollPos = 0;

(function ($) {
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action == "mark"){
            scrollPos = $(document).scrollTop();
            sendResponse({result: true});
        }else if(request.action == "jump"){
            $(document).scrollTop(scrollPos);
            sendResponse({result: true});
        }else if(request.action == "clear"){
            scrollPos = 0;
            sendResponse({result: true});
        }
    });
})(jQuery);
