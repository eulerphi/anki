![demo](/images/acv.png)

# Installation Guide
See [guide](install.md).

# Fields

## FEN
The [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) for a board position.
For example, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" is the initial starting position.

**NOTES**:
 * If there are previous moves, then this must be the position that immediately precedes the first move in the "PreviousMoves" field.
 * If there are no previous moves, then this position must immediately precede the first move from the "Moves" field.
 * If there aren't any previous moves nor any moves, then there are no restrictions.

## Moves
A space separated list of moves to be solved. Each move is encoded using [short algebraic notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)). For example, "e4 e5 f3".

**NOTE**: These will show up as "???" in the move log.

## Prompt
Arbitrary text to show. When coupled with the "Answer" field, question and answer style cards can be made.

## Answer
Arbitrary text to show on the back of the card. When coupled with the "Prompt" field, question and answer style cards can be made.

## PreviousMoves
A space separated list of moves that precede the moves in the "Moves" field.

## Arrows
A space separated list of arrows to show. Each arrow is encoded as a source square and a destination square. For example, "a1h8 e2e4" would show two arrows. The first arrow would start at a1 and end at h8. The second arrow would start at e2 and end at e4.

## Source
This field is used by [Anki Chess Importer](/toolkits/chess/importer/) to store the URL of the imported puzzle.