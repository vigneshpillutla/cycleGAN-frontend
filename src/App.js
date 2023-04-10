import { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import DisplayResult from './components/DisplayResult';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [state, setState] = useState({
    loading: false,
    uploaded: false,
    imageData: {
      source: {
        type: 'CT',
        url: 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg'
      },
      target: {
        type: 'MRI',
        url: 'https://images01.military.com/sites/default/files/styles/full/public/2019-09/MightyStocklead1200.jpg'
      }
    }
  });

  const convertImage = async (sourceScan, sourceType) => {
    let formData = new FormData();
    formData.append('file', sourceScan);
    formData.append('type', sourceType);
    console.log(formData.entries);

    setState((prev) => ({ ...prev, loading: true }));

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      body: formData
    });

    const convertedType = {
      CT: 'MRI',
      MRI: 'CT'
    };

    // For json response, base64 encoded
    const data = await response.json();
    setState({
      loading: false,
      uploaded: true,
      imageData: {
        source: {
          type: sourceType,
          url: `${URL.createObjectURL(sourceScan)}`
        },
        target: {
          type: convertedType[sourceType],
          url: `data:image/png;base64, ${data.image}`
        }
      }
    });
  };

  if (state.loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <header className="App-header">
        {state.uploaded ? (
          <DisplayResult imageData={state.imageData} />
        ) : (
          <ImageUploader convertImage={convertImage} />
        )}
      </header>
    </div>
  );
}

export default App;
