"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 5432,
    database: {
        uri: process.env.DATABASE_URI,
    },
    keys: {
        privateKey: process.env.PRIVATE_KEY,
        publicKey: process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
    }
});
//# sourceMappingURL=configuration.js.map