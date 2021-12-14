module.exports = {
  reactStrictMode: true,
  env: {
    // STRAPI_URL: "http://localhost:1337",
    STRAPI_URL: "https://superadmin.stratumbespoke.com",
    STRIPE_API_KEY:
      "pk_test_51Jeiv2DbvHxMv9i4DpRvJ4E52jiDyQpMilWZ8R8xCFhvV37KfYDfFCDDeyY51QE7eakXqH5shn1UZtY1buVJLLH400xmfb6TGZ",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
