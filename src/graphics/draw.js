import * as THREE from 'three';
import * as materials from './materials';
import { OffsetContour, OffsetLine } from './offset';


export function drawBuilding({ feature, group, depth, setbacks }) {
  const contour = feature.geometry.coordinates[0].map(([x, y]) => {
    return new THREE.Vector2( x, y );
  })

  contour.pop(); // remove duplicated last point
  let points = OffsetContour(setbacks.front || 0, contour);
  const offsetShape = new THREE.Shape();

  points.forEach(({x, y}, i) => {
    if (i === 0) {
      offsetShape.moveTo( x, y );
    }

    offsetShape.lineTo( x, y );
  })

  const geometry = new THREE.ExtrudeGeometry( offsetShape, {
    depth: depth
  } );

  const mesh = new THREE.Mesh( geometry, materials.building );
  group.add( mesh );
}


export function drawLot({ feature, group, setbacks }) {
  const shape = new THREE.Shape();

  feature.geometry.coordinates[0].forEach(([x, y], i) => {
    if (i === 0) {
      shape.moveTo( x, y );
    }

    shape.lineTo( x, y );
  });

  const contour = feature.geometry.coordinates[0].map(([x, y]) => {
    return new THREE.Vector2( x, y );
  });

  contour.pop(); // remove duplicated last point
  let points = OffsetContour(setbacks.front || 0, contour);
  const offsetShape = new THREE.Shape();

  points.forEach(({x, y}, i) => {
    if (i === 0) {
      offsetShape.moveTo( x, y );
    }

    offsetShape.lineTo( x, y );
  })

  const offsetGeometry = new THREE.ExtrudeGeometry( offsetShape, {
    depth: 0.2
  } );

  const offMesh = new THREE.Mesh( offsetGeometry, materials.offset );
  group.add( offMesh );

  const geometry = new THREE.ShapeGeometry( shape, {
  } );

  const mesh = new THREE.Mesh( geometry, materials.ground );
  group.add( mesh );

  const edges = new THREE.EdgesGeometry( geometry );
  const line = new THREE.LineSegments( edges, materials.boundary );

  group.add( line );
}


export function drawRoad({ feature, group }) {
  const points = feature.geometry.coordinates.map(([x, y]) => {
    return new THREE.Vector2( x, y );
  });

  const offPoints = OffsetLine(3, points);
  const offPoints2 = OffsetLine(-3, points);

  const offsetShape = new THREE.Shape();

  offPoints.forEach(({x, y}, i) => {
    if (i === 0) {
      offsetShape.moveTo( x, y );
    }

    offsetShape.lineTo( x, y );
  });

  offPoints2.reverse().forEach(({x, y}, i) => {
    offsetShape.lineTo( x, y );
  });

  const geometry = new THREE.ShapeGeometry( offsetShape, {
    depth: 0.1
  } );

  const mesh = new THREE.Mesh( geometry, materials.road );
  group.add( mesh );
}