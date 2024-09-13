import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';

export default function QRScanner (props) {

  const webcamRef = React.useRef(null);
  const [facingMode, setFacingMode] = useState("environment"); // "environment" for back camera, "user" for front camera
  const switchCamera = () => {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  };

  return (
      <div style={{ width: '100%', margin: 'auto' }}>
          <button onClick={switchCamera}>Switch Camera</button>

      <QrReader
        facingMode={facingMode}
        onResult={async (result, error) => {
          if (!!result) {
            props.setQrcodereg(result.text);
          }
          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      </div>
  );
};

