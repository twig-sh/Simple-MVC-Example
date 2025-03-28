const controllers = require('./controllers');

const router = (app) => {
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/getName', controllers.getName);
  app.get('/findByName', controllers.searchName);

  app.get('/', controllers.index);

  app.post('/setName', controllers.setName);

  app.post('/updateLast', controllers.updateLast);

  app.post('/cat', controllers.makeCat);
  app.get('/cat', controllers.getCat);
  app.put('/cat', controllers.updateCat);
  app.get('/allCats', controllers.getAllCats);

  app.get('/*', controllers.notFound);
};

// export the router function
module.exports = router;
