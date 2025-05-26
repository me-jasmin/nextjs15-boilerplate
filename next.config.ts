import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';



import path from 'path';





const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    transpilePackages: ['@tabler/icons-react'],
    sassOptions: {
        implementation: 'sass-embedded',
        additionalData: `@use "${path.join(process.cwd(), './src/assets/styles/global.scss').replace(/\\/g, '/')}" as global;`,
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
};

export default withNextIntl(nextConfig);