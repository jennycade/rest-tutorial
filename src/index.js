import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

// SAMPLE DATA

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '2',
  },
};


// PSEUDO-AUTHENTICATION
app.use((req, res, next) => {
  req.me = users[1];
  next();
});



// ROUTES

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

// users
app.get('/users', (req, res) => {
  return res.send(Object.values(users));
});
app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
});
app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});
app.put('/users/:userId', (req, res) => {
  return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
});
app.delete('/users/:userId', (req, res) => {
  return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
});

// messages
app.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
});
app.get('/messages/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId]);
});
app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };
  messages[id] = message;

  return res.send(message);
});
app.put('/messages/:messageId', (req, res) => {
  return res.send(`PUT HTTP method on messages/${req.params.messageId} resource`);
});
app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = messages;

  messages = otherMessages;

  return res.send(message);
});

// sessions
app.get('/session', (req, res) => {
  return res.send(users[req.me.id]);
});


// start 

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}.`);
});