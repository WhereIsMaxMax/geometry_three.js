function initSongGUI() {
    var button = document.createElement("button");
    button.innerHTML = "Do Something";

    // 2. Append somewhere
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);

    // 3. Add event handler
    button.addEventListener("click", function () {
        loadSound("song.ogg");
    });
}

function initSong() {
    context = new AudioContext();
    analyser = context.createAnalyser();
    analyser.connect(context.destination);

    // load the sound
    // create a buffer source node
    sourceNode = context.createBufferSource();
    // and connect to destination
    sourceNode.connect(context.destination);
    sourceNode.connect(analyser);

    freqs = new Uint8Array(this.analyser.frequencyBinCount);
    times = new Uint8Array(this.analyser.frequencyBinCount);
    // fFrequencyData = new Float32Array(analyser.frequencyBinCount);
    // bFrequencyData = new Uint8Array(analyser.frequencyBinCount);
    // bTimeData = new Uint8Array(analyser.frequencyBinCount);
    // // Получаем данные
    // analyser.getFloatFrequencyData(fFrequencyData);
    // analyser.getByteFrequencyData(bFrequencyData);
    // analyser.getByteTimeDomainData(bTimeData);
    // var bufferLength = analyser.frequencyBinCount;
    // var dataArray = new Uint8Array(analyser.frequencyBinCount);
    // analyser.getByteFrequencyData(dataArray);
}

function initInputMicrophone() {

    const handleSuccess = function (stream) {
        if (window.URL) {
            player.srcObject = stream;
        } else {
            player.src = stream;
        }

        context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        analyser = context.createAnalyser();
        source.connect(analyser);
        source.connect(processor);
        processor.connect(context.destination);
        processor.onaudioprocess = function (e) {
            // Do something with the data, e.g. convert it to WAV
            console.log(e.inputBuffer);
        };
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(handleSuccess);
}

function initLight() {
  var ambientLight;
  var spotLight;
  var spotLightBack;

  ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 270);
  spotLight.castShadow = true;
  scene.add(spotLight);

  spotLightBack = new THREE.SpotLight(0xffffff);
  spotLightBack.position.set(0, 0, -270);
  spotLightBack.castShadow = true;
  scene.add(spotLightBack);
}

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight, 0.1, 1000);

    controls = new THREE.TrackballControls(camera);
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    // ERROR
    // controls.keys = [ 65, 83, 68 ];
    // controls.addEventListener( 'change', render );

    renderer = new THREE.WebGLRenderer({ antialias: false});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    initLight();

    camera.position.set(0, 0, 60);
    camera.lookAt(scene.position);

    //         this.removeCube = function() {
    //       var allChildren = scene.children;
    //    			var lastObject = allChildren[allChildren.length-1];
    //             if (lastObject instanceof THREE.Mesh) {
    //                 scene.remove(lastObject);
    //                 this.numberOfObjects = scene.children.length;
    //             }
    //         }


    //         this.outputObjects = function() {
    //             console.log(scene.children);
    //         }
    //     }

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild(stats.domElement);

    for (i = 0; i < 6; i++) {
        addRing();
    }
    addSphere();
}
