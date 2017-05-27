var scene, camera, renderer, stats, controls;
var counter = 0, sphereCounter = 0, ringCounter = 0;
var radius = 0, ringRadius = 20;

initThree();
var gameControlle = new GameController;
var context = new AudioContext();
audioBufferCreator = new AudioBufferCreator(context);
render();

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75,
        window.innerWidth/window.innerHeight, 0.1, 1000 );
    controls = new THREE.TrackballControls( camera );

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    renderer = new THREE.WebGLRenderer({ antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // var axisHelper = new THREE.AxisHelper( 5 );
    // scene.add( axisHelper );

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0, 0, 270 );
    spotLight.castShadow = true;
    scene.add( spotLight );

    var spotLightBack = new THREE.SpotLight( 0xffffff );
    spotLightBack.position.set( 0, 0, -270 );
    spotLightBack.castShadow = true;
    scene.add( spotLightBack );

    camera.position.set(0, 0, 60);
    camera.lookAt(scene.position);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

    var sphere = addSphere();

    var lines = [];

    for (i=0; i<24; i++){
        var k = -12;
        x = 0;
        y = -5;
        z = 60;
        addLine(x, y, z, i+k);
        // addRing();
    }
}

function addLine(x, y, z, i) {
    // console.log("line_coordinates "+x+" "+y+" "+z+" "+i);
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( x+i, y, -60 ),
        new THREE.Vector3( x+i, y, z )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    console.log("line "+line.geometry.vertices);
    return line;
}

function addCube() {
    var cubeSize = Math.ceil((Math.random() * 3));
    var cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "cube-" + scene.children.length;

    // position the cube randomly in the scene
    cube.position.x= Math.random()*2-1;
    cube.position.y= Math.random()*2-1;
    cube.position.z= Math.random()*2-1;

    // add the cube to the scene
    scene.add(cube);
    this.numberOfObjects = scene.children.length;
}

function addSphere(){
    var sphereGeometry = new THREE.SphereGeometry (radius, 20, 25);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff, wireframe: true });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // var centerSphere = new THREE.Vector3( 0, 0, 0 );
    sphere.castShadow = true;
    sphere.name = "spherePlayer"+sphereCounter;
    scene.add(sphere);
    sphere.geometry.dynamic = true;
    return sphere;
}

function addRing(){
    var ringGeometry = new THREE.RingGeometry(ringRadius, ringRadius+1, 100);
    var ringMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, wireframe: true });
    var ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.name = "ring"+ringCounter;
    ringCounter++;
    ring.geometry.dynamic = true;
    scene.add (ring);
}

function render () {
    renderer.render(scene, camera);
    requestAnimationFrame( render );

    dataArray = audioBufferCreator.getBuffer();
    var width = dataArray.length;
    var sum = 0;
    for(var i = 0; i < width; i++){
        sum	+= dataArray[i];
    }
    var amplitude	= sum / (width*256-1);
    radius = 0.1 + amplitude;

    // for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    //     var value = freqs[i];
    //     var percent = value / 256;
    //     var height = 30 * percent;
    //     var offset = 30 - height - 1;
    //     var barWidth = 25/this.analyser.frequencyBinCount;
    //     var hue = i/this.analyser.frequencyBinCount * 360;
    //     drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    //     drawContext.fillRect(i * barWidth, offset, barWidth, height);
    //   }

    // console.log(dataArray);

    // Moving objects
    counter+=1 ;
    scene.traverse(function(object) {
        if (object.name.substring(0,4) === "sphe") {
            object.scale.set (radius, radius, radius);
            object.material.color.setHex(  Math.random() * 0xffffff, Math.random() * 0xffffff, Math.random() * 0xffffff);
        }
        if (object.name.substring(0,4) === "cube") {
            object.rotation.x+=0.1;
            object.rotation.y+=0.1;

            object.position.z+=object.position.z/30;
            object.position.x+=object.position.x/30;
            object.position.y+=object.position.y/30;

            if ((object.position.z>60||object.position.z<-60)||(object.position.x>60||object.position.x<-60)||(object.position.y>60||object.position.y<-60)){
                scene.remove (object);
                // renderer.deallocateObject( e );
            }
        }
        if(object.name.substring(0, 4) === "ring"){
            if(object.position.z>60){
                scene.remove(object);
            }else {
                object.position.z+=0.1;
            }
        }
    });

    if (scene.children.length<70){
        if(counter%10==0){
            addRing();
            addCube();
        }
    }

    stats.update();
    controls.update();
}