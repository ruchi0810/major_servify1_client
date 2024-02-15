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

//below code error in console but work perfectly:
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";

// const Reviews = () => {
//   const [serviceProvider, setServiceProvider] = useState({});
//   const [reviews, setReviews] = useState([]);
//   const [userReview, setUserReview] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const { serviceProviderId } = useParams();
//   const userId = "65cdeeb0342ec949e13a67dd";

//   const socket = io("http://localhost:8000", {
//     transports: ["websocket"],
//   });

//   const fetchServiceProvider = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/service-providers/getone/${serviceProviderId}`
//       );
//       setServiceProvider(response.data);
//     } catch (error) {
//       console.error("Error fetching service provider details:", error);
//     }
//   };

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
//     fetchServiceProvider();
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
//       setReviews([...reviews, response.data]);
//       socket.emit("newReview", serviceProviderId);

//       setUserReview("");
//       setUserRating(0);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Display Service Provider Information */}
//       <div>
//         <h2>{serviceProvider.spname}</h2>
//         <p>
//           <strong>Mobile No:</strong> {serviceProvider.spmobile}
//         </p>
//         <p>
//           <strong>City:</strong> {serviceProvider.spcity}
//         </p>
//         <p>
//           <strong>Email:</strong> {serviceProvider.spemail}
//         </p>
//       </div>

//       {/* Display Reviews */}
//       <h2>Reviews for {serviceProvider.spname}</h2>
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

//       {/* Form for adding reviews */}
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

//below code is error less but not give o/p what i want
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const Reviews = () => {
  const [serviceProvider, setServiceProvider] = useState({});
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const { serviceProviderId } = useParams();
  const userId = "65ce03c47b1576ca26fa390f";

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket");
      // Retry the connection after a delay
      setTimeout(() => {
        newSocket.connect();
      }, 3000);
    });

    newSocket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      // Retry the connection after a delay
      setTimeout(() => {
        newSocket.connect();
      }, 3000);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [serviceProviderId]);

  useEffect(() => {
    if (socket) {
      socket.on("reviewUpdate", (updatedServiceProviderId) => {
        if (updatedServiceProviderId === serviceProviderId) {
          fetchReviews();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("reviewUpdate");
      }
    };
  }, [socket, serviceProviderId]);

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
  }, [serviceProviderId]);

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

      const response = await axios.post(
        `http://localhost:8000/api/service-providers/${serviceProviderId}/reviews`,
        {
          userId,
          rating: userRating,
          reviews: userReview,
        }
      );
      setReviews([...reviews, response.data]);
      if (socket) {
        socket.emit("newReview", serviceProviderId);
      }

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
            min="1"
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
