const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      "/graphql",
      createProxyMiddleware({
         target: "http://localhost:3001/graphql",
         changeOrigin: true,
      })
   );
   app.use(
      "/auth/login",
      createProxyMiddleware({
         target: "http://localhost:3001/auth/login",
         changeOrigin: true,
      })
   );

   app.use(
      "/auth/logout",
      createProxyMiddleware({
         target: "http://localhost:3001/auth/logout",
         changeOrigin: true,
      })
   );

   app.use(
      "/chats/count",
      createProxyMiddleware({
         target: "http://localhost:3001/chats/count",
         changeOrigin: true,
      })
   );
   app.use(
      "/messages/count",
      createProxyMiddleware({
         target: "http://localhost:3001/messages/count",
         changeOrigin: true,
      })
   );
   app.use(
      "/users/image",
      createProxyMiddleware({
         target: "http://localhost:3001//users/image",
         changeOrigin: true,
      })
   );
};
