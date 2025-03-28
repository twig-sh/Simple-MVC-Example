// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');

const { Cat } = models;

const hostIndex = (req, res) => {
  const name = 'unknown';

  res.render('index', {
    currentName: name,
    title: 'Home',
    pageName: 'Home Page',
  });
};

const hostPage1 = (req, res) => {

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
    const cats = await Cat.findOne({}).lean().exec();

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
  if (!req.body.name && !req.body.bedsOwned) {
    return res.status(400).json({
      error: 'must provide name or bedsowned',
    });
  }

  const cat = await Cat.find({
    $or: [
      { name: req.body.name },
      { bedOwned: req.body.bedOwned },
    ],
  });

  return res.status(200).json({});
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
};
