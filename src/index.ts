import 'dotenv/config'
import path from 'path'
import express from 'express';
import { RedisStore } from "connect-redis"
import { createClient } from "redis";
import session from "express-session";
import cors from 'cors';
import { app } from './app';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
const { SERVER_PORT: PORT, SESSION_SECRET, SESSION_MAX_AGE, NODE_ENV, ALLOWED_ORIGIN, COOKIE_DOMAIN } = process.env;

const main = async () => {
  try {
    const redisClient = createClient();
    await redisClient.connect();
    
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json());
    app.use(session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: NODE_ENV === 'production',
        httpOnly: true,
        maxAge: parseInt(SESSION_MAX_AGE as string),
        domain: COOKIE_DOMAIN,
        sameSite: 'lax'
      },
    }))
    app.use(cors({
      credentials: true,
      origin: ALLOWED_ORIGIN,
    }));
    app.use(router);
    
    app.get('/', (req, res) => {
      res.send('Hello');
    });
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
  }
}

main();
