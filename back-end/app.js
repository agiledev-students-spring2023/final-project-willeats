const { User, Review, Restaurant, Dish, Order } = require('./db.js');

const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")
const cors = require('cors')
const axios = require("axios")
// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
// require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const jwt = require('jsonwebtoken'); // middleware to write token
const { body, param, check, validationResult } = require('express-validator');
const mongoose = require("mongoose")
const bcrypt = require('bcrypt'); // middleware to encode password
const saltRounds = 10; // specify password security level
const multerS3 = require('multer-s3')

const bodyParser = require('body-parser');

const { S3Client } = require('@aws-sdk/client-s3')
/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

require("dotenv").config({ silent: true })
const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})



// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB database!');
});



// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors())
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"))

const upload = multer({
    storage: multerS3({

        s3: s3,
        acl: 'public-read-write',
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})


const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

app.get('/userpastreview', (req, resp) => {

    // axios.get(`${process.env.MOCKAROO_PAST_REVIEW}?key=${process.env.MOCKAROO_API_KEY_1}`)
    //     .then((res) => {
    //         resp.status(200).send(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         resp.status(500).send()
    //     })
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return resp.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            resp.status(401).json({ error: "unauthorized" })
        } else {
            Review.find({ userId: new mongoose.Types.ObjectId(decoded.userid) })
                .populate('userId')
                .populate({
                    path: 'dishId',
                    populate: { path: 'restaurant' }
                })
                .sort({ date: -1 })
                .then((result) => {

                    const returnReview = []
                    result.forEach((e) => {
                        const res = {}
                        res.name = e.dishId.restaurant.name
                        res.itemName = e.dishId.name
                        res.review = e.review
                        res.star = e.rating
                        res.date = e.date.getMonth().toString() + '/' + e.date.getDate().toString() + '/' + e.date.getFullYear().toString()
                        res.reviewImage = e.image
                        res.reviewId = e.id
                        res.userId = e.userId.id
                        if (e.userId.id === decoded.userid) {
                            res.isUser = true
                        } else {
                            res.isUser = false
                        }
                        returnReview.push(res)
                        //restaurant image
                    })
                    resp.status(200).json(returnReview)

                })
                .catch(err => {
                    console.log(err)
                    resp.status(500).json({ error: "failed to retrieve review" })
                })

        }

    })

});


