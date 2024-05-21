// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
// import { fetchImages } from "./actions";

// function ImageSlider() {
//   const dispatch = useDispatch();
//   const images = useSelector((state) => state.images);

//   useEffect(() => {
//     dispatch(fetchImages());
//   }, [dispatch]);

//   if (!images || images.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const imageGalleryItems = images.map((image) => ({
//     original: `${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`,
//     thumbnail: `${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`,
//   }));

//   return <ImageGallery items={imageGalleryItems} />;
// }

// export default ImageSlider;
