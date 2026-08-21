import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Riley content engine is running 🎣' });
});

// TODO: API routes
// app.use('/api/generate', generateRoutes);
// app.use('/api/publish', publishRoutes);
// app.use('/api/schedule', scheduleRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✨ Riley content engine running on http://localhost:${PORT}`);
});
