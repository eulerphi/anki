const Lichess = (function () {
    /*
     * Board
     */
    const Board = (function () {
        function board() {
            const boardEl = document
                .querySelector(".main-board cg-container");

            const boardSize = boardEl
                .getBoundingClientRect()
                .width;

            return {
                element: boardEl,
                isPlayerWhite: isPlayerWhite(boardEl),
                squareSize: boardSize / 8
            };
        }


        function isPlayerWhite(boardEl) {
            const ranksContainerEl = boardEl.querySelectorAll("coords.ranks")[0];
            return window
                .getComputedStyle(ranksContainerEl)
                .getPropertyValue('flex-flow')
                .startsWith('column-reverse');
        }

        function pieces(board) {
            return Array
                .from(board.element.querySelectorAll("cg-board piece"))
                .map(el => toPiece(board, el));
        }

        function toFenBoard(pieces_) {
            let ranks = new Array(8);
            for (let r = 0; r < 8; ++r) {
                ranks[r] = new Array(8);
            }

            for (let i = 0; i < pieces_.length; ++i) {
                const r = pieces_[i].rankIndex;
                const f = pieces_[i].fileIdx;
                const p = pieces_[i].piece;
                ranks[r][f] = p;
            }

            let fen = '';
            for (let r = 7; r >= 0; --r) {
                let count = 0;
                for (let f = 0; f < 8; ++f) {
                    if (!ranks[r][f]) {
                        ++count;
                    }
                    else {
                        if (count > 0) {
                            fen += count;
                            count = 0;
                        }

                        fen += ranks[r][f];
                    }
                }

                if (count > 0) {
                    fen += count;
                }
                if (r > 0) {
                    fen += '/'
                }
            }

            return fen;
        }

        function toFenPiece(name) {
            function toLetter(name) {
                if (name.match('king')) {
                    return 'k';
                }
                else if (name.match('queen')) {
                    return 'q';
                }
                else if (name.match('rook')) {
                    return 'r';
                }
                else if (name.match('bishop')) {
                    return 'b';
                }
                else if (name.match('knight')) {
                    return 'n';
                }
                else if (name.match('pawn')) {
                    return 'p';
                }
                else {
                    throw 'Unknown piece name';
                }

            }

            const letter = toLetter(name);
            const isBlackPiece = name.match('black');
            return isBlackPiece
                ? letter
                : letter.toUpperCase();
        }

        function toPiece(board, pieceEl) {
            const matrix = Util
                .getTransformMatrix(pieceEl);

            const xIndex = Math.round(matrix.e / board.squareSize);
            const yIndex = Math.round(matrix.f / board.squareSize);

            return {
                fileIdx: board.isPlayerWhite
                    ? xIndex
                    : 7 - xIndex,

                piece: toFenPiece(pieceEl.className),

                rankIndex: board.isPlayerWhite
                    ? 7 - yIndex
                    : yIndex
            };
        }

        return {
            fen: function (whiteToPlay) {
                const board_ = board();
                const pieces_ = pieces(board_);

                const boardFen = toFenBoard(pieces_);
                const playerColor = whiteToPlay ? 'w' : 'b';
                return `${boardFen} ${playerColor} - - 0 1`;
            }
        };
    })();

    /*
     * MoveLog
     */
    const MoveLog = (function () {
        function activeIndex(moveEls) {
            return moveEls
                .map(m => m.matches('.a1t, .active'))
                .indexOf(true);
        }

        function currentIndex(moveEls) {
            return moveEls
                .map(m => m.matches('.current'))
                .indexOf(true);
        };

        function elements() {
            const selectors = ['.tview2 > move', 'l4x > u8t'];

            for (let i = 0; i < selectors.length; ++i) {
                const moveEls = document
                    .querySelectorAll(selectors[i]);

                if (moveEls.length > 0) {
                    return Array
                        .from(moveEls)
                        .filter(isValidMove);
                }
            }

            return [];
        }

        function extractSan(moveEl) {
            const sanEl = moveEl.querySelector('san');

            const copy = !!sanEl
                ? sanEl.cloneNode(true)
                : moveEl.cloneNode(true);

            Util.clearElementChildren(copy);
            return copy.innerText;
        }

        function isValidMove(moveEl) {
            return !moveEl.matches('.empty, .fail');
        };

        return {
            fromActive: function () {
                const moveEls = elements();
                const activeIdx = activeIndex(moveEls);
                const moves = moveEls.map(extractSan);
                return moves.slice(activeIdx + 1);
            },
            getMoves: function () {
                const moveEls = elements();
                const currentIdx = currentIndex(moveEls);
                const moves = moveEls.map(extractSan);

                return {
                    previous: moves.slice(0, currentIdx),
                    current: moves[currentIdx],
                    next: moves.slice(currentIdx + 1)
                };
            },
        };

    })();

    /*
     * Puzzle
     */
    const Puzzle = (function () {
        function id() {
            return idElement().innerText;
        };

        function idElement() {
            return document.querySelector('.infos a');
        };

        function themes() {
            const allowed = new Set([
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
                'x-ray attack']);

            return Array
                .from(document.querySelectorAll('.puzzle__themes__list__entry a'))
                .map(el => el.innerText.toLowerCase())
                .filter(x => allowed.has(x));
        };


        function title() {
            const ts = themes();
            const themesStr = !!ts.length
                ? ` (${ts.join()})`
                : '';
            return `${id()}${themesStr}`;
        };

        function url() {
            return idElement().href;
        };

        return {
            toAcvData: function () {
                const moves = MoveLog.getMoves();
                return {
                    'fen': Util.fen(moves.previous),
                    'previousMoves': moves.current,
                    'moves': moves.next.join(' '),
                    'prompt': title(),
                    'source': url()
                };
            },
        }
    })();

    /*
     * Util
     */
    const Util = {
        clearElementChildren: function (el) {
            while (el.lastElementChild) {
                el.removeChild(el.lastElementChild)
            }
        },

        getTransformMatrix: function (el) {
            const styles = window.getComputedStyle(el);
            const transform = styles.getPropertyValue('transform');
            return new DOMMatrix(transform);
        },

        fen: function (moves) {
            const chess = new Chess();
            for (let i = 0; i < moves.length; ++i) {
                chess.move(moves[i]);
            }

            return chess.fen();
        },
    };


    /*
     *   LICHESS PUBLIC API
     */
    return {
        copy: function (whiteToPlay) {
            const fen = Board.fen(whiteToPlay);
            console.log(`fen: ${fen}`);

            const moves = MoveLog.fromActive();
            console.log(`moves: ${moves}`);

            navigator.clipboard.writeText(`${fen} ${moves}`);
        },

        toAcvDatafromPuzzle: function () {
            return Puzzle.toAcvData();
        }
    }
})();