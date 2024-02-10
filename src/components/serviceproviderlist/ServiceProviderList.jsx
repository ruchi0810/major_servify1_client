// // ServiceProviderList.js

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./ServiceProviderList.css";

// const ServiceProviderList = () => {
//   const [serviceProviders, setServiceProviders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchServiceProviders = async () => {
//       try {
//         let apiUrl = "http://localhost:8000/api/service-providers/getall";

//         // If search term is present, modify the API URL
//         if (searchTerm) {
//           apiUrl = `http://localhost:8000/api/service-providers/getallquery/${searchTerm}`;
//         }

//         const response = await axios.get(apiUrl);
//         setServiceProviders(response.data);
//       } catch (error) {
//         console.error("Error fetching service providers:", error);
//       }
//     };

//     fetchServiceProviders();
//   }, [searchTerm]);

//   // Function to navigate to reviews page for a specific service provider
//   const navigateToReviews = (serviceProviderId) => {
//     navigate(`/reviews/${serviceProviderId}`);
//   };

//   return (
//     <div className="service-provider-list">
//       <h2>Service Providers</h2>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by service name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="card-container">
//         {serviceProviders.map((provider) => (
//           <div
//             key={provider._id}
//             className="service-provider-card"
//             onClick={() => navigateToReviews(provider._id)} // Add onClick handler
//           >
//             <h3>{provider.spname}</h3>
//             <p>
//               <strong>Service:</strong> {provider.spservicename}
//             </p>
//             <p>
//               <strong>City:</strong> {provider.spcity}
//             </p>
//             <p>
//               <strong>Email:</strong> {provider.spemail}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {provider.spmobile}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServiceProviderList;

// ServiceProviderList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ServiceProviderList.css";

const ServiceProviderList = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchServiceProviders = async () => {
    try {
      let apiUrl = "http://localhost:8000/api/service-providers/getall";

      if (searchTerm) {
        apiUrl = `http://localhost:8000/api/service-providers/getallquery/${searchTerm}`;
      }

      const response = await axios.get(apiUrl);
      setServiceProviders(response.data);
    } catch (error) {
      console.error("Error fetching service providers:", error);
    }
  };

  useEffect(() => {
    fetchServiceProviders();
  }, [searchTerm]);

  const navigateToReviews = (serviceProviderId) => {
    navigate(`/reviews/${serviceProviderId}`);
  };

  return (
    <div className="service-provider-list">
      <h2>Service Providers</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by service name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card-container">
        {serviceProviders.map((provider) => (
          <div
            key={provider._id}
            className="service-provider-card"
            onClick={() => navigateToReviews(provider._id)}
          >
            <h3>{provider.spname}</h3>
            <p>
              <strong>Service:</strong> {provider.spservicename}
            </p>
            <p>
              <strong>City:</strong> {provider.spcity}
            </p>
            <p>
              <strong>Email:</strong> {provider.spemail}
            </p>
            <p>
              <strong>Mobile:</strong> {provider.spmobile}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderList;






