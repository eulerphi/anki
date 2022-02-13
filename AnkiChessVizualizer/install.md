# Anki Chess Visualizer Installation Guide

## Create ACV-v1 Note Type
1. Download the latest Anki Chess Toolkit release.
1. Copy "_acv_v1_*.js" (e.g. "_acv_v1_220208_2952.js") to your [Anki profile's media folder](https://docs.ankiweb.net/files.html#file-locations)
    1. **NOTE**: The underscore prefix in the file name tells Anki should ignore the file (i.e. Anki shouldn't clean it up).
1. Open Anki
1. Create a note type (i.e. Tools | Manage Note Types | Add)
1. Select "Add: Basic"
1. Name the note type "ACV-v1"
    1. **WARNING**: Anki Chess Importer is hardcoded to look for this name. If you name it something else, ACI won't work.

## Set up Fields
1. Select "ACV-v1" from the list of note types and click "Fields..."
1. Rename "Front" as "FEN"
1. Rename "Back" as "Moves"
1. Add fields "Prompt", "Answer", "PreviousMoves", "Arrows", and "Source"
1. There should now be 7 fields.
1. Click Save

## Set up Cards
1. Select "ACV-v1" from the list of note types and click "Cards..."
1. Replace the front template and back templates
    1. **WARNING**: You must update the templates to point at your specific "_acv_v1_*.js" file. The script won't load otherwise.
1. Click Save

## Front Template:
```
<div id="fen" style="display: none">{{FEN}}</div>
<div id="prompt" style="display: none">{{Prompt}}</div>
<div id="moves" style="display: none">{{Moves}}</div>
<div id="answer" style="display: none">{{Answer}}</div>
<div id="prevMoves" style="display: none">{{PreviousMoves}}</div>
<div id="arrows" style="display: none">{{Arrows}}</div>
<main></main>
<script type="text/javascript">
	var script = document.createElement("script");
    
    /***************************************
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    ****************************************/
	script.src   = "_acv_v1_<**UPDATE VERSION HERE**>.js";
	
    
    document.getElementsByTagName('head')[0].appendChild(script);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function waitForReadyStateAndRun() {
        for (let i = 0; i < 100; i++) {
            await sleep(100);
            if (document.readyState === "complete") {
				var elmApp = Elm.Main.init({
					node: document.querySelector('main'),
                    flags: {
						devicePixelRatio: window.devicePixelRatio,
						answer: document.querySelector('#answer').innerText,
						arrows: document.querySelector('#arrows').innerText,
						fen: document.querySelector('#fen').innerText,
						moves: document.querySelector('#moves').innerText,
                        prevMoves: document.querySelector('#prevMoves').innerText,
						prompt: document.querySelector('#prompt').innerText,
						showAnswer: false
					}});
                break;
            }
        }
    }

    waitForReadyStateAndRun();
    </script>
```


## Back Template:
```
<div id="fen" style="display: none">{{FEN}}</div>
<div id="prompt" style="display: none">{{Prompt}}</div>
<div id="moves" style="display: none">{{Moves}}</div>
<div id="answer" style="display: none">{{Answer}}</div>
<div id="prevMoves" style="display: none">{{PreviousMoves}}</div>
<div id="arrows" style="display: none">{{Arrows}}</div>
<main></main>
<script type="text/javascript">
	var script = document.createElement("script");
    
    /***************************************
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    * !!! UPDATE VERSION HERE !!!
    ****************************************/
	script.src   = "_acv_v1_<**UPDATE VERSION HERE**>.js";
	
    
    document.getElementsByTagName('head')[0].appendChild(script);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function waitForReadyStateAndRun() {
        for (let i = 0; i < 100; i++) {
            await sleep(100);
            if (document.readyState === "complete") {
				var elmApp = Elm.Main.init({
					node: document.querySelector('main'),
                    flags: {
						devicePixelRatio: window.devicePixelRatio,
						answer: document.querySelector('#answer').innerText,
						arrows: document.querySelector('#arrows').innerText,
						fen: document.querySelector('#fen').innerText,
						moves: document.querySelector('#moves').innerText,
                        prevMoves: document.querySelector('#prevMoves').innerText,
						prompt: document.querySelector('#prompt').innerText,
						showAnswer: true
					}});
                break;
            }
        }
    }

    waitForReadyStateAndRun();
    </script>
```