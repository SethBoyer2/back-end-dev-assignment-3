// config/corsConfig.ts
export const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "scary jerry";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        };
    }

    // Strict origins in production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        maxAge: 600 // Allow caching for up to ten minutes for performance purposes
    };
};

//STUDENT ID: 0420441