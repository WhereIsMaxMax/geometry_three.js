var AudioBufferCreator = function (context) {
    var analyser = context.createAnalyser();
    analyser.connect(context.destination);
// load the sound
// create a buffer source node
    var audioBuffer;
    var sourceNode = context.createBufferSource();
// and connect to destination
    sourceNode.connect(context.destination);
    sourceNode.connect(analyser);
    loadSound("song.mp3");
// load the specified sound
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        // When loaded decode the data
        request.onload = function() {
            // decode the data
            context.decodeAudioData(request.response, function(buffer) {
                // when the audio is decoded play the sound
                playSound(buffer);
            }, onError);
        };
        request.send();
    }
    function playSound(buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
    }
// log if an error occurs
    function onError(e) {
        console.log(e);
    }

    // var freqs = new Uint8Array(this.analyser.frequencyBinCount);
    // var times = new Uint8Array(this.analyser.frequencyBinCount);

    fFrequencyData = new Float32Array(analyser.frequencyBinCount);
    bFrequencyData = new Uint8Array(analyser.frequencyBinCount);
    bTimeData = new Uint8Array(analyser.frequencyBinCount);
    // Получаем данные
    analyser.getFloatFrequencyData(fFrequencyData);
    analyser.getByteFrequencyData(bFrequencyData);
    analyser.getByteTimeDomainData(bTimeData);
    var bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    function getBuffer() {
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }
};
