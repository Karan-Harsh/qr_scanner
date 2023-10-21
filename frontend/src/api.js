import axios from 'axios';

const baseURL = 'http://localhost:5000/api/qrcodes';

const insertData = async (dataObj) => {
  try {
    const response = await axios.post(baseURL, dataObj, {
      headers: { 
        'Content-Type': 'application/json'
      },
      maxBodyLength: Infinity
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getData = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteData = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  insertData,
  getData,
  deleteData
};

