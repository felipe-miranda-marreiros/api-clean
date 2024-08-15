export const DEFAULT_PORT = 5050

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/clean-node-api',
  port: process.env.PORT || DEFAULT_PORT,
  jwtScret: process.env.JWT_SECRET || 'asd8789==d'
}
