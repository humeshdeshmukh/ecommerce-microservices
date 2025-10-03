/**
 * responseHelper.js
 * Consistent API response formatting.
 */
function successResponse(res, data, message = "Success") {
  res.status(200).json({
    success: true,
    message,
    data,
  });
}

function createdResponse(res, data, message = "Resource created") {
  res.status(201).json({
    success: true,
    message,
    data,
  });
}

module.exports = { successResponse, createdResponse };
