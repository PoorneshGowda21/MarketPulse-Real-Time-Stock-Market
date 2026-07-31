// In-memory sliding window rate limiter middleware for MarketPulse API endpoints
const requestCounts = new Map();

export const rateLimiter = (options = { windowMs: 60 * 1000, max: 100 }) => {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const windowStart = now - options.windowMs;

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, []);
    }

    const timestamps = requestCounts.get(ip).filter((ts) => ts > windowStart);
    timestamps.push(now);
    requestCounts.set(ip, timestamps);

    res.setHeader('X-RateLimit-Limit', options.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.max - timestamps.length));

    if (timestamps.length > options.max) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please wait a moment before sending more market requests.',
      });
    }

    next();
  };
};
