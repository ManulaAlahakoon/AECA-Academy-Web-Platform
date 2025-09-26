// middleware/auth.js
export const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Assumes key is passed in a header

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next(); // Pass control to the next handler
};

