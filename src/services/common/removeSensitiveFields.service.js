const removeSensitiveFields = (docs) => {
    // Recursive function to remove _id from all nested objects
  const removeIdRecursively = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach(removeIdRecursively);  // Recursively process each item in the array
    } else if (typeof obj === 'object' && obj !== null) {
      delete obj._id;  // Remove _id field
      delete obj.__v;  // Optionally remove __v field

      // Recursively process each value in the object
      Object.values(obj).forEach(removeIdRecursively);
    }
  };

  // Handle single document or array of documents
  if (Array.isArray(docs)) {
    docs.forEach(removeIdRecursively);
  } else if (docs) {
    removeIdRecursively(docs);
  }
  
  return docs;
  };

  module.exports = removeSensitiveFields;