const routes = require('next-routes')();

routes
    .add('/user/', '/user/index');
routes
    .add('/admin/', '/admin/index');
    

module.exports = routes;