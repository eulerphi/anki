const BLACK_TO_PLAY = false;
const WHITE_TO_PLAY = true;

function importLichessPuzzle(info, tab) {
    chrome.tabs.query({
        'active': true,
        'currentWindow': true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            'type': 'importLichessPuzzle'
        });
    });
}

function importLichessPuzzle(info, tab) {
    chrome.tabs.query({
        'active': true,
        'currentWindow': true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            'type': 'importLichessPuzzle'
        });
    });
}

function sendMessage(tab, type, data) {
    chrome.tabs.sendMessage(tab.id, {
        'type': type,
        'data': data
    });
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    console.log(`onMessage: ${JSON.stringify(message)}`);
    if (message.type == 'addNote') {
        Importer.addAcvNote(message.data);
    }
});

chrome.contextMenus.create({
    'title': 'Copy (white to play)',
    'documentUrlPatterns': ['https://lichess.org/*'],
    'onclick': function (info, tab) { sendMessage(tab, 'copy', WHITE_TO_PLAY) }
});

chrome.contextMenus.create({
    'title': 'Copy (black to play)',
    'documentUrlPatterns': ['https://lichess.org/*'],
    'onclick': function (info, tab) { sendMessage(tab, 'copy', BLACK_TO_PLAY) }
});

chrome.contextMenus.create({
    'title': 'Lichess → Anki',
    'documentUrlPatterns': ['https://lichess.org/training*'],
    'onclick': function (info, tab) { sendMessage(tab, 'import') }
});