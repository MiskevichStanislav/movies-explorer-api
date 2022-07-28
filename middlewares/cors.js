// const cors = require('cors');

// const listUrl = () => {
//   const { NODE_ENV } = process.env;
//   let list = [];
//   if (NODE_ENV) {
//     list = [
//     //   'https://msprod.nomoredomains.xyz',
//     ];
//   } else {
//     list = [
//       'http://localhost:3000',
//       'http://localhost:3001',
//     ];
//   }
//   return list;
// };

// const allowedCors = {
//   origin: listUrl(),
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// };

// module.exports = cors(allowedCors);

const allowedCors = [
  'https://mydiplom.nomoredomains.xyz',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.end();
    }
  }
  next();
};
