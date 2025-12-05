function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  // jika error sudah punya statusCode
  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Terjadi kesalahan server",
  });
}

module.exports = errorHandler;
