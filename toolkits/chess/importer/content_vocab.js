function getData() {
    const ids = [
        'word',
        'part',
        'definition',
        'example1',
        'example2',
        'example3',
        'syn_correct',
        'syn_incorrect1',
        'syn_incorrect2',
        'syn_incorrect3',
        'ant_correct',
        'ant_incorrect1',
        'ant_incorrect2',
        'ant_incorrect3'
    ];

    let result = {};

    for (let i = 0; i < ids.length; ++i) {
        result[ids[i]] = document.querySelector('#' + ids[i]).value;
    }

    return result;
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.type == 'import') {
        chrome.runtime.sendMessage({
            'type': 'addVocabNotes',
            'data': getData()
        });
    }
});