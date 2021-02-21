// 🙈🙉🙊 todo: 🙈🙉🙊
// ::vizualization om/another sound
// ::create gui
// :: 
// 🙈🙉🙊

var context;
var audioBuffer;
var sourceNode;
var freqs;
var times;
var analyser;

// initSongGUI();
// initSong();
initInputMicrophone();

var controls1, scene, camera, renderer, stats, container, controls;
var counter = 0, sphereCounter = 0, ringCounter = 0;
var maxRadius = 3, radius = 0, circleRadius = 1;

initThree();

const material = new THREE.LineBasicMaterial( { color: 0x00ffff } );
const lines = []

function fragmentShader(){
  return `
    precision highp float;
    uniform vec2 res;
    uniform float aspect;
    float mandelbrot(vec2 c){
      float alpha = 1.0;
      vec2 z = vec2(0.0 , 0.0);
      for(int i=0; i < 200; i++){  // i < max iterations
        float x_sq = z.x*z.x;
        float y_sq = z.y*z.y;
        vec2 z_sq = vec2(x_sq - y_sq, 2.0*z.x*z.y);
        z = z_sq + c;
        if(x_sq + y_sq > 4.0){
          alpha = float(i)/200.0;
          break;
        }
      }
      return alpha;
    }
  void main(){
    vec2 uv = 4.0 * vec2(aspect, 1.0) * gl_FragCoord.xy / res -2.0*vec2(aspect, 1.0);
    float s = 1.0 - mandelbrot(uv);
    vec3 coord = vec3(s, s, s);
    gl_FragColor = vec4(pow(coord, vec3(7.0, 8.0, 5.0)), 1.0);
    }
  `
}

var aspect = window.innerWidth / window.innerHeight;

uniforms = {
  res: {type: 'vec2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
  aspect: {type: 'float', value: aspect}
};

const geometry = new THREE.PlaneBufferGeometry(20, 20);
const material_1 = new THREE.ShaderMaterial({
  fragmentShader: fragmentShader(),
  uniforms: uniforms
});

mesh = new THREE.Mesh(geometry, material_1);
scene.add(mesh);

render();
