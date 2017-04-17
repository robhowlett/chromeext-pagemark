/**
  * scroll-mark
  */

var scrollPos = 0;

(function ($) {
//     $(document).scrollTop(300);
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(scrollPos === 0){
        scrollPos = $(document).scrollTop();
      }else{
        $(document).scrollTop(scrollPos);
        scrollPos = 0;
      }
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
    });
})(jQuery);
