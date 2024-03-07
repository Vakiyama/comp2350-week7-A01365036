const database = include('/databaseConnection');

async function getAllRestaurants() {
  let sqlQuery = `
		SELECT *
		FROM restaurant;
	`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getAllReviews(id) {
  let sqlQuery = `
		SELECT *
		FROM review
    WHERE :id = restaurant_id;
	`;

  try {
    const results = await database.query(sqlQuery, { id });
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addReview({ restaurant_id, reviewer_name, details, rating }) {
  let sqlInsertSalt = `
INSERT INTO review (restaurant_id, reviewer_name, details, rating )
VALUES (:restaurant_id, :reviewer_name, :details, :rating );
`;
  await database.query(sqlInsertSalt, {
    restaurant_id,
    reviewer_name,
    details,
    rating,
  });
  return true;
}

async function deleteReview(id) {
  let sqlInsertSalt = `
DELETE FROM review
WHERE review_id = :id
`;
  let params = {
    id,
  };
  await database.query(sqlInsertSalt, params);
}

async function addRestaurant(postData) {
  let sqlInsertSalt = `
INSERT INTO restaurant (name, description )
VALUES (:name, :description);
`;
  let params = {
    name: postData.name,
    description: postData.description,
  };
  await database.query(sqlInsertSalt, params);
  return true;
}

async function deleteRestaurant(id) {
  let sqlInsertSalt = `
DELETE FROM restaurant
WHERE restaurant_id = :id
`;
  let params = {
    id,
  };
  const result = await database.query(sqlInsertSalt, params);
  console.log(result);
  return true;
}

module.exports = {
  addRestaurant,
  deleteRestaurant,
  getAllReviews,
  getAllRestaurants,
  deleteReview,
  addReview,
};
