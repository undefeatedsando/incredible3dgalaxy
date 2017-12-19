  if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
        }
        var container;
        var camera, controls, scene, renderer;
        var lighting, ambient, keyLight, fillLight, backLight;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        init();
        animate();

        function init() {
            container = document.createElement('div');
            document.body.appendChild(container);
            /* Camera */
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 10;
            camera.position.y = 20;

            /* Scene */
            scene = new THREE.Scene();
            lighting = false;
            ambient = new THREE.AmbientLight(0xff00ff, 1.0);
            scene.add(ambient);
            /* Model */
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setBaseUrl('assets/');
            mtlLoader.setPath('assets/');
            var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};
            var textureLoader = new THREE.TextureLoader( manager );
            var texture = textureLoader.load( "assets/text.jpg" );
            /*mtlLoader.load('budda.mtl', function (materials) {
                materials.preload();
                //materials.materials.default = THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
                //materials.materials.default.map.minFilter = THREE.LinearFilter;*/
                var objLoader = new THREE.OBJLoader();
                //objLoader.setMaterials(materials);
                objLoader.setPath('assets/');
                objLoader.load('budda.obj', function (object) {
                    scene.add(object);
                    if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
                    console.log("Budda added");
                });
            
             /* light */
            // LIGHTBULB
				var lightSphereGeometry = new THREE.SphereGeometry( 0.09 );
				var lightSphereMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(255,255,255)' } );
				lightSphere = new THREE.Mesh( lightSphereGeometry, lightSphereMaterial );
				scene.add( lightSphere );
				lightSphere.visible = true;
            
            /* Renderer */
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
            container.appendChild(renderer.domElement);
            /* Controls */
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = false;
            /* Events */
            window.addEventListener('resize', onWindowResize, false);
            window.addEventListener('keydown', onKeyboardEvent, false);
        }
        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function onKeyboardEvent(e) {
            if (e.code === 'KeyL') {
                lighting = !lighting;
                if (lighting) {
                    ambient.intensity = 0.25;
                    scene.add(keyLight);
                    scene.add(fillLight);
                    scene.add(backLight);
                } else {
                    ambient.intensity = 1.0;
                    scene.remove(keyLight);
                    scene.remove(fillLight);
                    scene.remove(backLight);
                }
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            render();
        }
        function render() {
            renderer.render(scene, camera);
        }
