chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "parent",
        title: "Klaffer",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-current-tab",
        title: "Close current tab",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-all-tabs",
        title: "Close all tabs",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-tabs-left-current",
        title: "Close tabs to the left of current tab",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-tabs-right-current",
        title: "Close tabs to the right of current tab",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-other-tabs-except-current",
        title: "Close other tabs except current tab",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-tabs-current-domain",
        title: "Close tabs from current domain",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-tabs-other-domain",
        title: "Close tabs from other domain",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "close-tabs-with-sound",
        title: "Close tabs with sound",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "mute-tabs-with-sound",
        title: "Mute tabs with sound",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "unmute-tabs-with-sound",
        title: "Unmute tabs with sound",
        parentId: "parent",
        contexts:["all"]
    });

    chrome.contextMenus.create({
        id: "merge-windows",
        title: "Merge windows",
        parentId: "parent",
        contexts:["all"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "close-current-tab") {
        chrome.tabs.query({active: true}, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
    }

    if (info.menuItemId == "close-all-tabs") {
        chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
            }
        });
    }

    if (info.menuItemId == "close-tabs-left-current") {
        chrome.tabs.query({}, function (tabs) {
            let i = 0;
            while(!tabs[i].active){
                chrome.tabs.remove(tabs[i].id);
                i++;
            }
        });
    }

    if (info.menuItemId == "close-tabs-right-current") {
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

    if (info.menuItemId == "close-other-tabs-except-current") {
        chrome.tabs.query({active: false}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
            }
        });
    }

    if (info.menuItemId == "close-tabs-current-domain") {
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

    if (info.menuItemId == "close-tabs-other-domain") {
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

    if (info.menuItemId == "close-tabs-with-sound") {
        chrome.tabs.query({audible: true}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
            }
        });
    }

    if (info.menuItemId == "mute-tabs-with-sound") {
        chrome.tabs.query({audible: true}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.update(tabs[i].id, {"muted": true});
            }
        });
    }

    if (info.menuItemId == "unmute-tabs-with-sound") {
        chrome.tabs.query({muted: true}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.update(tabs[i].id, {"muted": false});
            }
        });
    }

    if (info.menuItemId == "merge-windows") {
        chrome.tabs.query({active: true, highlighted: true}, function (tab) {
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.move(tabs[i].id, {windowId: tab[0].windowId, index: -1}, function (){});
                }
            });
        });
    }
});