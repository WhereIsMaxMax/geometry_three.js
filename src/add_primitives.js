function addCube() {
    let cubeSize = Math.ceil((Math.random() * 3));
    let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    let cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "cube-" + scene.children.length;

    // position the cube randomly in the scene
    cube.position.x = Math.random() * 2 - 1;
    cube.position.y = Math.random() * 2 - 1;
    cube.position.z = Math.random() * 2 - 1;

    // add the cube to the scene
    scene.add(cube);
    shapes_array.push(cube);
}

//var for shaders
let uniforms = {};

function addSphere() {
    let sphereGeometry = new THREE.SphereGeometry(maxRadius, 20, 25);
    let sphereMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader:   document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphere.castShadow = true;
    sphere.name = "spherePlayer" + sphereCounter;
    scene.add(sphere);
    sphere.geometry.dynamic = true;
    sphereCounter++;
    maxRadius += 5;
    shapes_array.push(sphere);
}

function addRing() {
    let ringGeometry = new THREE.RingGeometry(circleRadius, circleRadius + 0.2, 100);
    let ringMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, wireframe: true });
    let ring = new THREE.Mesh(ringGeometry, ringMaterial);
    circleRadius += 3;
    ring.name = "ring" + ringCounter;
    ringCounter++;
    ring.geometry.dynamic = true;
    scene.add(ring);
    shapes_array.push(ring);
}
