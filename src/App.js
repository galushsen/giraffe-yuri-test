import { useDeferredValue, useState } from 'react';
import Form from './components/Form';
import ViewPort from './components/ViewPort'

function App() {
  const [front, setFront] = useState(0);
  const [side, setSide] = useState(0);
  const [rear, setRear] = useState(0);
  const [height, setHeight] = useState(0);

  const changeHandler = inputName => {
    return (event) => {
      const val = parseInt(event.target.value);

      switch (inputName) {
        case 'front':
          setFront(val);
          break;
        case 'side':
          setSide(val);
          break;
        case 'rear':
          setRear(val);
          break;
        case 'maxheight':
          setHeight(val);
          break;
        default:
          break;
      }
    }
  }

  const setbacks = useDeferredValue({front, side, rear});
  const maxheight = useDeferredValue(height);

  return (
    <div className='App'>
      <Form changeHandler={changeHandler}/>
      <ViewPort setbacks={setbacks} maxHeight={maxheight}/>
    </div>
  );
}

export default App;
