import React, { Fragment, useState, useEffect } from 'react';
import { fetchImage, fetchImageUrls } from '../api/index';

const ImageCarousel = () => {
  const [imagesUrl, setImagesUrl] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImageFromApi = async () => {
      try {
        setCurrentImage(null);
        if (!imagesUrl.length) {
          const imagesUrl = await fetchImageUrls();
          setImagesUrl(imagesUrl);
        }

        const image = await fetchImage(currentIndex);
        setCurrentImage(image);
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
        {currentImage ? (
          <img src={currentImage} alt='img' width={500} height={500} />
        ) : (
          <div className='loading'>Loading...</div>
        )}
      </Fragment>
    );
  };

  return (
    <div className='container'>
      <div onClick={handlePrev}>Prev</div>
      {renderImage()}
      <div onClick={handleNext}>Next</div>
    </div>
  );
};
export default ImageCarousel;
