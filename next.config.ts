import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    // Linting is handled via `npm run lint` (flat config).
    // Built-in ESLint during build conflicts with flat config format.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type checking handled via `tsc --noEmit`.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
