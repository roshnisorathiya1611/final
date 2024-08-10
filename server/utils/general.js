const sendResponse = (status = 200, success = true, message, res) => {
  return res.status(status).json({ success: success, message: message });
};

export { sendResponse };