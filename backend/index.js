// your_server_file.mjs
import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    res.json('text ok');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
