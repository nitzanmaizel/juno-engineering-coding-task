import React, { useState, useEffect } from "react";
import { fetchImage, fetchImageUrls } from "../api/index";

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

  return (
    <div className="container">
      <div>Prev</div>
      {currentImage ? <img src={currentImage} alt="img" width={500} height={500} /> : <div>Loading...</div>}
      <div>Next</div>
    </div>
  );
};
export default ImageCarousel;
