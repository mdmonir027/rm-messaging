const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');

const routeArrays = [
  {
    path: '/user',
    handler: userRoutes,
  },
  {
    path: '/message',
    handler: messageRoutes,
  },
  {
    path: '/',
    handler: (req, res) => {
      res.status(200).json({
        message: 'Working',
      });
    },
  },
];

module.exports = (app) => {
  routeArrays.forEach((route) => {
    if (route.path === '/') {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
