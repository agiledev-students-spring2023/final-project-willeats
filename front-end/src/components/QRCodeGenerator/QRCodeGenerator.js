import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../topBar/TopBar';

function QRCodeGenerator() {
  const { id } = useParams();
  const [qrCodeImage, setQRCodeImage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`/api/qr-code/${id}`)
      .then((res) => res.json())
      .then((data) => setQRCodeImage(data.qrCodeImage))
      .catch((err) => console.log(err));
  }, [id]);

  const navigateBack = () => {
    navigate('/OwnerProfile');
  }

  return (
    <div>
      <TopBar />
      <div className="qr-code-container">
        <h2>Your QR code:</h2>
        <img src={qrCodeImage} alt="QR code" className="qr-code-image" />
        <button className="btn btn-link" onClick={navigateBack}>Back</button>
      </div>
    </div>
  );
}

export default QRCodeGenerator;
