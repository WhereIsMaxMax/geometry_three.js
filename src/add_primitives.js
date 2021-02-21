function addCube() {
    var cubeSize = Math.ceil((Math.random() * 3));
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "cube-" + scene.children.length;

    // position the cube randomly in the scene
    cube.position.x = Math.random() * 2 - 1;
    cube.position.y = Math.random() * 2 - 1;
    cube.position.z = Math.random() * 2 - 1;

    // add the cube to the scene
    scene.add(cube);
    this.numberOfObjects = scene.children.length;
}

function addSphere() {
    var sphereGeometry = new THREE.SphereGeometry(maxRadius, 20, 25);
    var sphereMaterial = new THREE.ShaderMaterial({
      vertexShader:   document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphere.castShadow = true;
    sphere.name = "spherePlayer" + sphereCounter;
    scene.add(sphere);
    sphere.geometry.dynamic = true;
    sphereCounter++;
    maxRadius += 5;
}

function addRing() {
    var ringGeometry = new THREE.RingGeometry(circleRadius, circleRadius + 0.2, 100);
    var ringMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, wireframe: true });
    var ring = new THREE.Mesh(ringGeometry, ringMaterial);
    circleRadius += 3;
    ring.name = "ring" + ringCounter;
    ringCounter++;
    ring.geometry.dynamic = true;
    scene.add(ring);
}
