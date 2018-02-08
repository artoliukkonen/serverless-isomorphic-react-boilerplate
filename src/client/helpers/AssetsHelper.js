
const assetsHelper = (path) => {
  const key = path.indexOf('/') === 0 ? path.substring(1) : path;
  if (process.env.AWS_EXECUTION_ENV || process.env.SERVERLESS) {
    const assets = process.env.ASSETS;
    return `/${assets[key]}`;
  }
  return `/${key}`;
};

export default assetsHelper;
