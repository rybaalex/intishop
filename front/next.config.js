/**
 * @type {{images: {domains: string[]}, webpack: boolean, experimental: {forceSwcTransforms: boolean}}}
 */

const nextConfig = {
    experimental: {
        forceSwcTransforms: true
    },
    images: {
        domains: ["localhost:3000", "213.139.210.18:3000"],
    },
    webpack: true
};

module.exports = nextConfig