import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware('/api', {
  target: 'http://127.0.0.1:9000',
  changeOrigin: true,
  // pathRewrite: { '^/api': '/' }
});

export default function(app: any) {
  app.use(apiProxy);
}