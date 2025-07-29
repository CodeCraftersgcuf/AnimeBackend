import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { config } from 'dotenv';
import { rateLimiter } from 'hono-rate-limiter';
import { swaggerUI } from '@hono/swagger-ui';

import hiAnimeRoutes from './routes/routes.js';

import { AppError } from './utils/errors.js';
import { fail } from './utils/response.js';
import hianimeApiDocs from './utils/swaggerUi.js';
import { logger } from 'hono/logger';

const app = new Hono();

config();

const origins = process.env.ORIGIN ? process.env.ORIGIN.split(',') : '*';

// third party middlewares
app.use(
  '*',
  cors({
    origin: origins,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: '*',
  })
);

// Apply the rate limiting middleware to all requests.
app.use(
  rateLimiter({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60000,
    limit: process.env.RATE_LIMIT_LIMIT || 100,
    standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: () => '<unique_key>', // Method to generate custom identifiers for clients.
    // store: ... , // Redis, MemoryStore, etc. See below.
  })
);

// middlewares

// routes

app.use('/api/v1/*', logger());

app.get('/', (c) => {
  c.status(200);
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HiAnime API 🎉</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #4F46E5;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 1.2rem;
          color: #6B7280;
          margin-bottom: 30px;
        }
        .launch-btn {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
          margin-bottom: 30px;
        }
        .launch-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
        }
        .api-btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: #10B981;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          margin: 5px;
          transition: background-color 0.3s ease;
        }
        .api-btn:hover {
          background-color: #059669;
        }
        .endpoints {
          margin-top: 30px;
        }
        .endpoint-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">🎉 HiAnime API</h1>
          <p class="subtitle">RESTful API for anime content from hianime.to</p>
          
          <a href="https://hianime.to" target="_blank" class="launch-btn">
            ▶️ Open HiAnime in browser
          </a>
        </div>
        
        <div class="endpoints">
          <h2>🚀 Quick Start</h2>
          <p>Start exploring the API with these endpoints:</p>
          
          <div class="endpoint-grid">
            <a href="/api/v1" class="api-btn">📚 Documentation</a>
            <a href="/ui" class="api-btn">🔧 Swagger UI</a>
            <a href="/api/v1/home" class="api-btn">🏠 Homepage Data</a>
            <a href="/api/v1/search?keyword=naruto" class="api-btn">🔍 Search Example</a>
          </div>
          
          <h3>📋 Available Endpoints:</h3>
          <ul style="line-height: 1.8; color: #4B5563;">
            <li><code>/api/v1/home</code> - Get homepage data with trending, popular anime</li>
            <li><code>/api/v1/anime/{id}</code> - Get detailed anime information</li>
            <li><code>/api/v1/animes/{query}/{category}</code> - Get anime lists</li>
            <li><code>/api/v1/search</code> - Search for anime</li>
            <li><code>/api/v1/episodes/{id}</code> - Get anime episodes</li>
            <li><code>/api/v1/stream</code> - Get streaming links</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});
app.get('/ping', (c) => {
  return c.text('pong');
});
app.route('/api/v1', hiAnimeRoutes);

app.get('/doc', (c) => c.json(hianimeApiDocs));

// Use the middleware to serve Swagger UI at /ui
app.get('/ui', swaggerUI({ url: '/doc' }));
app.onError((err, c) => {
  if (err instanceof AppError) {
    return fail(c, err.message, err.statusCode, err.details);
  }
  console.error('unexpacted Error :' + err.message);

  return fail(c);
});

export default app;
