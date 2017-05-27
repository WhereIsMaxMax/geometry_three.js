var AudioBufferCreator = function (context) {
    var analyser = context.createAnalyser();
    var sourceNode = context.createBufferSource();
    analyser.connect(context.destination);
    sourceNode.connect(context.destination);
    sourceNode.connect(analyser);

    loadSound("assets/mp3/2.mp3");

    var fFrequencyData = new Float32Array(analyser.frequencyBinCount);
    var bFrequencyData = new Uint8Array(analyser.frequencyBinCount);
    var bTimeData = new Uint8Array(analyser.frequencyBinCount);

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

    function onError(e) {
        console.log(e);
    }
    
    this.getBuffer = function(){
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }
};
