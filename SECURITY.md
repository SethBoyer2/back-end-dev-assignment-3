## Helmet.JS configuration:

### Config applied:

    // Base configuration for APIs
    const baseConfig = {
        frameguard = false:
        contentSecurityPolicy: false, // Disable for JSON APIs
        crossOriginEmbedderPolicy: false,
        hidePoweredBy: true, // Always hide server info
        noSniff: true, // Always prevent MIME sniffing
    };
    return helmet({
        ...baseConfig,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    });

### Justification:
contentSecurityPolicy: false = Disabled because this is a JSON-only API and will never return html content.
CSPs primary use is to prevent xss in browsers rendering HTML content

frameguard: false (in base config): used to prevent clickjacking, but because we don't serve HTML it isn't necessary
frameguard: deny (in prod): in our case if HTML IS accidentally served it doesn't hurt to have this enabled, but is pointless in the general config

crossOriginEmbedderPolicy: false = COEP controls which cross-origin data can be loaded by the client, and in the case of a JSON-only API there is no
point in having it enabled, as it can break client requests due to the request lacking the required headers for COEP to allow it to pass.

hidePoweredBy: true = Hides server information to reduce the amount of information that can be gathered about our systems

xssFilter: false = largely useless header that was made during the Internet Explorer days. In our case, it's extra useless because we are JSON-only

noSniff: true = prevents MIME sniffing and possible xss or injection attacks.
^ Effectively only allows the browser to accept content types that match the content-type header, which prevents JSON files being treated like JS scripts

HSTs: One year maxAge to continuously enforce HTTPs, and includeSubDomains and preload enabled to make sure that subdomains are included.

Sources:
https://helmetjs.github.io/

### CORS config
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
    };
};

### Justification
Allow all origins in development for general ease to work with

In prod, only allow origins from the list of allowed origins, and only allow the headers Content-Type and Authorization,
because that is generally all we use in terms of headers. Allowing any others could open up vulnerabilities.
And we allow the most widely-used method types.

## Sources
https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS

### Side note:
I spent a few hours looking for alternate configurations, including rooting through the CORS and Helmet official documentation as well as stackOverflow and OWASP,
and generally all they seemed to change was the headers being used, while keeping the structure virtually the same, especially for JSON-only APIs.
That in mind, I'm not sure if I made enough adjustments, and in the case of CORS there wasn't really anything that I could find that needed to be changed.
In terms of OWASPs documentation all I could really find in terms of API security was just general overall config rules and best practices for how JSON data is handled,
with only smaller sections dedicated to helmet and CORS if any
