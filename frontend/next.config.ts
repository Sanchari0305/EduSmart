/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Any call to /api/* on frontend
        destination: "http://localhost:8000/:path*", // Redirect to FastAPI backend
      },
    ];
  },
};

export default nextConfig;
