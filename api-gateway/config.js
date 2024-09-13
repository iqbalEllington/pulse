module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'ELLINGTONTEST',
    jwtIssuer: 'EllingtonProperties',
    jwtAudience: {
        internal: 'internal_clients',
        external: 'external_clients',
        mobile: 'mobile_apps'
    }
};
