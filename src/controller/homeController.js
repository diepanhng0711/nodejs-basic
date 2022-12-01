import pool from "../configs/connectDB"
import multer from 'multer'

let getHomePage = async (req, res) => {
    // Xử lý logic ở Controller
    const [rows, fields] = await pool.execute('SELECT * FROM `users` ')
    return res.render('index.ejs', { dataUser: rows, testString: 'abcxyzmnpq' })
}

let getName = (req, res) => {
    return res.send('justPhuongLyy')
}

let getDetailPage = async (req, res) => {
    let id = req.params.id
    let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id])
    console.log('Check request parameters: ', user)
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body
    await pool.execute('INSERT INTO `users` (firstName, lastName, email, address) VALUES (?, ?, ?, ?)', [firstName, lastName, email, address])
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId
    await pool.execute('DELETE FROM `users` WHERE id = ?', [userId])
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id 
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])

    return res.render('update.ejs', {dataUser: user[0]})
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body
    await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?', [firstName, lastName, email, address, id]) 
    return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}

let handleUploadMultipleFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}

module.exports = {
    getHomePage,
    getName,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles,
}