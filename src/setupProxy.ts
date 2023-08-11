import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware('/api', {
  target: 'https://pool-server-vercel.vercel.app/api',
  changeOrigin: true,
  // pathRewrite: { '^/api': '/' }
});

export default function(app: any) {
  app.use(apiProxy);
}