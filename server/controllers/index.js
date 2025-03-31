// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');

const { Cat } = models;

const queryAllCats = async () => {
  return await Cat.find().lean().exec();
};

const hostIndex = (req, res) => {
  const name = 'unknown';

  res.render('index', {
    currentName: name,
    title: 'Home',
    pageName: 'Home Page',
  });
};

const hostPage1 = async (req, res) => {
  try {
    const cats = await queryAllCats();
    res.render('page1', {
      cats,
      title: 'Page 1',
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('page1', {
      title: 'Page 1',
      error: 'Failed to load',
    });
  }
};

const hostPage2 = (req, res) => {
  res.render('page2');
};

const hostPage3 = (req, res) => {
  res.render('page3');
};

const getName = (req, res) => {

};

const setName = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname, lastname and beds are all required' });
  }
  return null;
};

const searchName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }
  return null;
};

const updateLast = (req, res) => {

};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

const makeCat = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName) {
    return res.status(400).json({
      error: 'give me firstName and lastName dummy',
    });
  }

  const catData = {
    name: `${req.body.firstName} ${req.body.lastName}`,
    bedsOwned: req.body.beds,
  };

  const newCat = new Cat(catData);

  try {
    await newCat.save();
    return res.status(201).json(catData);
  } catch (e) {
    console.log('yow!');
    return res.status(500).json({
      error: 'failed to create cat',
    });
  }
};

const getCat = async (req, res) => {
  const cats = await Cat.findOne({
    name: 'Methuselah Johnson',
  }, 'name bedsOwned').lean().exec();

  console.log(cats);

  return res.status(200).json(cats);
};

const getAllCats = async (req, res) => {
  try {
    const cats = await queryAllCats();

    console.log(cats);

    return res.status(200).json(cats);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Error finding cats',
    });
  }
};

const updateCat = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: 'must provide id',
    });
  }

  if (!req.body.name && !req.body.bedsOwned) {
    return res.status(400).json({
      error: 'must provide name or bedsOwned',
    });
  }

  const cat = await Cat.findById(id);

  if (!cat) {
    return res.status(404).json({
      error: 'Cat not found',
    });
  }

  try {
    cat.name = req.body.name;
    cat.bedsOwned = req.body.bedsOwned;

    await cat.save();
    return res.status(200).json(cat);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'failed to update cat',
    });
  }
};

const deleteCat = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: 'must provide id',
    });
  }

  try {
    const cat = await Cat.findById(id);

    if (!cat) {
      return res.status(404).json({
        error: 'Cat not found',
      });
    }

    await cat.deleteOne();

    return res.status(200);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'failed to delete cat',
    });
  }
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  getName,
  setName,
  updateLast,
  searchName,
  notFound,
  makeCat,
  getCat,
  getAllCats,
  updateCat,
  deleteCat,
};
