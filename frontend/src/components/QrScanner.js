import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import "./styles.css";
import { insertData } from "../api";
import DataTable from "./DataTable";
import {FaSave} from "react-icons/fa"
import {RiDeleteBin2Line} from "react-icons/ri"
import {BiQrScan} from "react-icons/bi"

const Test = () => {
  const [result, setResult] = useState("No result");
  const [scanTime, setScanTime] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      const currentScanTime = new Date().toLocaleString();
      setResult(data.text);
      setScanTime(currentScanTime);

      // Close the camera after scanning once
      setScanning(false);
    }
  };

  const handleSave = () => {
    console.log("Saved");
    insertData({ data: result, dateTime: new Date() });
    setResult("No result");
    setScanTime(null);

    // Re-enable scanning after saving
    setScanning(true);
  };

  const handleDoNotSave = () => {
    setResult("No result");
    setScanTime(null);

    // Re-enable scanning after choosing not to save
    setScanning(true);
  };

  const startScanning = () => {
    setScanning(true);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="qr-scanner-container">
      <div className="qr-scanner">
        {scanning ? (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        ) : (
          <button className="scan-now-button" onClick={startScanning}>Scan Now <BiQrScan /></button>
        )}
      </div>
      {result !== "No result" && (
        <div className="result-text">
          {result}
          {scanTime && <br />}
          {scanTime && <span>Scanned at: {scanTime}</span>}
        </div>
      )}
      {result !== "No result" && (
        <div className="button-container">
          <button onClick={handleSave}>Save <FaSave /></button>
          <button onClick={handleDoNotSave}>Do Not Save <RiDeleteBin2Line /></button>
        </div>
      )}
      <DataTable />
    </div>
  );
}

export default Test;
