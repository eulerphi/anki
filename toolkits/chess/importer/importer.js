const Importer = (function () {
    async function addAnkiNote(deck, model, fields) {
        console.log(`Anki.addNote (request): (${deck}, ${model}, ${JSON.stringify(fields)})`);
        const response = await Anki.addNote(deck, model, fields)
        console.log(`Anki.addNote (response): ${JSON.stringify(response)}`);

        return response;
    }

    function getDeck(decks, regex) {
        for (let i = 0; i < decks.length; ++i) {
            if (decks[i].match(regex)) {
                return decks[i];
            }
        }

        throw `Unable to find Anki deck that matches: ${regex.toString()}`;
    }

    function getModel(models, target) {
        if (models.includes(target)) {
            return target;
        }
        else {
            throw `Anki note type '${target}' not found.`;
        }
    }

    function notify(msg) {
        chrome.notifications.create(
            '',
            {
                type: 'basic',
                iconUrl: 'icon-64.png',
                title: 'Anki Importer',
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

                    const deck = getDeck(decks, /chess/i);
                    const model = getModel(models, 'ACV-v1');

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

    const Vocab = (function () {

        async function addAntonymNote(data, deck, models) {
            const model = getModel(models, 'AllInOne (kprim, mc, sc)');
            const fields = toMultipleChoiceFields(data, 'Antonym?', 'ant');
            return await addAnkiNote(deck, model, fields);
        }

        async function addSynonymNote(data, deck, models) {
            const model = getModel(models, 'AllInOne (kprim, mc, sc)');
            const fields = toMultipleChoiceFields(data, 'Synonym?', 'syn');
            return await addAnkiNote(deck, model, fields);
        }

        async function addUnscrambleNote(data, deck, models) {
            const model = getModel(models, 'Unscramble: word + definition');

            const fields = {
                Examples: examples(data, exampleToCloze),
                Word: data.word,
                Definition: `${data.part} ${data.definition}`
            }

            return await addAnkiNote(deck, model, fields);
        }

        function examples(data, fn) {
            let examples = [
                fn(data.example1),
                fn(data.example2),
                fn(data.example3)
            ];

            return examples.filter(x => !!x).join('<br><br>');
        }

        function exampleToBold(text) {
            return exampleToFormattedString(text, '<b>', '</b>');
        }

        function exampleToCloze(text) {
            return exampleToFormattedString(text, '{{c1::', '}}');
        }

        function exampleToFormattedString(text, beforeFormat, afterFormat) {
            if (!text) {
                return '';
            }

            let lines = text.split(/\r?\n/);
            if (lines.length != 3) {
                throw 'Expected example format:\n\t<start-text>\n\t<cloze-text>\n\t<end-text>';
            }

            let formatted = `${beforeFormat}${lines[1]}${afterFormat}`;

            return `${lines[0]} ${formatted} ${lines[2]}`
        }

        function toMultipleChoiceFields(data, title, choice_prefix) {
            return {
                Question: `<b>${title}</b><br><br>${data.part} ${data.word}`,
                'QType (0=kprim,1=mc,2=sc)': '2',
                Q_1: data[`${choice_prefix}_correct`],
                Q_2: data[`${choice_prefix}_incorrect1`],
                Q_3: data[`${choice_prefix}_incorrect2`],
                Q_4: data[`${choice_prefix}_incorrect3`],
                Answers: '1',
                'Extra 1': `definition: ${data.definition}`
            };
        }

        function validateData(data) {
            const ids = [
                'word',
                'part',
                'definition',
                'example1',
                'example2',
                // 'example3', (optional)
                'syn_correct',
                'syn_incorrect1',
                'syn_incorrect2',
                'syn_incorrect3',
                'ant_correct',
                'ant_incorrect1',
                'ant_incorrect2',
                'ant_incorrect3'
            ];

            for (let i = 0; i < ids.length; ++i) {
                validateHasStringValue(data, ids[i]);
            }
        }

        return {
            addNotes: async function (data) {
                try {
                    validateData(data);

                    const decks = await Anki.getDecks();
                    console.log(`Anki.getDecks: ${JSON.stringify(decks)}`);

                    const models = await Anki.getModels();
                    console.log(`Anki.getModels: ${JSON.stringify(models)}`);

                    const deck = getDeck(decks, /reading/i);

                    addUnscrambleNote(data, deck, models);
                    addSynonymNote(data, deck, models);
                    addAntonymNote(data, deck, models);

                    notify(`Added: 3 notes to '${deck}'`);

                } catch (err) {
                    notify(`Error: ${err}`);
                }
            }
        };
    })();

    return {
        addAcvNote: async function (data) {
            Acv.addNote(data);
        },
        addVocabNotes: async function (data) {
            Vocab.addNotes(data);
        }
    };
})();