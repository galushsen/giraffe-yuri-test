import { useEffect } from 'react';
import useGetGeo from '../../hooks/useGetGeo';
import { start, update } from '../../graphics/index';

function ViewPort({ setbacks, maxHeight }) {

  const { geo } = useGetGeo();

  useEffect(() => {  
    if (geo) {
      start(geo);
    }
  }, [geo]);

  useEffect(() => {  
    if (geo && setbacks) {
      update(setbacks, maxHeight);
    }
  }, [geo, setbacks, maxHeight]);

  return (
    <div id='visual-container'></div>
  );
}

export default ViewPort;
