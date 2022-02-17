const Importer = (function () {
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

    const Acv = (function () {
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

        function validateData(data) {
            validateHasStringValue(data, 'puzzle');
            validateHasStringValue(data, 'prompt');
            validateHasStringValue(data, 'source');
        }

        return {
            addNote: async function (data) {
                try {
                    validateData(data);

                    const decks = await Anki.getDecks();
                    console.log(`Anki.getDecks: ${JSON.stringify(decks)}`);

                    const models = await Anki.getModels();
                    console.log(`Anki.getModels: ${JSON.stringify(models)}`);

                    const deck = getDeck(decks);
                    const model = getModel(models);

                    console.log(`Anki.addNote (request): (${deck}, ${model}, ${JSON.stringify(data)})`);
                    const response = await Anki.addNote(deck, model, data)
                    console.log(`Anki.addNote (response): ${JSON.stringify(response)}`);

                    notify(`Added: '${data.prompt} to ${deck}'`);

                } catch (err) {
                    notify(`Unable to add: ${err}`);
                }
            }
        };
    })();

    return {
        addAcvNote: async function (data) {
            Acv.addNote(data);
        }
    };
})();