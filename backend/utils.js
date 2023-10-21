function jsDateToMysqlDateTime(jsDate) {
    // Check if the input is a valid Date object
    if (!(jsDate instanceof Date)) {
      throw new Error('Invalid Date object');
    }
  
    // Get the date and time components
    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = jsDate.getDate();
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const seconds = jsDate.getSeconds();
  
    // Format the components as a MySQL DATETIME string
    const mysqlDateTime = `${year}-${padNumber(month)}-${padNumber(day)} ${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  
    return mysqlDateTime;
  }
  
  // Helper function to pad single-digit numbers with leading zeros
  function padNumber(number) {
    return number < 10 ? `0${number}` : number;
  }

  
  module.exports=  jsDateToMysqlDateTime;