// import React, { useEffect, useState } from "react";

// const GetLocation = () => {
//   const [locationData, setLocationData] = useState(null);

//   useEffect(() => {
//     // Check if Geolocation is supported by the browser
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           // Successfully obtained the current position
//           const { latitude, longitude } = position.coords;

//           try {
//             // Fetch additional location details using OpenStreetMap Nominatim API
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
//             );

//             if (response.ok) {
//               const data = await response.json();
//               const { city, state, postcode, road } = data.address;

//               setLocationData({
//                 latitude,
//                 longitude,
//                 city,
//                 state,
//                 postcode,
//                 street: road,
//               });
//             } else {
//               console.error(
//                 "Error fetching location details from OpenStreetMap Nominatim API"
//               );
//             }
//           } catch (error) {
//             console.error("Error fetching location details:", error.message);
//           }
//         },
//         (error) => {
//           // Handle error when obtaining the location
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       // Geolocation is not supported
//       console.error("Geolocation is not supported by your browser");
//     }
//   }, []); // Empty dependency array ensures the effect runs once on mount

//   return (
//     <div>
//       {locationData ? (
//         <div>
//           <p>Latitude: {locationData.latitude}</p>
//           <p>Longitude: {locationData.longitude}</p>
//           <p>City: {locationData.city}</p>
//           <p>State: {locationData.state}</p>
//           <p>Pincode: {locationData.postcode}</p>
//           <p>Street: {locationData.street}</p>
//         </div>
//       ) : (
//         <p>Loading location...</p>
//       )}
//     </div>
//   );
// };

// export default GetLocation;

// import React, { useEffect, useState } from "react";

// const GetLocation = () => {
//   const [locationData, setLocationData] = useState(null);

//   useEffect(() => {
//     // Check if Geolocation is supported by the browser
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           // Successfully obtained the current position
//           const { latitude, longitude } = position.coords;

//           try {
//             // Fetch additional location details using OpenStreetMap Nominatim API
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
//             );

//             if (response.ok) {
//               const data = await response.json();
//               console.log("API response:", data); // Log the entire response for debugging

//               const { address } = data;
//               setLocationData({
//                 latitude,
//                 longitude,
//                 address: address,
//               });
//             } else {
//               console.error(
//                 "Error fetching location details from OpenStreetMap Nominatim API"
//               );
//             }
//           } catch (error) {
//             console.error("Error fetching location details:", error.message);
//           }
//         },
//         (error) => {
//           // Handle error when obtaining the location
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       // Geolocation is not supported
//       console.error("Geolocation is not supported by your browser");
//     }
//   }, []); // Empty dependency array ensures the effect runs once on mount

//   console.log(locationData);

//   return (
//     <div>
//       {locationData ? (
//         <div>
//           <p>Latitude: {locationData.latitude}</p>
//           <p>Longitude: {locationData.longitude}</p>
//           <p>Address: {formatAddress(locationData.address)}</p>
//         </div>
//       ) : (
//         <p>Loading location...</p>
//       )}
//     </div>
//   );
// };

// // Helper function to format the address
// const formatAddress = (address) => {
//   const components = [
//     "house_number",
//     "road",
//     "suburb",
//     "city",
//     "state",
//     "postcode",
//   ];

//   return components
//     .map((component) => (address[component] ? address[component] : ""))
//     .filter((part) => part !== "")
//     .join(", ");
// };

// export default GetLocation;

// import React, { useEffect, useState } from "react";

// const GetLocation = () => {
//   const [locationData, setLocationData] = useState(null);

//   useEffect(() => {
//     // Check if Geolocation is supported by the browser
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           // Successfully obtained the current position
//           const { latitude, longitude } = position.coords;

//           try {
//             // Fetch additional location details using OpenStreetMap Nominatim API
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
//             );

//             if (response.ok) {
//               const data = await response.json();
//               console.log("API response:", data); // Log the entire response for debugging

//               const { address } = data;
//               setLocationData({
//                 latitude,
//                 longitude,
//                 address: address || {}, // Ensure 'address' is an object
//               });
//             } else {
//               console.error(
//                 "Error fetching location details from OpenStreetMap Nominatim API"
//               );
//             }
//           } catch (error) {
//             console.error("Error fetching location details:", error.message);
//           }
//         },
//         (error) => {
//           // Handle error when obtaining the location
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       // Geolocation is not supported
//       console.error("Geolocation is not supported by your browser");
//     }
//   }, []); // Empty dependency array ensures the effect runs once on mount

//   console.log(locationData);

//   return (
//     <div>
//       {locationData ? (
//         <div>
//           <p>Latitude: {locationData.latitude}</p>
//           <p>Longitude: {locationData.longitude}</p>
//           <p>Address: {formatAddress(locationData.address)}</p>
//         </div>
//       ) : (
//         <p>Loading location...</p>
//       )}
//     </div>
//   );
// };

// // Helper function to format the address
// const formatAddress = (address) => {
//   const componentsToInclude = [
//     "house_number",
//     "road",
//     "suburb",
//     "city",
//     "state",
//     "postcode",
//   ];

//   const formattedAddress = componentsToInclude
//     .map((component) => address?.[component] || "")
//     .filter((part) => part !== "")
//     .join(", ");

//   return formattedAddress;
// };

// export default GetLocation;
