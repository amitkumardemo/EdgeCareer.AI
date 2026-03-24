export default function robots() {
    const baseUrl = "https://techiehelpinstituteofai.in"; 

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/dashboard/", "/admin/", "/internship/admin/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
