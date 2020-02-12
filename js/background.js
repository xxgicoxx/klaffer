chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: "Klaffer",
        id: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        title: "Close current tab",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({active: true}, function (tabs) {
                chrome.tabs.remove(tabs[0].id);
            });
        }
    });

    chrome.contextMenus.create({
        title: "Close all tabs",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.remove(tabs[i].id);
                }
            });
        }
    });

    chrome.contextMenus.create({
        title: "Close tabs to the left of current tab",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({}, function (tabs) {
                let i = 0;
                while(!tabs[i].active){
                    chrome.tabs.remove(tabs[i].id);
                    i++;
                }
            });
        }
    });

    chrome.contextMenus.create({
        title: "Close tabs to the right of current tab",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({}, function (tabs) {
                let close = false;
                for (var i = 0; i < tabs.length; i++) {
                    if(tabs[i].active){
                        close = true;
                    } else if (close) {
                        chrome.tabs.remove(tabs[i].id);
                    }
                }
            });
        }
    });

    chrome.contextMenus.create({
        title: "Close other tabs except current tab",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({active: false}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.remove(tabs[i].id);
                }
            });
        }
    });

    chrome.contextMenus.create({
        title: "Close tabs from current domain",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({active: true}, function (tab) {
                let url = new URL(tab[0].url);
                let domain = url.hostname
                chrome.tabs.query({}, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        if(tabs[i].url.includes(domain)){
                            chrome.tabs.remove(tabs[i].id);
                        }
                    }
                });
            });
        }
    });

    chrome.contextMenus.create({
        title: "Close tabs from other domain",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({active: true}, function (tab) {
                let url = new URL(tab[0].url);
                let domain = url.hostname
                chrome.tabs.query({}, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        if(!tabs[i].url.includes(domain)){
                            chrome.tabs.remove(tabs[i].id);
                        }
                    }
                });
            });
        }
    });

    chrome.contextMenus.create({
        title: "Close tabs with sound",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({audible: true}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.remove(tabs[i].id);
                }
            });
        }
    });

    chrome.contextMenus.create({
        title: "Mute tabs with sound",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({audible: true}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.update(tabs[i].id, {"muted": true});
                }
            });
        }
    });

    chrome.contextMenus.create({
        title: "Unmute tabs with sound",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({muted: true}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.update(tabs[i].id, {"muted": false});
                }
            });
        }
    });

    chrome.contextMenus.create({
        title: "Merge windows",
        parentId: "parent",
        contexts:["all"],
        onclick: function(){
            chrome.tabs.query({active: true, highlighted: true}, function (tab) {
                chrome.tabs.query({}, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        chrome.tabs.move(tabs[i].id, {windowId: tab[0].windowId, index: -1}, function (){});
                    }
                });
            });
        }
    });
});