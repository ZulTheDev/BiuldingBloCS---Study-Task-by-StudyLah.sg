const Express = require('express');
const App = express();
const Port = process.env.PORT || 36538;
const { promisify } = require('util');
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL("redis://default:8d3af28fd1f84ef29cbcca10215c79e9@finer-crane-36538.upstash.io")); // Replace with your Upstash Redis URL

// Promisify Redis functions for async/await
const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);
const delAsync = promisify(redis.del).bind(redis);

// Middleware for parsing JSON requests
App.use(express.json());

// Signup endpoint
App.post('/signup', async (req, res) => {
  const { username } = req.body;

  // Check if the username is available
  const existingUser = await getAsync(`user:${username}`);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create a new user entry
  await setAsync(`user:${username}`, JSON.stringify({ username }));

  return res.status(201).json({ message: 'User created successfully' });
});

// Logout endpoint
App.post('/logout', async (req, res) => {
  const { username } = req.body;

  // Check if the user exists
  const existingUser = await getAsync(`user:${username}`);
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Delete the user entry
  await delAsync(`user:${username}`);

  return res.status(200).json({ message: 'User logged out successfully' });
});

// Start the server
App.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
