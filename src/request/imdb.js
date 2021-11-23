const fetch = require('node-fetch');
require('dotenv').config();

const key = process.env.IMDB_KEY;

// Gets movies and series by keyword on title
const getMoviesAndSeries = async(keyword) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const result = await fetch(`https://imdb-api.com/en/API/SearchTitle/${key}/${keyword}`, requestOptions);
    const data = await result.json();
    const response = {
      error: data.errorMessage,
      results: data.results
    }
    return response;
  } catch (e) {
    return {
      error: e,
      results: null
    };
  }
}

// Gets directors by movie id
const getDirectors = async(id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  try {
    const result = await fetch(`https://imdb-api.com/en/API/FullCast/${key}/${id}`, requestOptions);
    const data = await result.json();
    const response = {
      error: data?.errorMessage,
      results: data?.directors
    }
    return response;
  } catch (e) {
    return {
      error: e,
      results: null
    };
  }
}

// Gets actors by movie id
const getActors = async(id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  try {
    const result = await fetch(`https://imdb-api.com/en/API/FullCast/${key}/${id}`, requestOptions)
    const data = await result.json();
    const response = {
      error: data?.errorMessage,
      results: data?.actors
    }
    return response;
  } catch (e) {
    return {
      error: e,
      results: null
    };
  }
}

module.exports = {
  getActors,
  getDirectors,
  getMoviesAndSeries,
}