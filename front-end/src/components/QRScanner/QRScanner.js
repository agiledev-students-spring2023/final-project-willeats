import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserQRCodeReader } from '@zxing/library';

function QRScanner() {
  const [scannedData, setScannedData] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
      if (result) {
        setScannedData(result.getText());
      } else if (error) {
        console.error(error);
      }
    });
  }, []);

  useEffect(() => {
    if (scannedData) {
      const parsedData = JSON.parse(scannedData);
      const restaurantId = parsedData.restaurantId;
      navigate(`/restaurant/${restaurantId}`);
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