app.get('/userpastorder', (req, resp) => {
    // axios.get(`${process.env.MOCKAROO_USER_REVIEW}?key=${process.env.MOCKAROO_API_KEY_1}`)
    //     .then((res) => {
    //         resp.status(200).send(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         resp.status(500).send()
    //     })
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return resp.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            resp.status(401).json({ error: "unauthorized" })
        } else {
            if (decoded.role === 'customer') {
                Order.find({ user: new mongoose.Types.ObjectId(decoded.userid) })
                    .populate('user')
                    .populate('dish')
                    .populate('restaurant')
                    .sort({ date: -1 })
                    .then((order) => {

                        const result = []
                        order.forEach((e) => {
                            const res = {}
                            res.name = e.restaurant.name
                            res.id = e._id
                            res.date = e.date.getMonth().toString() + '/' + e.date.getDate().toString() + '/' + e.date.getFullYear().toString()
                            res.itemList = []
                            e.dish.forEach(ele => {
                                res.itemList.push(ele.name)
                            })
                            result.push(res)
                        })
                        resp.status(200).json(result)

                    })
                    .catch(err => {
                        console.log(err)
                        resp.status(500).json({ error: 'failed to find order' })
                    })
            } else {
                resp.redirect('/')
            }
        }
    })
})

    app.get('/userpastorder/:userId', async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            const orders = await Order.find({ user: userId });
            res.status(200).send(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }

    });

    app.post('/edituserreview', upload.array("image", 9), (req, resp) => {
        console.log(req.body)
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return resp.sendStatus(401)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                resp.status(401).json({ message: "unauthorized" })
            } else {
                if (decoded.role === 'customer') {
                    let img = JSON.parse(req.body.preimage)
                    const regex = new RegExp('blob');
                    const newImg = []
                    img.forEach((e) => {
                        if (!regex.test(e)) {
                            newImg.push(e)
                        }
                    })
                    console.log(newImg)
                    if (req.files) {
                        req.files.forEach((e) => {
                            newImg.push(e.location)
                        })
                    }
                    console.log(newImg)
                    Review.findByIdAndUpdate(req.body.id,
                        {
                            rating: parseInt(req.body.rating),
                            review: req.body.review,
                            image: newImg
                        })
                        .then((result) => {
                            resp.status(200).json({ message: "successfully edit review" })
                        })
                        .catch(err => {
                            resp.status(500).json({ message: "edit review failed" })
                        })

                } else {
                    resp.redirect('/')
                }
            }
        })
    });


    app.post('/createuserreview', upload.array("image", 9), (req, resp) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return resp.sendStatus(401)
        console.log(req.files)
        console.log(req.body)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                resp.status(401).json({ error: "unauthorized" })
            } else {
                if (decoded.role === 'customer') {
                    Dish.findOne({ name: req.body.itemName })
                        .then((dish) => {
                            const img = []
                            req.files.forEach((e) => {
                                img.push(e.location)
                            })
                            console.log(img)
                            const review = new Review({

                                itemName: req.body.itemName,
                                review: req.body.review,
                                dishId: dish.id,
                                userId: new mongoose.Types.ObjectId(decoded.userid),
                                image: [...img],
                                rating: parseInt(req.body.rating)
                            })
                            review.save()
                                .then((result) => {
                                    resp.status(200).send({ success: "save database success" })
                                })
                                .catch(err => {
                                    console.log(err)
                                    resp.status(500).json({ error: "save database error" })
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                            resp.status(500).json({ error: "no such dish" })
                        })
                } else {
                    resp.redirect('/')
                }
            }
        })
        // resp.status(200).send({ message: 'create successfully' })
    });


    app.get('/getuser', async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).send(users);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }
    })

    app.get('/getbuisness', async (req, res) => {
        try {
            const restaurants = await Restaurant.find({});
            res.status(200).send(restaurants);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }

    })

    app.post('/deleteuserreview', (req, resp) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return resp.sendStatus(401)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                resp.status(401).json({ error: "unauthorized" })
            } else {
                Review.findOneAndDelete({ _id: req.body.id, userId: mongoose.Types.ObjectId(decoded.userid) })
                    .exec(function (err, result) {
                        if (err) {
                            resp.status(500).send({ message: "delete review failed" })
                        } else {
                            resp.status(200).send({ message: "delete review successfully" })
                        }
                    })
            }
        })
        resp.status(200).send({ message: 'delete successfully' })
    })

    app.get('/getrate', async (req, res) => {
        try {
            const rates = await Restaurant.find({}, 'deliveryFee taxRate');
            res.status(200).send(rates);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }
    })

    app.post('/api/delete-menu-item', (req, res) => {
        const id = req.body.id;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log(`Deleting menu item with ID ${id}`);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                Dish.findByIdAndDelete(id)
                    .then((deletedDocument) => {
                        res.status(200).json({ message: `Successfully deleted document with ID: ${deletedDocument._id}` })
                        console.log(`Successfully deleted document with ID: ${deletedDocument._id}`);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
    });

    app.post('/api/delete-menu-category', (req, res) => {
        const type = req.body.category;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log(`Deleting menu item with category ${type}`);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                Restaurant.findOne({ email: decoded.email })
                    .then(restaurant => {
                        if (!restaurant) {
                            res.status(404).json({ error: 'Restaurant not found' });
                        } else {
                            // Find the menu items for the restaurant using the restaurant's _id as a foreign key
                            Dish.deleteMany({ restaurant: restaurant._id, type: type })
                                .then(result => {
                                    res.status(200).json(result);
                                })
                                .catch(err => {
                                    console.error(err);
                                    res.status(500).json({ error: 'Server error' });
                                });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: 'Server error' });
                    });
            }
        })
    });


    app.get('/getname', async (req, res) => {
        try {
            const restaurants = await Restaurant.find({}, 'name');
            res.status(200).send(restaurants);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }
    })

    app.get("/", (req, res) => {
        res.send("Blank page")
    })

    app.get('/reviewDetails/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const review = await Review.findById(id);
            if (!review) {
                return res.status(404).send('Review not found');
            }
            res.status(200).send(review);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }
    });



    app.post('/Login-C', async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        const userid = user.id
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userid, email, role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    })

    app.post('/Login-M', async (req, res) => {
        const { email, password } = req.body;
        const manager = await Restaurant.findOne({ email });
        if (!manager) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, manager.password);
        const managerid = manager.id
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ managerid, email, role: 'manager' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    })


    app.post('/Sign-C', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            await user.save();
            console.log('success')
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'An error occurred while signing up restuarant.' });
        }
    });



    app.post('/Sign-M', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const manager = new Restaurant({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            await manager.save();
            console.log('success')
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'An error occurred while signing up customer.' });
        }
    });

    app.get('/Profile-C-Email', (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            const userid = decoded.userid;
            const user = User.findById(userid).then(user => {
                res.status(200).send({ email: user.email });
            })
            console.log(user.email);


        });
    });

    app.post('/Profile-C-Email', (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            try {
                const result = await User.findOneAndUpdate(
                    { _id: decoded.userid },
                    { email: req.body.email },
                    { new: true }
                );
                console.log(decoded.userId);

                if (!result) {
                    return res.sendStatus(404); // Not Found
                }
                res.status(200).send({ email: result.email });
            } catch (error) {
                console.error(error);
                res.sendStatus(500); // Internal Server Error
            }
        });
    });

    app.get('/Profile-M-Email', (req, res) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            const managerid = decoded.managerid;
            console.log(managerid)
            const manager = Restaurant.findById(managerid).then(manager => {
                res.status(200).send({ email: manager.email });
            })
            console.log(manager.email);
        });
    });

    app.post('/Profile-M-Email', (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            try {
                const result = await Restaurant.findOneAndUpdate(
                    { _id: decoded.managerid },
                    { email: req.body.email },
                    { new: true }
                );

                if (!result) {
                    return res.sendStatus(404); // Not Found
                }
                res.status(200).send({ email: result.email });
            } catch (error) {
                console.error(error);
                res.sendStatus(500); // Internal Server Error
            }
        });
    });

    app.get('/profile-image-C', (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            try {
                const user = await User.findById(decoded.userid);
                if (!user || !user.avatar) {
                    // Return a default avatar image URL if the user or the avatar URL is not found
                    return res.status(200).send({ imageUrl: 'not successful' });
                }
                res.status(200).send({ imageUrl: user.avatar });
            } catch (error) {
                console.error(error);
                res.sendStatus(500); // Internal Server Error
            }
        });
    });

    app.get('/profile-image-M', (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            try {
                const manager = await Restaurant.findById(decoded.managerid);
                if (!manager || !manager.avatar) {
                    // Return a default avatar image URL if the user or the avatar URL is not found
                    return res.status(200).send({ imageUrl: 'https://example.com/default-avatar.png' });
                }
                res.status(200).send({ imageUrl: manager.avatar });
            } catch (error) {
                console.error(error);
                res.sendStatus(500); // Internal Server Error
            }
        });
    });

    app.post('/profile-image-C', upload.single('image'), (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            try {
                const user = await User.findById(decoded.userid);
                if (!user) {
                    return res.sendStatus(404); // Not Found
                }
                console.log('11111');
                user.avatar = req.file.location; // Set the profileImage property of the user document to the path of the uploaded file
                await user.save(); // Save the updated user document to the database
                console.log('2222');


                res.status(200).send({ imageUrl: req.file.location });
            } catch (error) {
                console.error(error);
                res.sendStatus(500); // Internal Server Error
            }
        });
    });

    app.post('/profile-image-M', upload.single('image'), (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401); // Unauthorized
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            try {
                const manager = await Restaurant.findById(decoded.managerid);
                if (!manager) {
                    return res.sendStatus(404); // Not Found
                }
                manager.avatar = req.file.location; // Set the profileImage property of the user document to the path of the uploaded file

                await manager.save(); // Save the updated user document to the database
                res.status(200).send({ imageUrl: req.file.location });
            } catch (error) {
                console.error(error);
                res.sendStatus(500); // Internal Server Error
            }
        });
    });

    app.post('/api/edit-menu-items/:id', upload.single("images[0]"),
        [
            check('name').notEmpty().withMessage('Name cannot be empty'),
            check('type').notEmpty().withMessage('Type cannot be empty'),
            check('price')
                .notEmpty().withMessage('Price cannot be empty')
                .toFloat().withMessage('Price must be a number')
                .isFloat().withMessage('Price must be a decimal number'),
            check('description').notEmpty().withMessage('Description cannot be empty'),
        ],
        function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: "invalid input detected" });
            }


            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            // console.log(token)
            const id = req.params.id;
            console.log(id)
            const data = req.body;
            console.log(req.body.price)

            if (id !== "null") {
                Dish.updateOne({ _id: id }, {
                    $set: {
                        name: data.name,
                        type: data.type,
                        price: parseFloat(data.price),
                        description: data.description,
                        photo: req.file.location
                    }
                })
                    .then(result => {
                        if (result.nModified === 0) {
                            res.status(404).json({ error: 'Dish not found' });
                        } else {
                            console.log(result);
                            res.json({ message: 'Dish updated successfully' });
                        }
                    })
                    .catch(err => {
                        console.error("------------------------------------------------", err);
                        if (err.name === 'CastError') {
                            res.status(400).json({ error: 'Invalid input data' });
                        } else if (err.name === 'MongoError' && err.code === 11000) {
                            res.status(400).json({ error: 'Duplicate dish name' });
                        } else {
                            res.status(500).json({ error: 'Server error' });
                        }
                    });
            } else {
                // Verify JWT token and retrieve restaurant ID from payload
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ error: 'Unauthorized' });
                    } else {
                        Restaurant.findOne({ email: decoded.email })
                            .then(restaurant => {
                                if (!restaurant) {
                                    res.status(404).json({ error: 'Restaurant not found' });
                                } else {
                                    const restaurantId = restaurant._id;
                                    const newDish = new Dish({
                                        _id: new mongoose.Types.ObjectId(),
                                        name: data.name,
                                        type: data.type,
                                        price: parseFloat(data.price),
                                        description: data.description,
                                        restaurant: restaurantId,
                                        reviews: [],
                                        photo: req.file.location
                                    });

                                    // Insert new dish into database
                                    newDish.save()
                                        .then(result => {
                                            console.log(result);
                                            res.json({ message: 'Dish added successfully' });
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            if (err.name === 'MongoError' && err.code === 11000) {
                                                res.status(400).json({ error: 'Duplicate dish name' });
                                            } else {
                                                res.status(500).json({ error: 'Server error' });
                                            }
                                        });
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).json({ error: 'Server error' });
                            });

                    }

                });
            }
        });

    app.get('/getmenu', function (req, res) {
        // Extract the JWT token from the request query parameters
        const token = req.query.token;

        if (!token) {
            // Handle error if no token is provided
            res.status(401).json({ error: 'Missing token' });
        } else {
            // Verify the JWT token using the secret key
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    // Handle error if the JWT token is invalid
                    console.error(err);
                    res.status(401).json({ error: 'Invalid token' });
                } else {
                    // Search for the restaurant by email address
                    Restaurant.findOne({ email: decoded.email })
                        .then(restaurant => {
                            if (!restaurant) {
                                res.status(404).json({ error: 'Restaurant not found' });
                            } else {
                                // Find the menu items for the restaurant using the restaurant's _id as a foreign key
                                Dish.find({ restaurant: restaurant._id })
                                    .then(menu => {
                                        // Loop through each dish in the menu and calculate its average rating
                                        const menuWithRating = menu.map(async function (dish) {
                                            const reviews = await Review.find({ _id: { $in: dish.review } });
                                            let totalRating = 0;
                                            for (let j = 0; j < reviews.length; j++) {
                                                totalRating += reviews[j].rating;
                                            }
                                            const averageRating = reviews.length > 0 ? totalRating / reviews.length : 1;
                                            return { ...dish._doc, rating: averageRating };
                                        });

                                        // Wait for all the promises in the menuWithRating array to resolve and return the updated menu
                                        Promise.all(menuWithRating).then(updatedMenu => {
                                            console.log(updatedMenu);
                                            res.json(updatedMenu);
                                        }).catch(err => {
                                            console.error(err);
                                            res.status(500).json({ error: 'Server error' });
                                        });
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(500).json({ error: 'Server error' });
                                    });
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({ error: 'Server error' });
                        });
                }
            });

        }
    });


    app.get('/getReview/:id', (req, res) => {
        const dishId = req.params.id;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        // console.log(typeof(token))

        Review.find({ dishId }).populate('userId') // use populate to include the referenced user object
            .then((reviews) => {
                const reviewsWithDateString = reviews.map((review) => {
                    const reviewCopy = { ...review._doc };
                    const date = reviewCopy.date.toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' });
                    reviewCopy.date = date;
                    //console.log(reviewCopy)
                    reviewCopy.name = reviewCopy.userId.name; // add user's name to the review object
                    //delete reviewCopy.userId; // remove the userId field from the review object
                    let isUser;
                    if (token === null || token === "null") {
                        isUser = false;
                    } else {
                        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                            if (!err) {
                                if (decoded.userid === reviewCopy.userId._id.toString()) {
                                    isUser = true;
                                } else {
                                    isUser = false;
                                }
                            } else {
                                isUser = false;
                            }
                        })
                    }
                    reviewCopy.isUser = isUser
                    return reviewCopy;
                });
                console.log(reviewsWithDateString.length)
                res.json(reviewsWithDateString);
                //console.log(`Reviews for dish ${dishId}:`, reviewsWithDateString);
            })
            .catch((err) => {
                res.status(500).json({ error: "server error" });
                console.error(err);
            });
    });

    app.post('/api/sendReply', async (req, res) => {
        try {
            const { reviewId, replyText } = req.body;
            const review = await Review.findById(reviewId);

            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }

            review.reply = replyText;
            await review.save();

            return res.status(200).json({ message: 'Reply sent successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.get('/getReviewById/:id', async (req, res) => {
        try {
            const reviewId = req.params.id;
            console.log("-------------------------------", reviewId)
            const review = await Review.findById(reviewId);
            return res.status(200).json(review);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.get('/getMenuById/:id', async function (req, res) {
        try {
            const restaurantId = req.params.id;
            console.log("-------------------------------", restaurantId);
            const menu = await Dish.find({ restaurant: restaurantId });
            console.log(menu);

            // Create a new copy of the menu array with the rating property appended to each dish
            const menuWithRating = menu.map(async function (dish) {
                const reviews = await Review.find({ _id: { $in: dish.review } });
                // console.log(reviews)
                let totalRating = 0;
                for (let j = 0; j < reviews.length; j++) {

                    totalRating += reviews[j].rating;
                }
                // console.log('----',totalRating)
                const averageRating = reviews.length > 0 ? totalRating / reviews.length : 1;
                return { ...dish._doc, rating: averageRating };
            });

            // Wait for all the promises in the menuWithRating array to resolve and return the updated menu
            const updatedMenu = await Promise.all(menuWithRating);
            //   console.log(updatedMenu)
            return res.status(200).json(updatedMenu);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });



    app.get('/getRestaurantInfo/:id', async function (req, res) {
        const restaurantId = req.params.id;
        try {
            const restaurantId = req.params.id;
            console.log("-------------------------------", restaurantId)
            const info = await Restaurant.findById(restaurantId);
            console.log(info)
            return res.status(200).json(info);
        } catch (error) {
            console.log(error);
            console.log(restaurantId)
            return res.status(500).json({ message: 'Internal server error' });
        }
    });



    module.exports = app;