// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var markSet = {};

function getMarkSet(tabId){
    return markSet[tabId];
}

function mark(tabId){
    chrome.tabs.sendMessage(tabId, {action: "mark"}, function(response) {
        if(response.result){
            markSet[tabId] = true;
        }
        updateIcon(tabId);
    });
}

function jump(tabId){
    chrome.tabs.sendMessage(tabId, {action: "jump"}, function(response) {
    });
}

function clear(tabId){
    chrome.tabs.sendMessage(tabId, {action: "clear"}, function(response) {
        if(response.result){
            markSet[tabId] = false;
        }
        updateIcon(tabId);
    });
}

function jumpAndClear(tabId){
    jump(tabId);
    clear(tabId);
}

function updateIcon(tabId) {
    if(!(tabId in markSet)){
        markSet[tabId] = false;
    }
    if (markSet[tabId]){
        chrome.browserAction.setIcon({path:"icon-marked.png"});
    }else{
        chrome.browserAction.setIcon({path:"icon-unmarked.png"});
    }
}

chrome.browserAction.setPopup({popup:"popup.html"});
// chrome.browserAction.onClicked.addListener(function(tab) {
//     markUnmark(tab.id);
// });

chrome.tabs.onActivated.addListener(function(activeInfo){
    updateIcon(activeInfo.tabId);
});

chrome.tabs.onRemoved.addListener(function(tabId){
    delete markSet[tabId];
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(typeof(changeInfo.url) != "undefined"){
        delete markSet[tabId];
        updateIcon(tabId);
    }
});

chrome.tabs.query({currentWindow: true, active: true }, function (tabArray) {
    updateIcon(tabArray[0].id);
});
