import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js"

window.THREE = THREE;
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshStandardMaterial({
map: loader.load("./assets/textures/earthmap1k.jpg")

});

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightMat = new THREE.MeshBasicMaterial({
    blending: THREE.AdditiveBlending,
    map: loader.load("./assets/textures/earthlights1k.jpg"),    
})

const lightMesh = new THREE.Mesh(geometry, lightMat);
earthGroup.add(lightMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./assets/textures/earthbump1k.jpg"),
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
}) 

const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.01);
earthGroup.add(cloudsMesh);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

// const hemiLight = new THREE.HemisphereLight();
// scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate(){
    requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.002;
    lightMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();