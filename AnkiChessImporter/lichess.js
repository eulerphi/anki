var Lichess = {
    fromPuzzle: function () {
        var moveEls = Array
            .from(document.querySelectorAll('move'))
            .filter(this.isValidMove);
        moveEls.forEach(this.clearChildren);

        var currentIdx = this.getCurrentIndex(moveEls);
        var moves = moveEls.map(m => m.innerText);

        return {
            'fen': this.fen(moves.slice(0, currentIdx)),
            'previousMoves': moves[currentIdx],
            'moves': moves.slice(currentIdx + 1).join(' '),
            'prompt': this.title(),
            'source': this.puzzleUrl()
        };
    },

    clearChildren: function (el) {
        while (el.lastElementChild) {
            el.removeChild(el.lastElementChild)
        }
    },

    fen: function (moves) {
        const chess = new Chess();
        for (let i = 0; i < moves.length; ++i) {
            chess.move(moves[i]);
        }

        return chess.fen();
    },

    getCurrentIndex: function (moveEls) {
        return moveEls
            .map(m => m.classList.contains('current'))
            .indexOf(true);
    },

    isValidMove: function (el) {
        return !el.matches('.empty, .fail');
    },


    puzzleId: function () {
        return document.querySelector('.infos a').innerText;
    },

    puzzleThemes: function () {
        const allowed = [
            'capture the defender',
            'discovered attack',
            'double check',
            'fork',
            'pin',
            'sacrifice',
            'skewer',
            'attraction',
            'clearance',
            'deflection',
            'interference',
            'intermezzo',
            'x-ray attack'];
        const set = new Set(allowed);

        return Array
            .from(document.querySelectorAll('.puzzle__themes__list__entry a'))
            .map(el => el.innerText.toLowerCase())
            .filter(x => set.has(x));
    },

    puzzleUrl: function () {
        return document.querySelector('.infos a').href;
    },

    title: function () {
        const id = document.querySelector('.infos a').innerText;
        const themes = this.puzzleThemes();
        const themesStr = !!themes.length ? ` (${themes.join()})` : '';
        return `${id}${themesStr}`;
    }
}