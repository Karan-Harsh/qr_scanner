import React, { useState, useEffect } from "react";
import axios from 'axios';
import {MdDelete} from 'react-icons/md';
import "./styles.css"

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://localhost:5000/api/qrcodes')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // The empty dependency array ensures this useEffect runs once when the component mounts

  const handleDelete = (id) => {
    // Call the deleteData function to delete the item
    axios.delete(`http://localhost:5000/api/qrcodes/${id}`)
      .then(() => {
        // Remove the deleted item from the state
        setData(prevData => prevData.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="data-table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Scan Time</th>
            <th>Action</th> {/* New column for delete action */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.data}</td>
              <td>{item.scan_time}</td>
              <td>
                {/* Delete icon with onClick event handler */}
                <span className="delete-icon" onClick={() => handleDelete(item.id)}><MdDelete /></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
