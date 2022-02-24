import 'dotenv/config';
import cors from 'cors';
import express from 'express';

// data
import models from './models/index.js';

// routing
import routes from './routes/index.js';

// start express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());


// PSEUDO-AUTHENTICATION
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// ROUTES
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);


// start 
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}.`);
});