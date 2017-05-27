
			var scene, camera, renderer, container, controls;
		  var counter = 0, sphereCounter = 0, ringCounter = 0;
      var maxRadius = 3, ringRadius = 60, circleRadius = 1;

			initThree();
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

          addLights();

          camera.position.set (0, 0, 60);
          camera.lookAt(scene.position);

          addSphere();

          var rings = [];
          rings.push(addRing());
      }

      function addLights() {
          var ambientLight = new THREE.AmbientLight(0x0c0c0c);
          scene.add(ambientLight);

          var spotLight = new THREE.SpotLight( 0xffffff );
          spotLight.position.set( 0, 0, 270 );
          spotLight.castShadow = true;
          scene.add( spotLight );

          var spotLightBack = new THREE.SpotLight( 0xffffff );
          spotLightBack.position.set( 0, 0, -270 );
          spotLightBack.castShadow = true;
          scene.add( spotLightBack );
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
          var sphereGeometry = new THREE.SphereGeometry (70, 20, 25);
          var sphereMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff, wireframe: true });
          var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          // var centerSphere = new THREE.Vector3( 0, 0, 0 );
          sphere.castShadow = true;
          sphere.name = "spherePlayer"+sphereCounter;
          scene.add(sphere);
//	            sphere.geometry.dynamic = true;
      }

      function addRing(){
          var ringGeometry = new THREE.RingGeometry(ringRadius, ringRadius+5, 100);
          var ringMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, wireframe: true });
          var ring = new THREE.Mesh(ringGeometry, ringMaterial);
          // circleRadius+=3;
          ring.name = "ring"+ringCounter;
          ringCounter++;
          ring.geometry.dynamic = true;
          scene.add (ring);
          return ring;
      }

      function render() {
          renderer.render(scene, camera);
          requestAnimationFrame( render );

          // Moving objects
          counter+=1 ;
          scene.traverse(function(e) {
//	                if (e.name.substring(0,4) === "sphe") {
//						e.scale.set (radius, radius, radius);
//	                }
              if (e.name.substring(0,4) === "cube") {
                  e.rotation.x+=0.1;
                  e.rotation.y+=0.1;

                  e.position.z+=e.position.z/30;
                  e.position.x+=e.position.x/30;
                  e.position.y+=e.position.y/30;

                  if ((e.position.z>60||e.position.z<-60)||(e.position.x>60||e.position.x<-60)||(e.position.y>60||e.position.y<-60)){
                      scene.remove (e);
                      // renderer.deallocateObject( e );
                  }
              }
          });

          if (scene.children.length<70){
              if(counter%3==0){
                  addCube();
              }
          }
          controls.update();
      }