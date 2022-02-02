chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.type == 'importLichessPuzzle') {
        chrome.runtime.sendMessage({
            'type': 'addNote',
            'data': Lichess.fromPuzzle()
        });
    }
});