import React, { Fragment, useState, useEffect } from 'react';
import { fetchImage, fetchImageUrls } from '../api/index';

const ImageCarousel = () => {
  const [imagesUrl, setImagesUrl] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageFromApi = async () => {
      try {
        setLoading(true);
        setCurrentImage(null);
        if (!imagesUrl.length) {
          const imagesUrl = await fetchImageUrls();
          setImagesUrl(imagesUrl);
        }

        const image = await fetchImage(currentIndex);
        setCurrentImage(image);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImageFromApi();
  }, [currentIndex, imagesUrl]);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(imagesUrl.length - 1);
    } else setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex >= imagesUrl.length - 1) {
      setCurrentIndex(0);
    } else setCurrentIndex(currentIndex + 1);
  };

  const renderImage = () => {
    return (
      <Fragment>
        {!loading && currentImage ? (
          <img src={currentImage} alt='img' width={500} height={500} />
        ) : (
          <div className='loading'>Loading...</div>
        )}
      </Fragment>
    );
  };

  return (
    <div className='container'>
      <div className='button prev' onClick={handlePrev} />
      {renderImage()}
      <div className='button next' onClick={handleNext} />
    </div>
  );
};
export default ImageCarousel;
