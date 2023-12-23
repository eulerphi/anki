var XMLHttpRequest = require('xhr2');

var Anki = {
    addNote: function (deckName, modelName, fields) {
        return this.invoke('addNote', {
            'note': {
                'deckName': deckName,
                'modelName': modelName,
                'fields': fields,
                'options': {
                    'allowDuplicate': false,
                    'duplicateScope': 'deck',
                    'duplicateScopeOptions': {
                        'deckName': deckName,
                        'checkChildren': false,
                        'checkAllModels': false
                    }
                },
                'tags': [
                    'AnkiChessImporter'
                ]
            }
        });
    },

    getDecks: function () {
        return this.invoke('deckNames');
    },

    getModels: function () {
        return this.invoke('modelNames');
    },

    invoke: function (action, params = {}) {
        const version = 6;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('error', () => reject('failed to issue request'));
            xhr.addEventListener('load', () => {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (Object.getOwnPropertyNames(response).length != 2) {
                        throw 'response has an unexpected number of fields';
                    }
                    if (!response.hasOwnProperty('error')) {
                        throw 'response is missing required error field';
                    }
                    if (!response.hasOwnProperty('result')) {
                        throw 'response is missing required result field';
                    }
                    if (response.error) {
                        throw response.error;
                    }
                    resolve(response.result);
                } catch (e) {
                    reject(e);
                }
            });

            xhr.open('POST', 'http://127.0.0.1:8765');
            xhr.send(JSON.stringify({ action, version, params }));
        });
    },
};

exports.Anki = Anki;