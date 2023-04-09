import React, { useState } from 'react';

const DisplayResult = (props) => {
  const { imageData } = props;

  const { source, target } = imageData;
  return (
    <>
      <div className="result-container">
        <div className="result">
          <h3>{source.type}</h3>
          <img src={source.url} alt="" />
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/545/545682.png"
          alt=""
          style={{
            width: '50px',
            height: '50px'
          }}
        />
        <div className="result">
          <h3>{target.type}</h3>
          <img src={target.url} alt="" />
          <button className="action-btn">
            <a
              href={target.url}
              download="scan.jpg"
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Download
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayResult;
