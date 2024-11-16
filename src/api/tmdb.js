import axios from "axios";
const API_KEY = "81154aa94ab4961e8bc2a66dad78bf47";
const BASE_URL = "https://api.themoviedb.org/3";

// https://api.themoviedb.org/3/movie/popular?api_key=81154aa94ab4961e8bc2a66dad78bf47
// https://api.themoviedb.org/3/tv/popular?api_key=81154aa94ab4961e8bc2a66dad78bf47

// Função que irá buscar os itens (filmes e series)
export async function getData(categoria, page, ordem) {
  // A função 'awayt' precisa estar dentro de uma função 'async'
  const endpoint = categoria == "filmes" ? "movie" : "tv";
  const response = await axios.get(`${BASE_URL}/${endpoint}/${ordem}`, {
    params: {
      api_key: API_KEY,
      language: "pt-BR",
      page: page,
    },
  });
  return response.data.results;
}

export async function getDataVideos(categoria, id) {
  const endpoint = categoria == "filmes" ? "movie" : "tv";
  const response = await axios.get(`${BASE_URL}/${endpoint}/${id}/videos`, {
    //`${BASE_URL}/${endpoint}/1396/season/1/episode/1/videos`,
    params: {
      api_key: API_KEY,
      language: "pt-BR",
    },
  });
  return response.data.results;
}

// Função que busca o filme pelo ID
export async function getDataId(categoria, id) {
  const endpoint = categoria == "filmes" ? "movie" : "tv";
  const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, {
    params: {
      api_key: API_KEY,
      language: "pt-BR",
    },
  });
  return response.data;
}
