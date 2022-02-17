# Anki Chess Visualizer Installation Guide

## Create ACV-v1 Note Type
1. Download "\_acv\_v1\_*.js" (e.g. "\_acv\_v1\_220208\_2952.js") from the [latest Anki Chess Toolkit release](https://github.com/eulerphi/anki/releases/latest)
1. Copy "\_acv\_v1\_*.js" to your [Anki profile's media folder](https://docs.ankiweb.net/files.html#file-locations)
    1. **NOTE**: The underscore prefix in the file name tells Anki to "ignore" the file (i.e. Anki won't clean it up).
1. Open Anki
1. Create a note type (i.e. Tools | Manage Note Types | Add)
1. Select "Add: Basic"
1. Name the note type "ACV-v1"
    1. **WARNING**: Anki Chess Importer is hardcoded to look for this name. If you name it something else, ACI won't work.
1. Click Ok

## Set up Fields
1. Select "ACV-v1" from the list of note types and click "Fields..."
1. Rename "Front" as "Puzzle"
1. Rename "Back" as "Prompt"
1. Add fields "Answer", "Arrows", and "Source"
1. There should now be 5 fields
1. Click Save

## Set up Cards
1. Select "ACV-v1" from the list of note types and click "Cards..."
1. Replace the front template and back templates
    1. **WARNING**: You must update the front template to point at your specific "_acv_v1_*.js" file. The script won't load otherwise.
1. Click Save

## Front Template:
```
<main></main>
<script type="text/javascript">
    async function load(fileName) {
        delete window.Elm;

        var script = document.createElement('script');
        script.src   = fileName;
        document.querySelector('head').appendChild(script);

        while (typeof Elm === 'undefined') {
            await new Promise(r => setTimeout(r, 100));
        }
    }

    function init() {
        Elm.Main.init({
            node: document.querySelector('main'),
            flags: {
                devicePixelRatio: window.devicePixelRatio,
                answer: '{{text:Answer}}',
                arrows: '{{text:Arrows}}',
                puzzle: '{{Puzzle}}',
                prompt: '{{Prompt}}',
                showAnswer: !!document.querySelector('#backside')
            }});
    }
    
    /***************************************
         !!! UPDATE VERSION HERE !!!
    ****************************************/
    load('_acv_v1_<**UPDATE VERSION HERE**>.js').then(init);
</script>
```


## Back Template:
```
<div id='backside' style='display: hidden'></div>
{{FrontSide}}
```