import React, { useRef, useState } from 'react';

const ImageUploader = (props) => {
  const { convertImage } = props;
  const fileUploadRef = useRef();

  const [state, setState] = useState({
    file: null,
    url: null,
    type: 'CT'
  });

  const handleBrowse = () => {
    fileUploadRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setState((prev) => ({
      ...prev,
      file,
      url: URL.createObjectURL(file)
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setState((prev) => ({
      ...prev,
      file,
      url: URL.createObjectURL(file)
    }));
  };

  const handleTypeChange = (e) => {
    setState((prev) => ({
      ...prev,
      type: e.target.value
    }));
  };

  return (
    <>
      <div
        className="image-upload-container"
        // onDragOver={() => alert('over')}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {state.file ? (
          <img
            style={{ width: '100%', height: '350px', objectFit: 'contain' }}
            src={state.url}
            alt=""
          />
        ) : (
          <div className="container-border">
            <p
              style={{
                color: '#537AA1',
                fontSize: '1.3rem'
              }}
            >
              Drop your image here, or{' '}
            </p>
            <p
              style={{
                fontSize: '1.3rem',
                fontStyle: 'bold',
                color: '#3491FF',
                textIndent: '0.5em',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={handleBrowse}
            >
              browse
            </p>
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              title=""
              value=""
              style={{ display: 'none' }}
              ref={fileUploadRef}
              onChange={handleFileChange}
            />
          </div>
        )}
        {state.file && (
          <>
            <select value={state.type} onChange={handleTypeChange}>
              <option value="CT">CT</option>
              <option value="MRI">MRI</option>
            </select>
            <br />
            <button
              className="action-btn"
              onClick={() => convertImage(state.file, state.type)}
            >
              Convert
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
