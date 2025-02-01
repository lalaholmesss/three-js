import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight; 
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75; // degree;
const aspect = w / h;
const near = 0.1; // when it starts rendering - anything closer won't be rendered;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement); // so that we can move / zoom into the object
controls.enableDamping = true; 
controls.dampingFactor = 0.05; // how fast the object moves after we mouseup (inertia of the obj)


const geo = new THREE.IcosahedronGeometry(0.5, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0xfffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffff,
    wireframe: true,
})

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001) // the ratio of the wireMesh to the geo, if we increase this, the amount of faces won't change
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa550, 1);
// scene.add(hemiLight);

const ambientLights = new THREE.AmbientLight(0xffffff, 0.5); // light in all directions to every object - omnidirectional
// scene.add(ambientLights);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // sun - like effect, by default light hits from the above
scene.add(directionalLight);

function animate(t = 0){
    requestAnimationFrame(animate);
    // mesh.rotation.y = t * 0.0007;
    // mesh.rotation.x = t * 0.0005;
    renderer.render(scene, camera);
    controls.update();
}

animate();
