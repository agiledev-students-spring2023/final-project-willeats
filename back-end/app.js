const { User, Review, Restaurant, Dish } = require('./db.js');

const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")
const cors = require('cors')
const axios = require("axios")
// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
// require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');
const mongoose = require("mongoose")
/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

require("dotenv").config({ silent: true })
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors())
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("public"))

const upload = multer({ dest: "./public/uploads" })

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

    axios.get(`${process.env.MOCKAROO_PAST_REVIEW}?key=${process.env.MOCKAROO_API_KEY_1}`)
        .then((res) => {
            resp.status(200).send(res.data)
        })
        .catch((err) => {
            console.log(err)
            resp.status(500).send()
        })
});

app.get('/userpastorder', (req, resp) => {
    axios.get(`${process.env.MOCKAROO_USER_REVIEW}?key=${process.env.MOCKAROO_API_KEY_1}`)
        .then((res) => {
            resp.status(200).send(res.data)
        })
        .catch((err) => {
            console.log(err)
            resp.status(500).send()
        })
});

app.post('/edituserreview', (req, resp) => {
    console.log(req.body.saveData)
    resp.status(200).send({ message: 'edit successfully' })
});


app.post('/createuserreview', upload.array("image"), (req, resp) => {
    console.log(req.files)
    console.log(req.body)
    resp.status(200).send({ message: 'create successfully' })
});
app.get('/getuser', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.MOCKAROO_USER}?key=${process.env.MOCKAROO_API_KEY_4}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occured');
    }
})

app.get('/getbuisness', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.MOCKAROO_BUSINESS}?key=${process.env.MOCKAROO_API_KEY_4}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occured');
    }

})

app.post('/deleteuserreview', (req, resp) => {
    resp.status(200).send({ message: 'delete successfully' })
})

app.get('/getrate', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.MOCKAROO_RESTAURANT_FEES_RATES}?key=${process.env.MOCKAROO_API_KEY_4}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occured');
    }

})

app.post('/api/delete-menu-item', (req, res) => {
    const id = req.body.id;
    console.log(`Deleting menu item with ID ${id}`);
    res.sendStatus(200);
});


app.get('/getname', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.MOCKAROO_RESTAURANT_NAME}?key=${process.env.MOCKAROO_API_KEY_1}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occured');
    }
})


// app.post('/api/edit-menu-items/:id', (req, res) => {
//     const itemId = req.params.id;
//     const { name, description, price } = req.body;

//     // Do something with the updated data here (e.g. update the menu item in the database)
//     console.log(`Updated menu item ${itemId}: { name: ${name}, description: ${description}, price: ${price} }`);

//     res.status(200).json({ message: 'Menu item updated successfully.' });
// });

app.get("/", (req, res) => {
    res.send("Blank page")
})

app.get('/reviewDetails', (req, res) => {
    axios
        .get(`${process.env.MOCKAROO_PAST_REVIEW}?key=${process.env.MOCKAROO_API_KEY_1}`)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Error retrieving reviews');
        });
});

app.get('/testConnection', (req, res) => {
    Restaurant.find({})
        .then(restaurants => {
            return res.json(restaurants);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        });
});

app.post('/Login-C', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordValid = (password === user.password);
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email, role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
})

app.post('/Login-M', async (req, res) => {
    const { email, password } = req.body;

    const manager = await Restaurant.findOne({ email });
    const isPasswordValid = (password === manager.password);
    console.log(manager)
    // const isPasswordValid = await bcrypt.compare(password, manager.password);
    if (!manager || !isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email, role: 'manager' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
})

app.get('/Sign-C', async (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    try {
        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (existingUser) {
            console.log('exist')
            res.status(200).json({ exists: true, registeredName: existingUser.username });
        } else {
            console.log('non')
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// app.post('/api/edit-menu-items/:id', function(req, res) {
//     const id = req.params.id;
//     const {name,type,price,description} = req.body;
//     console.log(data);
//     Dish.findByIdAndUpdate(id, {"name":name,"description":description,"price":price,"type":type}, { new: true })
//       .then(dish => {
//         if (!dish) {
//           res.status(404).json({ error: 'Dish not found' });
//         } else {
//           console.log("----------------------------",dish)
//           res.json(dish);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//       });
//   });

app.post('/api/edit-menu-items/:id',
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('type').notEmpty().withMessage('Type cannot be empty'),
        body('price')
            .notEmpty().withMessage('Price cannot be empty')
            .toFloat().withMessage('Price must be a number')
            .isFloat().withMessage('Price must be a decimal number'),
        body('description').notEmpty().withMessage('Description cannot be empty'),
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

        if (id !== "null") {
            Dish.updateOne({ _id: id }, {
                $set: {
                    name: data.name,
                    type: data.type,
                    price: parseFloat(data.price),
                    description: data.description
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
                                    photo: []
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


                    // Create new dish object with input data and restaurant ID

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
                                    // Send the menu items as the response
                                    //console.log(menu)
                                    res.json(menu);
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

module.exports = app