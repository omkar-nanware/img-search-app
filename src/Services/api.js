import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'SsiH1U1i8pLrw2EOdSSFYDMAw13fP9mhs7eMExH-DkQ';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export const fetchDefaultImages = async (page = 1) => {
    try {
      const response = await unsplashApi.get('/photos', {
        params: {
          page,
          per_page: 6,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching default images:', error);
      throw error;
    }
  };

export const fetchImages = async (query, page = 1) => {
    console.log('ggg');
  try {
    const response = await unsplashApi.get('/search/photos', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const fetchImageDetails = async (id) => {
  try {
    const response = await unsplashApi.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image details:', error);
    throw error;
  }
};
