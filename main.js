// 🙈🙉🙊 todo: 🙈🙉🙊
// ::vizualization om/another sound
// ::create gui
// :: 
// 🙈🙉🙊

var context;
var audioBuffer;
var sourceNode;
var times;
var analyser;
var processor;
var aspect = window.innerWidth / window.innerHeight;
var shapes_array = [];
var dataArray;


// initSongGUI();
// initSong();
initInputMicrophone();

var controls1, scene, camera, renderer, stats, container, controls;
var counter = 0, sphereCounter = 0, ringCounter = 0;
var maxRadius = 3, radius = 0, circleRadius = 1;

initThree();

for (i = 0; i < 6; i++) {
    addRing();
}
addSphere();



render();
