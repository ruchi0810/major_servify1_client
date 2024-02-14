// ServiceProviderProfilePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceProviderProfilePage = () => {
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch existing profile image on page load
    axios
      .get("/api/service-provider-profile")
      .then((response) => {
        setProfileImage(response.data.serviceProviderImage);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("serviceProviderImage", selectedImage);

    // Update profile image
    axios
      .post("/api/service-provider-profile/upload-profile-image", formData)
      .then((response) => {
        alert(response.data.msg);
        // You can update the UI or perform additional actions as needed
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Service Provider Profile</h1>

      {/* Display existing profile image */}
      <img
        src={profileImage}
        alt="Profile Image"
        style={{ maxWidth: "300px" }}
      />

      {/* Form for updating profile image */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="serviceProviderImage"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Update Profile Image</button>
      </form>
    </div>
  );
};

export default ServiceProviderProfilePage;
