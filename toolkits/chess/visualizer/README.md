![demo](/images/acv.png)

# Installation Guide
See [guide](install.md).

# Fields
## Puzzle
The "Puzzle" field has two lines:
1. The [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) (FEN) value of the starting position
    * This position must immediately precede the first move in the moves list.
    * The hyphen, '-', is a shorthand value to specify the default starting position. 
1.  A space separated list of moves to be solved.
    * Each move is encoded using [short algebraic notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)). For example, "e4 e5 f3".
    * Moves show up as "???" in the move log.
    * An optional '\|' may be used to indicate that the moves to the left should be revealed (i.e. the actual puzzle consists of the moves on the right).

### Examples

| Example | Description |
|-------|-------------|
| rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1<br>e4 e5 Nf3 | Default board position.<br>All moves are shown as "???".  |
| -<br>e4 e5 Nf3 | Same as above<br>'-' is shorthand for the default board |
| -<br>e4 e5 \| Nf3 | "e4" and "e5" are revealed<br>"Nf3" is shown as "???" | 

## Prompt
Arbitrary text to show. When coupled with the "Answer" field, question and answer style cards can be made.

## Answer
Arbitrary text to show on the back of the card. When coupled with the "Prompt" field, question and answer style cards can be made.

## Arrows
A space separated list of arrows to show. Each arrow is encoded as a source square and a destination square. For example, "a1h8 e2e4" would show two arrows. The first arrow would start at a1 and end at h8. The second arrow would start at e2 and end at e4.

## Source
This field is used by [Anki Chess Importer](/toolkits/chess/importer/) to store the URL of the imported puzzle.