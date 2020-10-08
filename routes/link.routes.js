const {Router} = require('express')
const Link = require('../models/Link');
const shortid = require('shortid');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (request, response) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = request.body;
        const code = shortid.generate();

        const exists = await Link.findOne({ from });
        if (exists) {
            return response.json({ link: exists });
        }

        const to = baseUrl + '/t/' + code;
        const link = new Link({
            code, to, from, owner: request.user.userId
        });

        await link.save();
        response.status(201).json({ link });
    } catch(e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/', auth, async (request, response) => {
    try {
        const links = await Link.find({ owner: request.user.userId });
        response.json(links);
    } catch(e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/:id', auth, async (request, response) => {
    try {
        const link = await Link.findById(request.params.id);
        response.json(link);
    } catch(e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});


module.exports = router;