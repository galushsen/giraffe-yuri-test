import * as THREE from 'three';

export const building = new THREE.MeshStandardMaterial({
  color: 0xffffff,
} );

export const ground = new THREE.MeshBasicMaterial({
  color: 0x62962E,
} );

export const offset = new THREE.MeshStandardMaterial({
  color: 0x62962E,
} );

export const road = new THREE.MeshStandardMaterial({
  color: 0xD0CDCD,
});

export const boundary = new THREE.LineBasicMaterial( {
  color: 0x000000
} )
