export default function robots() {
    const baseUrl = "https://techiehelpinstitute.com"; // Replace with actual domain

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/dashboard/private"], // Adjust private routes as needed
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
