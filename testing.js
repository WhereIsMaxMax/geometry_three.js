var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;

var boxes = [];
var numBoxes = 9;
for (let x = -numBoxes; x <= numBoxes; x++) {
  for (let y = - numBoxes; y <= numBoxes; y++)
  {
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = x * 1.1;
    cube.position.y = y * 1.1;
    boxes.push(cube);
    scene.add(cube);
  }
}



var controls = new THREE.OrbitControls(camera, renderer.domElement);

var step = 0;

function animate() {

  for (var box of boxes) {
      step += 0.0001;

      var x = box.position.x;
      var y = box.position.y;

      box.position.z = Math.sin(step + Math.sqrt(x*x + y*y));
  }

  controls.update();
  renderer.render( scene, camera );
  requestAnimationFrame( animate );
}
animate();
