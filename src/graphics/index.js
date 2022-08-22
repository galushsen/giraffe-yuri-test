

import * as THREE from 'three';
import { OrbitControls } from './controls';
import { drawBuilding, drawLot, drawRoad } from './draw';


let geo, setbacks, maxHeight, renderer, scene, camera, mouse, raycaster;

export function start(geoData) {
  geo = geoData;
  init();
  animate();
}

export function update(setbacksData, heightData) {
  setbacks = setbacksData;
  maxHeight = heightData;
  
  scene.children.forEach((child, i) => {
    child.type === 'Group' && scene.remove(scene.children[i]);
  })

  const group = new THREE.Group();
  scene.add( group );
  addGeoObjects( group );
}



function init() {
  const container = document.getElementById( 'visual-container' );

  THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 150, 200, 150 );
  camera.up.set(0,0,1);
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf2f2f2 );

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
  directionalLight.position.set( 1000, 1000, 1500 ).normalize();
  scene.add( directionalLight );

  const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
  scene.add( ambientLight );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 100;
  controls.maxDistance = 1000;

  window.addEventListener( 'resize', onWindowResize );

  // raycaster = new THREE.Raycaster();
  // mouse = new THREE.Vector2();
  // window.addEventListener( 'pointerdown', onPointerDown );
}


const addGeoObjects = function ( group ) {
  geo.forEach(feature => {
    const type = feature.geometry.type;

    if (type === 'Polygon' && feature.properties.usage === 'Context') {
      let depth = feature.properties.levels * 3  || 0;

      if (maxHeight) {
        depth = depth < maxHeight ? depth : maxHeight;
      }

      drawBuilding({ feature, group, depth, setbacks });
      return;
    }

    if (type === 'Polygon') {
      drawLot({ feature, group, setbacks });
      return;
    }

    if (type === 'LineString') {
      drawRoad({ feature, group });
      return;
    }
  });
};

// function onPointerDown( event ) {
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//   raycaster.setFromCamera( mouse, camera );
//   const intersects = raycaster.intersectObjects( scene.children );
//   if ( intersects.length > 0 ) {
//     const object = intersects[ 0 ].object;
//     console.log(object);
//   }
// }

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.render( scene, camera );
}