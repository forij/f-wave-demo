import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import fshader from '../glsl/template.frag';
import vshader from '../glsl/template.vert';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 1000 );

const light1 = new THREE.DirectionalLight(0xffda6f, 0.1, 10);
light1.position.set(0, 3, 3);
scene.add(light1);

const light3 = new THREE.DirectionalLight(0xaada6f, 0.1, 10);
light3.position.set(0, 3, -3);
scene.add(light3);

const lightContainer1 = new THREE.Group();
scene.add(lightContainer1);

const lightContainer2 = new THREE.Group();
scene.add(lightContainer2);

const light2 = new THREE.PointLight(0x3b43b4, 0.5);
light2.position.set(3,0,0);

const light5 = new THREE.PointLight(0x1afe49, 0.8);
scene.add(light5);

const light4 = new THREE.PointLight(0xde004e, 0.5);
light4.position.set(3,0,3);

lightContainer1.add(light2);
lightContainer2.add(light4);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const uniforms = THREE.UniformsUtils.merge( [
  THREE.UniformsLib[ "common" ],
  THREE.UniformsLib[ "lights" ]
]);

uniforms.u_time = { value: 0 };
uniforms.u_color = { value: new THREE.Color(0xfcfcfc) };
uniforms.u_rim_color = { value: new THREE.Color(0xffffff) };
uniforms.u_rim_strength = { value: 1.6 };
uniforms.u_rim_width = { value: 0.6 };

const geometry = new THREE.TorusKnotGeometry( 1, 0.5, 100, 16 );			
const material = new THREE.ShaderMaterial( {
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader,
  wireframe: false,
  lights: true
} );

// const material = new THREE.MeshPhongMaterial();

// material.onBeforeCompile((shader) => console.log(shader));

const knot = new THREE.Mesh( geometry, material );
scene.add( knot );

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

onWindowResize();
if (!('ontouchstart' in window)) window.addEventListener( 'resize', onWindowResize, false );

const clock = new THREE.Clock();

function onWindowResize( event ) {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  const delta =  clock.getDelta();
  uniforms.u_time.value += delta

  lightContainer1.rotation.y += delta;
  lightContainer2.rotation.y += delta;
  knot.rotation.y = knot.rotation.z += delta / 100;
}
animate();