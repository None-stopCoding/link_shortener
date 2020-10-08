const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express()
// добавляем новый middleware json дял корректного парсига тела запроса req.body
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (response, request) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch(e) {
        console.log('Server error', e.message);
        // Завершаем процесс
        process.exit(1);
    }
}

start()