const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');

router.get('/', async (req, res) => {
  try {
    const allRestaurants = await dbModel.getAllRestaurants();
    res.render('index', { allRestaurants });
  } catch (err) {
    res.render('error', { message: 'Error reading from MySQL' });
    console.log('Error reading from mysql');
  }
});

router.get('/reviews/show/:restaurantId', async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    const reviews = await dbModel.getAllReviews(restaurantId);
    res.render('reviews', { allReviews: reviews, restaurantId });
  } catch (err) {
    res.render('error', { message: 'Error reading from MySQL' });
    console.log('Error reading from mysql');
  }
});

router.post('/reviews/add', async (req, res) => {
  try {
    const success = await dbModel.addReview(req.body);
    if (success) {
      res.redirect('/');
    } else {
      res.render('error', { message: 'Error writing to MySQL' });
      console.log('Error writing to MySQL');
    }
  } catch (err) {
    res.render('error', { message: 'Error writing to MySQL' });
    console.log('Error writing to MySQL');
    console.log(err);
  }
});

router.post('/reviews/delete', async (req, res) => {
  let userId = req.body.id;
  if (userId) {
    const success = await dbModel.deleteReview(userId);
    if (success) {
      res.redirect('/');
    } else {
      res.render('error', { message: 'Error writing to MySQL' });
      console.log('Error writing to mysql');
      console.log(err);
    }
  }
});

router.post('/restaurant/add', async (req, res) => {
  try {
    const success = await dbModel.addRestaurant(req.body);
    if (success) {
      res.redirect('/');
    } else {
      res.render('error', { message: 'Error writing to MySQL' });
      console.log('Error writing to MySQL');
    }
  } catch (err) {
    res.render('error', { message: 'Error writing to MySQL' });
    console.log('Error writing to MySQL');
    console.log(err);
  }
});

router.post('/restaurant/delete', async (req, res) => {
  let restaurantId = req.body.id;
  if (restaurantId) {
    const reviews = await dbModel.getAllReviews(restaurantId);
    await Promise.all(
      // i know it's ugly i'm just very pressed for time
      // id use one statemnt instead with a delete where id clause
      reviews.map(async (review) => {
        await dbModel.deleteReview(review.review_id);
      })
    );
    const success = await dbModel.deleteRestaurant(restaurantId);
    if (success) {
      res.redirect('/');
    } else {
      res.render('error', { message: 'Error writing to MySQL' });
      console.log('Error writing to mysql');
      console.log(err);
    }
  }
});

module.exports = router;
