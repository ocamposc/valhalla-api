const { Router } = require('express');
const { getActors, getMoviesAndSeries } = require('../request/imdb');

const router = Router();
const keyword = 'axe';
    
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
    const response = await getActors(movie.id);
    const { results } = response;
    const actors = results.slice(0,3);
    const data = {
      ...movie,
      actors
    };
    body.push(data);
  }

  res.status(200).json(body);
});

module.exports = router;
