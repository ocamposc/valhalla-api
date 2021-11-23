const { Router } = require('express');
const { getDirectors, getMoviesAndSeries } = require('../request/imdb');

const router = Router();
const keyword = 'viking';

router.get('/', async(req, res) => {
  const body = [];  
  const response = await getMoviesAndSeries(keyword);
  const { results, error } = response;

  if (error) {
    res.status(401).json(error); 
    return;
  }
  
  if (!results) {
    res.status(404).send('Does not exist movies or series with this keyword in their title.'); 
    return;
  }
  
  for(movie of results) {
    const directors = await getDirectors(movie.id);
    const { results } = directors;
    const data = {
      ...movie,
      results
    };
    body.push(data);
  }

  res.status(200).json(body);
});

module.exports = router;
