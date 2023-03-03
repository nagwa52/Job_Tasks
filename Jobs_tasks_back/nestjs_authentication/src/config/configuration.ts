export default () => ({
  port: parseInt(process.env.PORT, 10) || 5432,
  database: {
    uri: process.env.DATABASE_URI,
  },
  keys: {
    // process.env.PRIVATE_KEY?.replace(/\\n/gm, "\n")
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
  }
});
