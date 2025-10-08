const app = require('./server/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Vakyalok Legal Main server running on port ${PORT}`);
});
