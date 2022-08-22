import { useEffect, useState, useCallback } from 'react';
import { getGeo } from '../api/getGeo';
import proj4 from 'proj4';

function useGetGeo() {

  const [geo, setGeo] = useState(null);

  const fetchGeo = useCallback(async (abort) => {
    const geoResponse = await getGeo();
    const features = geoResponse?.features;

    const calc = { x: 0, y: 0, length: 0 };

    const convertData = data => {
      const cartesian = proj4('EPSG:4326', 'EPSG:3857', data);
      calc.x += cartesian[0];
      calc.y += cartesian[1];
      calc.length++;
      return cartesian;
    }

    const converted = features.map((feature) => {
      const type = feature.geometry.type;

      feature.geometry.coordinates = feature.geometry.coordinates.map(data => {
        if (type === 'LineString') {
          return convertData(data);
        }

        return data.map(insideData => {
          return convertData(insideData);
        })
      })

      return feature;
    });

    const center = [ calc.x / calc.length, calc.y / calc.length ];
    const moveToCenter = data => {
      return [data[0] - center[0], data[1] - center[1]];
    }

    const centered = converted.map((feature) => {
      const type = feature.geometry.type;

      feature.geometry.coordinates = feature.geometry.coordinates.map(data => {
        if (type === 'LineString') {
          return moveToCenter(data);
        }

        return data.map(insideData => {
          return moveToCenter(insideData);
        })
      })

      return feature;
    })

    !abort && setGeo(centered);  
  }, [setGeo])
  

  useEffect(() => {
    let abort = false;

    if (setGeo) {
      fetchGeo(abort);
    }
    
    return () => {
      abort = true;
    }
  }, [setGeo]);


  return {
    geo
  };
}

export default useGetGeo;
