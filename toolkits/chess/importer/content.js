chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.type == 'copy') {
        Lichess.copy(message.data);
    }
    if (message.type == 'import') {
        chrome.runtime.sendMessage({
            'type': 'addNote',
            'data': Lichess.toAcvDatafromPuzzle()
        });
    }
});