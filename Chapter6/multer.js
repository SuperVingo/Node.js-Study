const M = require('minimatch');
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.base)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})
/////////////////////////////////////////
const fs = require('fs');
const { append } = require('vary');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req,file, req.body);
    res.send('ok');
});