// load the specified sound
function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    // When loaded decode the data
    request.onload = function () {
        // decode the data
        context.decodeAudioData(request.response, function (buffer) {
            // when the audio is decoded play the sound
            playSound(buffer);
        }, onError);
    }
    request.send();
}

function playSound(buffer) {
    sourceNode.buffer = buffer;
    sourceNode.start(0);
}
