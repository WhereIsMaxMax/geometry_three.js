// 🙈🙉🙊 todo: 🙈🙉🙊
// ::vizualization om/another sound
// ::create gui
// :: 
// 🙈🙉🙊

const player = document.getElementById('player');
var context;
var audioBuffer;
var sourceNode;
var freqs;
var times;
var analyser;

initGUI();
// initSong();
initInputMicrophone();

var controls1, scene, camera, renderer, stats, container, controls;
var counter = 0, sphereCounter = 0, ringCounter = 0;
var maxRadius = 3, radius = 0, circleRadius = 1;

initThree();

var aspect = window.innerWidth / window.innerHeight;

render();
