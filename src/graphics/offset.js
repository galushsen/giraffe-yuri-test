import * as THREE from 'three';

export function OffsetContour(offset, contour) {
  	
  let result = [];
  
  offset = new THREE.BufferAttribute(new Float32Array([offset, 0, 0]), 3);
  
  for (let i = 0; i < contour.length; i++) {
    let v1 = new THREE.Vector2().subVectors(contour[i - 1 < 0 ? contour.length - 1 : i - 1], contour[i]);
    let v2 = new THREE.Vector2().subVectors(contour[i + 1 == contour.length ? 0 : i + 1], contour[i]);
    let angle = v2.angle() - v1.angle();
    let halfAngle = angle * 0.5;
    
    const cloneOffset = offsetClone({ v2, halfAngle, offset, contour, i });

    result.push(new THREE.Vector2(cloneOffset.getX(0), cloneOffset.getY(0)));
  }
  

  return result;
}

export function OffsetLine(offset, contour) {
  let result = [];
  offset = new THREE.BufferAttribute(new Float32Array([offset, 0, 0]), 3);
  
  for (let i = 0; i < contour.length; i++) {
    let v1, v2, halfAngle;

    if (i === 0) {
      v2 = new THREE.Vector2().subVectors(contour[i + 1], contour[i]);
      halfAngle = Math.PI * 0.5;
    } else if (i + 1 === contour.length) {
      v1 = new THREE.Vector2().subVectors(contour[i - 1], contour[i]);
      v2 = new THREE.Vector2().subVectors(contour[i], contour[i - 1]);
      halfAngle = Math.PI * 0.5;
    } else {
      v1 = new THREE.Vector2().subVectors(contour[i - 1], contour[i]);
      v2 = new THREE.Vector2().subVectors(contour[i + 1], contour[i]);
      halfAngle = ( v2.angle() - v1.angle() ) * 0.5;
    }
    
    const cloneOffset = offsetClone({ v2, halfAngle, offset, contour, i });

    result.push(new THREE.Vector2(cloneOffset.getX(0), cloneOffset.getY(0)));
  }
  
  return result;
}

function offsetClone({ v2, halfAngle, offset, contour, i }) {
  let hA = halfAngle;
  let tA = v2.angle() + Math.PI * 0.5;
  
  let shift = Math.tan(hA - Math.PI * 0.5);
  let shiftMatrix = new THREE.Matrix4().set(
         1, 0, 0, 0, 
    -shift, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1
  );
  
  let tempAngle = tA;
  let rotationMatrix = new THREE.Matrix4().set(
    Math.cos(tempAngle), -Math.sin(tempAngle), 0, 0,
    Math.sin(tempAngle),  Math.cos(tempAngle), 0, 0,
                      0,                    0, 1, 0,
                      0,                    0, 0, 1
  );

  let translationMatrix = new THREE.Matrix4().set(
    1, 0, 0, contour[i].x,
    0, 1, 0, contour[i].y,
    0, 0, 1, 0,
    0, 0, 0, 1,
  );

  let cloneOffset = offset.clone();

  cloneOffset.applyMatrix4(shiftMatrix);
  cloneOffset.applyMatrix4(rotationMatrix);
  cloneOffset.applyMatrix4(translationMatrix);

  return cloneOffset;
}