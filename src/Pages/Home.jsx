import React, { useState, useEffect } from 'react';
import CustomTextField from '../Components/TextField';
import CustomButton from '../Components/Button';
import { fetchImages, fetchDefaultImages } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../image.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDefaultImages = async () => {
      try {
        const data = await fetchDefaultImages(page);
        setImages(data);
        setTotalPages(10);
      } catch (error) {
        console.error('Error fetching default images:', error);
      }
    };

    loadDefaultImages();
  }, [page]);

  const handleSearch = async () => {
    try {
      const data = await fetchImages(query, page);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handlePageChange = async (event, value) => {
    setPage(value);
    try {
      if (query) {
        const data = await fetchImages(query, value);
        setImages(data.results);
        setTotalPages(data.total_pages);
      } else {
        const data = await fetchDefaultImages(value);
        setImages(data);
        setTotalPages(10);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <CustomTextField
            label="Search for images"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item>
          <CustomButton onClick={handleSearch}>Search</CustomButton>
        </Grid>
        <Grid item container spacing={2} justifyContent="center">
          {images.map((image) => (
            <Grid item key={image.id} xs={12} sm={6} md={4} lg={4} onClick={() => navigate(`/details/${image.id}`)}>
              <img
                src={image.urls.thumb}
                alt={image.description}
                id={image.id}
                style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <Typography className="Text-Semibold" sx={{ fontWeight: 600 }}>{image.description || 'No title available'}</Typography>
              <Typography className="Text-Normal">{image.alt_description || 'No description available'}</Typography>
            </Grid>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Grid item>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
