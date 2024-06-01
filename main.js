import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import GUI from "lil-gui";
// const gui = new GUI();
// import typefaceFont from "./public/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// Creating Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");

// Fonts
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Deepthi", {
    font: font,
    size: 8,
    depth: 3,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // Centering the text
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  // );

  // Centering the text easy way
  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  const text = new THREE.Mesh(textGeometry, material);

  const x = 0,
    y = 0;

  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  const heartGeometry = new THREE.ShapeGeometry(heartShape);
  material.side = THREE.DoubleSide;

  for (let i = 0; i < 300; i++) {
    const heart = new THREE.Mesh(heartGeometry, material);
    heart.position.x = (Math.random() - 0.5) * 280;
    heart.position.y = (Math.random() - 0.5) * 280;
    heart.position.z = (Math.random() - 0.5) * 280;

    heart.rotation.x = Math.random() * Math.PI;
    heart.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    heart.scale.set(scale, scale, scale);

    scene.add(heart);
  }

  scene.add(text);
});

// Size and Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 50;

// Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// FullScreen
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Resizing
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation
const tick = () => {
  window.requestAnimationFrame(tick);
  controls.update();
  renderer.render(scene, camera);
};
tick();
