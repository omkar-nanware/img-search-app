import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchImageDetails } from '../Services/api';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import '../image.css';


const ImageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getImageDetails = async () => {
      try {
        const data = await fetchImageDetails(id);
        setImage(data);
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };
    getImageDetails();
  }, [id]);

  return (
    <Box sx={{ padding: 2 }}>
        <Button variant="contained" onClick={() => navigate('/') }sx={{ marginBottom: 2 }}>Back</Button>
      {image ? (
        <Box>
          <img src={image.urls.full} alt={image.description} style={{ width: '100%', borderRadius: '8px' }} />
          <Typography className="Text-headline" sx={{ marginTop: 2, fontWeight: 600 }}>{image.description || 'No title available'}</Typography>
          <Typography className="Text-Normal" sx={{ marginTop: 1 }}>{image.alt_description || 'No description available'}</Typography>
        </Box>
      ) : (
        <Typography className="Text-headline">Loading...</Typography>
      )}
    </Box>
  );
};

export default ImageDetails;
