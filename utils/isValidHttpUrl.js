const isValidHttpUrl = (str) => {
  const url = new URL(str);
  if (url.protocol === 'http:' || url.protocol === 'https:') {
    return true;
  }

  return false;
};

module.exports = isValidHttpUrl;
