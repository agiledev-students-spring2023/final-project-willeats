import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserQRCodeReader, NotFoundException } from '@zxing/library';

function QRScanner() {
  const [scannedData, setScannedData] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const url = window.location.href;
  const urlParts = url.split('/');
  console.log(urlParts)
  urlParts.splice(3,1,'getmenu/6444893a4f71daabbde15f35')
  console.log(urlParts)
  const newUrl = urlParts.join("/")
  console.log(newUrl)
  

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
      if (result) {
        setScannedData(result.getText());
      } else if (error && !(error instanceof NotFoundException)) {
        console.error(error);
      }
    });
  }, []);
  

  useEffect(() => {
    if (scannedData) {
      try {
        console.log(typeof(scannedData));
        window.location.href = scannedData;
      } catch (error) {
        console.error("Error navigating to scanned data:", error);
        // You can show an error message to the user or handle this error differently
      }
    }
  }, [scannedData]);
  
  

  const navigateBack = () => {
    navigate('/');
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={navigateBack}>Back to Home</button>
      {scannedData ? (
        <div>
          <p>Scanned data: {scannedData}</p>
          <button className="btn btn-primary" onClick={() => setScannedData(null)}>Scan Again</button>
        </div>
      ) : (
        <div>
          <h1>Scan QR Code</h1>
          <video ref={videoRef} autoPlay={true} style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default QRScanner;
