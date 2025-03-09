import React, { useState, useEffect } from "react";
import quotes from "inspirational-quotes";

const Quote = ({ textColor = "#FFFFFF" }) => {
    const [quote, setQuote] = useState(quotes.getQuote());

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(quotes.getQuote()); // Get a new quote every 30 minutes
        }, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center text-sm italic mt-4 px-8" style={{ color: textColor }}>
            "{quote.text}"
        </div>
    );
};

export default Quote;
