var { Anki } = require('./anki.js');

(async () => {
    let decks = await Anki.getDecks();
    console.log(decks);
})();