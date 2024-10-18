const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      "/graphql",
      createProxyMiddleware({
         target: "http://localhost:3001/api/graphql",
         changeOrigin: true,
      })
   );
   app.use(
      "/auth/login",
      createProxyMiddleware({
         target: "http://localhost:3001/api/auth/login",
         changeOrigin: true,
      })
   );

   app.use(
      "/auth/logout",
      createProxyMiddleware({
         target: "http://localhost:3001/api/auth/logout",
         changeOrigin: true,
      })
   );

   app.use(
      "/chats/count",
      createProxyMiddleware({
         target: "http://localhost:3001/api/chats/count",
         changeOrigin: true,
      })
   );
   app.use(
      "/messages/count",
      createProxyMiddleware({
         target: "http://localhost:3001/api/messages/count",
         changeOrigin: true,
      })
   );
   app.use(
      "/users/image",
      createProxyMiddleware({
         target: "http://localhost:3001/api/users/image",
         changeOrigin: true,
      })
   );
};
