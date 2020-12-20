import express, { application, Application, Request } from 'express';
import './config/database';
const app:Application = express();

import server from './config/server';

const PORT = process.env.PORT;

// Sarting the Server
server.listen(PORT, () => {
  console.log(`🚀: app running on port ${PORT}`);
});