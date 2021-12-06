const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getCourses', mid.requiresSecure, controllers.Course.getCourses);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Course.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Course.make);
  // app.get('/upgrade', mid.requiresLogin, controllers.Course.upgrade);
  app.delete('/delete', mid.requiresLogin, controllers.Course.delete);
  app.get('/getUser', mid.requiresLogin, controllers.Account.returnUser);
  app.post('/reset', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePassword);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
