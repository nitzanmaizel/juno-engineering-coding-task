import React, { useState, useEffect } from "react";
import { fetchImageUrls } from "../api/index";

const ImageCarousel = () => {
  const [imagesUrl, setImagesUrl] = useState([]);

  useEffect(() => {
    const fetchImageFromApi = async () => {
      try {
        const imagesUrl = await fetchImageUrls();
        setImagesUrl(imagesUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImageFromApi();
  }, []);

  return (
    <div className="container">
      <div>Prev</div>
      {imagesUrl.length > 0 ? <img src={imagesUrl[0]} alt="img" width={500} height={500} /> : <div>Loading...</div>}
      <div>Next</div>
    </div>
  );
};
export default ImageCarousel;
