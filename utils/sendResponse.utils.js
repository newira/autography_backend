const sendResponse = (res, statusCode, success, message = null, data = null) => {
    const response = {
      success,
    };
  
    if (message) response.message = message;
    if (data !== null) response.data = data;
  
    return res.status(statusCode).json(response);
  };
  
  export default sendResponse;
  