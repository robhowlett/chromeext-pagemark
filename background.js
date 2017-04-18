// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var markSet = {};
var currentTab = 0;

function toggleValue(tabId) {
    markSet[tabId] = !markSet[tabId];
}

function updateIcon(tabId) {

    if(!(tabId in markSet)){
        markSet[tabId] = false;
    }

    if (markSet[tabId]){
        chrome.browserAction.setIcon({path:"icon2.png"});
        chrome.browserAction.setBadgeText({text: "set"});
    }else{
        chrome.browserAction.setIcon({path:"icon1.png"});
        chrome.browserAction.setBadgeText({text: "none"});
    }
}

//chrome.browserAction.setPopup({popup:"popup.html"});
chrome.browserAction.onClicked.addListener(function(tab) {
    toggleValue(tab.id);
    updateIcon(tab.id);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    updateIcon(activeInfo.tabId);
});

chrome.tabs.onRemoved.addListener(function(tabId){
    delete markSet[tabId];
});

chrome.tabs.query({currentWindow: true, active: true }, function (tabArray) {
    updateIcon(tabArray[0].id);
});
