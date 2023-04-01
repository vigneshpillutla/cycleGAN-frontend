import { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';

function App() {
  const [state, setState] = useState({
    loading: false,
    uploaded: false,
    imageURL: null
  });

  const convertImage = async (sourceScan) => {
    debugger;
    let formData = new FormData();
    formData.append('file', sourceScan);
    console.log(formData.entries);

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      body: formData
    });

    // For binary image response
    // const data = await response.blob();
    // console.log(data);
    // console.log(URL.createObjectURL(data));
    // setState({
    //   loading: false,
    //   uploaded: true,
    //   imageURL: `${URL.createObjectURL(data)}`
    // });

    // For json response, base64 encoded
    const data = await response.json();
    console.log(data);
    setState({
      loading: false,
      uploaded: true,
      imageURL: `data:image/jpeg;base64, ${data.image}`
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {state.imageURL ? (
          <>
            <img src={state.imageURL} alt="" />
            <a href={state.imageURL} download="scan.jpg">
              Download
            </a>
          </>
        ) : (
          <ImageUploader convertImage={convertImage} />
        )}
      </header>
    </div>
  );
}

export default App;
