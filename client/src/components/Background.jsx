import React, { useState, useEffect } from "react";

const PEXELS_API_KEY = "ejvmSQdsHUOu8H06zCqHzAn1golAImgQ0tR0eOHqx5bSHje7RFRiAFm4"; // Replace with your actual API key

const Background = () => {
    const [bgImage, setBgImage] = useState("");

    const fetchRandomImage = async () => {
        try {
            const response = await fetch("https://api.pexels.com/v1/search?query=mountain", {
                headers: { Authorization: PEXELS_API_KEY },
            });

            const data = await response.json();
            const imageUrl = data.photos[0]?.src?.landscape || "default-image-url.jpg"; // Fallback image
            setBgImage(imageUrl);
        } catch (error) {
            console.error("Error fetching background image:", error);
        }
    };

    useEffect(() => {
        fetchRandomImage();

        // Change background every hour
        const interval = setInterval(fetchRandomImage, 3600000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
            style={{ backgroundImage: `url(${bgImage})` }}
        />
    );
};

export default Background;
