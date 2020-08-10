const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;

let user = require('../models/user-schema.js');

let ShelfSchema = require('../models/shelfSchema');
let postSchema = require('../models/postSchema')
const { isEmpty } = require('lodash');

router.post("/signup", (req, res) => {
    //Function here
    user.findOne({ email: req.body.email }).then(response => {
        user.findOne({ nickname: req.body.nickname }).then(response2 => {
            const { errors, isValid } = validateReg(req.body);

            if (!isValid) {
                return res.send({ errors });
            }
            else if (response) {
                errors.email = "Email already exists"
                return res.send({ errors });
            }
            else if (response2) {
                errors.nickname = "nickname already exists, pick a new one"
                return res.send({ errors });
            }
            else {

                const newUser = new user({
                    nickname: req.body.nickname,
                    email: req.body.email.toLowerCase(),
                    password: req.body.password,
                    ShelfId: new ObjectId()
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save().then(
                            res.send(newUser)
                        ).catch(err => res.json(err));
                    })
                })

                let shelf = new ShelfSchema({
                    _id: newUser.ShelfId,
                    nickname: newUser.nickname
                })

                shelf.save()
                    .catch(err => res.json(err))

            }
        })
    })
})

router.post('/login', (req, res) => {
    let errors = {}
    user.findOne({ email: req.body.email.toLowerCase() }).then(response => {
        if (!response) {
            errors.email = "email not found"
            return res.send({ errors })
        } else {
            bcrypt.compare(req.body.password, response.password).then(
                same => {
                    if (same) {
                        ShelfSchema.findOne({ _id: response.ShelfId }).then(account => {
                            return res.send({
                                valid: true,
                                token: account._id
                            })
                        })

                        // res.json({
                        //     // r: response.nickname,
                        //     // id: response.id,
                        //     // p: response.password
                        // })
                    } else {
                        errors.password = "incorrect password"
                        return res
                            .send({ errors });
                    }
                }
            )
        }

    })
})

// router.route('/create').post((req, res, next) => {
//     user.create(req.body, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             console.log(data)
//             res.json(data)
//         }
//     })
// });

router.post('/public', (req, res) => {
    postSchema.create(req.body, (error, data) => {
        if (error) {
            return error
        } else {
            res.send(data)
        }

    })
})

router.get('/posts', (req, res) => {
    postSchema.find({}).then(data => {
        return res.send(data)
    })

})

router.get('/:id', (req, res) => {
    ShelfSchema.findOne({ _id: req.params.id }).then(data => {
        return res.send({
            nickname: data.nickname,
            Shelf: data.Shelf
        })
    })
})



router.put('/change/:id', (req, res) => {
    ShelfSchema.findByIdAndUpdate(req.params.id, {
        $set: { 'Shelf': req.body }
    }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);

        } else {
            res.json(data)
            console.log('User updated successfully !')
        }


    })
})

router.post('/posts/delete/:id', (req, res) => {
    postSchema.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return error
        } else {
            res.send(data)
        }
    })
})
router.put('/posts/update/likes/:id', (req, res) => {
    postSchema.findByIdAndUpdate(req.params.id, {
        $set: { 'likes': req.body }
    }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);

        } else {
            res.json(data)
            console.log('User updated successfully !')
        }


    })
})

// router.route('/edit/:id').get((req, res) => {
//     user.findById(req.params.id, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })


// // Update Student
// router.route('/update/:id').put((req, res, next) => {
//     user.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, (error, data) => {
//         if (error) {
//             return next(error);
//             console.log(error)
//         } else {
//             res.json(data)
//             console.log('User updated successfully !')
//         }
//     })
// })
function validateLogin() {

}
function validateReg(data) {
    let errors = {}
    if (data.email === "") {
        errors.email = 'Email Field must be filled'
    }
    else if (!data.email.includes("@")) {
        errors.email = 'Valid Email must be used'
    }
    if (data.password.length < 8) {
        errors.password = 'password must be at least 8 characters'
    }
    else if (!data.password.match(/^[0-9a-zA-Z]+$/)) {
        errors.password = 'password must only contain numbers and letters'
    }
    if (data.nickname.length < 4) {
        errors.nickname = 'nickname must be more than 4 characters'
    }

    let isValid = isEmpty(errors);

    return {
        isValid,
        errors
    }
}

module.exports = router;