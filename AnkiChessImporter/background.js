async function addNote(data) {
    try {
        validateData(data);

        const decks = await Anki.getDecks();
        console.log(`Anki.getDecks: ${JSON.stringify(decks)}`);

        const models = await Anki.getModels();
        console.log(`Anki.getModels: ${JSON.stringify(models)}`);

        const deck = getDeck(decks);
        const model = getModel(models);

        const response = await Anki.addNote(deck, model, data)
        console.log(`Anki.addNote: ${JSON.stringify(response)}`);

        notify(`Added: '${data.prompt} to ${deck}'`);

    } catch (err) {
        notify(`Unable to add: ${err}`);
    }
}

function getDeck(decks) {
    for (let i = 0; i < decks.length; ++i) {
        if (decks[i].match(/chess/i)) {
            return decks[i];
        }
    }

    throw 'Unable to find Anki chess deck';
}

function getModel(models) {
    const target = "ACV-v1";

    if (models.includes(target)) {
        return target;
    }
    else {
        throw `Anki note type '${target}' not found.`;
    }
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

function notify(msg) {
    chrome.notifications.create(
        '',
        {
            type: 'basic',
            iconUrl: 'icon-64.png',
            title: 'Anki Chess Importer',
            message: msg
        });
}

function validateData(data) {
    validateHasStringValue(data, 'fen');
    validateHasStringValue(data, 'previousMoves');
    validateHasStringValue(data, 'moves');
    validateHasStringValue(data, 'prompt');
    validateHasStringValue(data, 'source');
}

function validateHasStringValue(data, propertyName) {
    var value = data[propertyName];
    var type = typeof (value);

    if (type !== 'string') {
        throw `Expected 'data.${propertyName}' to have type 'string'. Actual: '${type}'.`;
    }

    if (!value) {
        throw `Expected 'data.${propertyName}' to have nonempty value.`;
    }
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    console.log(`onMessage: ${JSON.stringify(message)}`);
    if (message.type == 'addNote') {
        addNote(message.data);
    }
});

chrome.contextMenus.create({
    'title': 'Lichess → Anki',
    'documentUrlPatterns': ['https://lichess.org/training*'],
    'onclick': importLichessPuzzle
});