// config/helmetConfig.ts - Recommended starter configuration
import helmet, { xssFilter } from "helmet";

export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig = {
        contentSecurityPolicy: false, // Disable for JSON APIs
        crossOriginEmbedderPolicy: false,
        hidePoweredBy: true, // Always hide server info
        noSniff: true, // Always prevent MIME sniffing
        xssFilter: false
    };

    if (isDevelopment) {
        return helmet({
            ...baseConfig,
            hsts: false, // No HTTPS enforcement in development
        });
    }

    // Production gets full security
    return helmet({
        ...baseConfig,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        xssFilter: false,
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    });
};

