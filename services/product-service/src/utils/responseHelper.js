/**
 * responseHelper.js
 * Standardized success response helper
 */
function successResponse(res, data, message = "Success") {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
}

function createdResponse(res, data, message = "Resource created successfully") {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
}

module.exports = { successResponse, createdResponse };
