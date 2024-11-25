import React from 'react'
import { QRCodeCanvas  } from 'qrcode.react';

const ParticipantQRCode = ({participant} ) => {
    const qrData = JSON.stringify({
        id: participant.id,
        name: participant.name,
      });

  return (
    <div>
      <h2>QR Code for </h2>
      <QRCodeCanvas  value={qrData} size={256} level={"H"} />
      
    </div>
  )
}

export default ParticipantQRCode
