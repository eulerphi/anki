chrome.extension.onMessage.addListener(function (message, sender, callback) {
    console.log(`onMessage: ${JSON.stringify(message)}`);
    if (message.type == 'addVocabNotes') {
        Importer.addVocabNotes(message.data);
    }
});

chrome.contextMenus.create({
    'title': '→ Anki',
    'documentUrlPatterns': ['https://eulerphi.github.io/importer/vocab/*'],
    'onclick': function (info, tab) { sendMessage(tab, 'import') }
});