/* PARAMETERS */
var Y = 1;
var Z = 10;

var baseColor = 0x000000;
var lightColor = 0xffffff;
var meshColor = 0x777777;

var camera, controls, scene, renderer, lighting, ambient, keyLight, fillLight, backLight, geometry,material,mesh;
/* CHECK IF CAN DISPLAY */  
if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
        }

renderer = new THREE.WebGLRenderer({canvas: document.getElementById("cnv"), antialias: true});
renderer.setClearColor(baseColor);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 9000);
camera.position.z = Z;
//camera.position.y = Y;

lighting = new THREE.PointLight(lightColor, 0.9);
lighting.position.set(9000,30,-2000,0);
ambient = new THREE.AmbientLight(lightColor, 0.1);

scene = new THREE.Scene();

geometry = new THREE.CubeGeometry(1000,1000,1000);
material = new THREE.MeshLambertMaterial({color: meshColor, map: new THREE.TextureLoader().load('assets/text.jpg')});
mesh = new THREE.Mesh(geometry,material);
mesh.position.set(0,0,-2000,0);
mesh.rotation.x +=0.5;
mesh.rotation.y +=0.5;

geometry2 = new THREE.CubeGeometry(1000,1000,1000);
material2 = new THREE.MeshLambertMaterial({color: 0xf0afb0});
mesh2 = new THREE.Mesh(geometry2,material2);
mesh2.position.set(200,0,-2000,0);
mesh2.rotation.x -=0.5;
mesh2.rotation.y +=0.5;

//scene.add(mesh);
//scene.add(mesh2);
scene.add(lighting);
scene.add(ambient);

renderer.render (scene,camera);

controls = new THREE.TrackballControls( camera );


// instantiate a loader
var loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'assets/budda.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);



/*controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.4;
            controls.enableZoom = false;*/

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

animate();