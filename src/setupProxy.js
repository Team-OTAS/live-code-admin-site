const { legacyCreateProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    legacyCreateProxyMiddleware({
      target: "https://obliging-virtually-eel.ngrok-free.app/",
      changeOrigin: true,
      followRedirects: true, // This will likely fix the redirect issue
    })
  );
};
