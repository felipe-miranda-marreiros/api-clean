import app from './config/app'

const PORT = 5050
const HOSTNAME = `http://localhost:${PORT}`

app.listen(PORT, () => console.log(`Server running at ${HOSTNAME}`))
