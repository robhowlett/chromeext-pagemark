// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var markSet = true;
var currentTab = 0;

function updateIcon() {
  markSet = !markSet;
  if (markSet){
      chrome.browserAction.setIcon({path:"icon2.png"});
      chrome.browserAction.setBadgeText({text: "set"});
  }else{
      chrome.browserAction.setIcon({path:"icon1.png"});
      chrome.browserAction.setBadgeText({text: "none"});
  }
}

//chrome.browserAction.setPopup({popup:"popup.html"});
chrome.browserAction.onClicked.addListener(function() {
  updateIcon();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });
});
updateIcon();

chrome.tabs.onActivated.addListener(function(activeInfo){
    alert(activeInfo.tabId);
});

chrome.tabs.onRemoved.addListener(function(tabId){
    alert(tabId);
});

chrome.tabs.query(
  { currentWindow: true, active: true },
  function (tabArray) {
    alert(tabArray[0].id);
});
