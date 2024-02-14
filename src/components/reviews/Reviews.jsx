// // // Reviews.js

// // Reviews.js

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";

// const Reviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [userReview, setUserReview] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const { serviceProviderId } = useParams();
//   const userId = "65c20eef094f089ab40fef49";
//   const socket = io("http://localhost:8000");

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/service-providers/${serviceProviderId}/reviews/${userId}`
//       );
//       setReviews(response.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();

//     socket.on("reviewUpdate", (updatedServiceProviderId) => {
//       if (updatedServiceProviderId === serviceProviderId) {
//         fetchReviews();
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [serviceProviderId, userId, socket]);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const existingReview = reviews.find(
//         (review) => review.userId._id === userId
//       );
//       if (existingReview) {
//         alert("You have already given a review for this service provider.");
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:8000/api/service-providers/${serviceProviderId}/reviews`,
//         {
//           userId,
//           rating: userRating,
//           reviews: userReview,
//         }
//       );
//       socket.emit("newReview", serviceProviderId);
//       setReviews([...reviews, response.data]);
//       setUserReview("");
//       setUserRating(0);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Reviews for Service Provider</h2>
//       <ul>
//         {reviews.map((review) => (
//           <li key={review._id}>
//             <p>
//               <strong>User:</strong> {review.userId.name} (
//               {review.userId.mobile})
//             </p>
//             <p>
//               <strong>Rating:</strong> {review.rating}
//             </p>
//             <p>
//               <strong>Review:</strong> {review.reviews}
//             </p>
//           </li>
//         ))}
//       </ul>

//       <form onSubmit={handleReviewSubmit}>
//         <label>
//           Rating:
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={userRating}
//             onChange={(e) => setUserRating(e.target.value)}
//           />
//         </label>
//         <label>
//           Review:
//           <textarea
//             value={userReview}
//             onChange={(e) => setUserReview(e.target.value)}
//           />
//         </label>
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default Reviews;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import socket from "../../utils/socket";

const Reviews = () => {
  const [serviceProvider, setServiceProvider] = useState({});
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const { serviceProviderId } = useParams();
  const userId = "65cb48c8222c5e20e0a34fae";
  // const socket = io("http://localhost:8000");

  const fetchServiceProvider = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/service-providers/getone/${serviceProviderId}`
      );
      setServiceProvider(response.data);
    } catch (error) {
      console.error("Error fetching service provider details:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/service-providers/${serviceProviderId}/reviews/${userId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchServiceProvider();
    fetchReviews();

    socket.on("reviewUpdate", (updatedServiceProviderId) => {
      if (updatedServiceProviderId === serviceProviderId) {
        fetchReviews();
      }
    });

    return () => {
      // socket.disconnect();
    };
  }, [serviceProviderId, userId, socket]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const existingReview = reviews.find(
        (review) => review.userId._id === userId
      );
      if (existingReview) {
        alert("You have already given a review for this service provider.");
        return;
      }

      // Set userRating to 0 if not provided
      const ratingToSubmit = userRating === "" ? 0 : userRating;

      const response = await axios.post(
        `http://localhost:8000/api/service-providers/${serviceProviderId}/reviews`,
        {
          userId,
          rating: userRating,
          reviews: userReview,
        }
      );
      socket.emit("newReview", serviceProviderId);
      setReviews([...reviews, response.data]);
      setUserReview("");
      setUserRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      {/* Display Service Provider Information */}
      <div>
        <h2>{serviceProvider.spname}</h2>
        <p>
          <strong>Mobile No:</strong> {serviceProvider.spmobile}
        </p>
        <p>
          <strong>City:</strong> {serviceProvider.spcity}
        </p>
        <p>
          <strong>Email:</strong> {serviceProvider.spemail}
        </p>
        <p>
          <strong>Overall Rating:</strong> {serviceProvider.overallRating}
        </p>
      </div>

      {/* Display Reviews */}
      <h2>Reviews for {serviceProvider.spname}</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>
              <strong>User:</strong> {review.userId.name} (
              {review.userId.mobile})
            </p>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <strong>Review:</strong> {review.reviews}
            </p>
          </li>
        ))}
      </ul>

      {/* Form for adding reviews */}
      <form onSubmit={handleReviewSubmit}>
        <label>
          Rating:
          <input
            type="number"
            min="0"
            max="5"
            value={userRating}
            onChange={(e) => setUserRating(e.target.value)}
          />
        </label>
        <label>
          Review:
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
