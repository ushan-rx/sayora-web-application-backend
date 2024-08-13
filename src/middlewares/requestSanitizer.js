

// Custom escape function to handle URL, JavaScript, and HTML contexts
const customEscape = (str) => {
  if (typeof str !== 'string') return str;
  
  // Escape HTML characters
  let escapedStr = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
      .replace(/`/g, '&#96;');

  // Escape JavaScript-specific characters
  escapedStr = escapedStr
      .replace(/\\/g, '\\\\')
      // .replace(/\//g, '\\/')   Optional: Useful for JS contexts
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/\0/g, '\\0');

  return escapedStr;
}

// Helper function to recursively sanitize an object
const sanitizeObject = (obj) => {
  for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
      } else if (typeof obj[key] === 'string') {
          obj[key] = customEscape(obj[key]);
      }
  }
}

// Middleware to sanitize req.body, req.query, and req.params
const sanitizeMiddleware = (req, res, next) => {
  // Sanitize req.body
  if (req.body && typeof req.body === 'object') {
      sanitizeObject(req.body);
  }

  // Sanitize req.query
  if (req.query && typeof req.query === 'object') {
      sanitizeObject(req.query);
  }

  // Sanitize req.params
  if (req.params && typeof req.params === 'object') {
      sanitizeObject(req.params);
  }

  // Proceed to next middleware
  next();
}

module.exports = sanitizeMiddleware;
