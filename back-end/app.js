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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
const mongoose = require('mongoose');
/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

require("dotenv").config({ silent: true })
const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId : process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors())
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("public"))

const upload = multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read-write',
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
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

    axios.get(`${process.env.MOCKAROO_PAST_REVIEW}?key=${process.env.MOCKAROO_API_KEY_1}`)
        .then((res) => {
            resp.status(200).send(res.data)
        })
        .catch((err) => {
            console.log(err)
            resp.status(500).send()
        })
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token == null) return resp.sendStatus(401)
    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if(err){
    //         resp.status(401).json({error: "unauthorized"})
    //     }else{
    //         Review.find({userId: mongoose.Types.ObjectId(decoded.userid)})
    //         .populate('userId')
    //         .populate({
    //             path: 'dishId',
    //             populate: {path: 'restaurant'}
    //         })
    //         .sort({date: -1})
    //         .exec(function(err, result) {
    //             if(err){
    //                 resp.status(500).json({error: "failed to retrieve review"})
    //             }else{
    //                 const returnReview = []
    //                 result.forEach((e) => {
    //                     const res = {}
    //                     res.name = e.dishId.restaurant.name
    //                     res.itemName = e.dishId.name
    //                     res.review = e.review
    //                     res.star = e.rating
    //                     res.date = e.date.getMonth().toString() + '/' + e.date.getDate().toString() + '/' + e.date.getFullYear().toString()
    //                     res.reviewImage = e.image
    //                     res.reviewId = e._id
    //                     //restaurant image
    //                 })
    //                 resp.status(500).json(returnReview)
    //             }
    //         })
    //     }

    // })
    
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
        if(err){
            resp.status(401).json({error: "unauthorized"})
        }else{
            Order.find({user: mongoose.Types.ObjectId(decoded.userid)})
            .populate('user')
            .populate('dish')
            .populate('restaurant')
            .sort({date: -1})
            .exec(function(err, order){
                if(!err){
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
                }else{
                    resp.status(500).json({error: 'failed to find order'})
                }
            })
        }
    })
});

app.post('/edituserreview', upload.array("image", 9), (req, resp) => {
    console.log(req.body)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return resp.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            resp.status(401).json({error: "unauthorized"})
        }else{
            const img = JSON.parse(req.body.preimage)
            if(req.files){
                req.files.forEach((e) => {
                    img.push(e.location)
                })
            }
            Review.findByIdAndUpdate(req.body.id, 
                                    {rating: req.body.rating, 
                                    review: req.body.review,
                                    image: img},
                                    function(err, result){
                                        if(err){
                                            resp.status(500).json({error: "edit review failed"})
                                        }else{
                                            resp.status(200).json({message: "successfully edit review"})
                                        }
                                    })
        }
    })
});


app.post('/createuserreview', upload.array("image", 9), (req, resp) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return resp.sendStatus(401)
    console.log(req.files)
    console.log(req.body)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded ) => {
        if(err){
            resp.status(401).json({error: "unauthorized"})
        }else{
            Dish.findOne({name: req.body.itemName})
            .then((dish) => {
                const img = []
                req.files.forEach((e) => {
                    img.push(e.location)
                })
                const review = new Review({
                    itemName : req.body.itemName,
                    review: req.body.review,
                    dishId: dish.id,
                    userId: mongoose.Types.ObjectId(decoded.userid),
                    image: [...img],
                    rating: parseInt(req.body.rating)
                })
                review.save()
                .then((result) => {
                    resp.status(200).send({success: "save database success"})
                })
                .catch(err => {
                    resp.status(500).json({error: "save database error"})
                })
            })
            .catch((err) => {
                console.log(err)
                resp.status(500).json({error: "no such dish"})
            })
        }
      })
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
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return resp.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            resp.status(401).json({error: "unauthorized"})
        }else{
            Review.findOneAndDelete({_id : req.body.id, userId: mongoose.Types.ObjectId(decoded.userid)})
            .exec(function(err, result) {
                if(err){
                    resp.status(500).send({message: "delete review failed"})
                }else{
                    resp.status(200).send({message: "delete review successfully"})
                }
            })
        }
    })
    resp.status(200).send({ message: 'delete successfully' })
})


app.get('/getmenu', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.MOCKAROO_MENU}?key=${process.env.MOCKAROO_API_KEY_1}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occured');
    }
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


app.post('/api/edit-menu-items/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, description, price } = req.body;

    // Do something with the updated data here (e.g. update the menu item in the database)
    console.log(`Updated menu item ${itemId}: { name: ${name}, description: ${description}, price: ${price} }`);

    res.status(200).json({ message: 'Menu item updated successfully.' });
});

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
    if (!user){
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // const isPasswordValid = (password === user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const userid = user.id
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userid ,email, role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
})

app.post('/Login-M', async (req, res) => {
    const { email, password } = req.body;
    const manager = await Restaurant.findOne({ email });
    if (!manager){
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // const isPasswordValid = (password === manager.password);
    console.log(manager)
    const isPasswordValid = await bcrypt.compare(password, manager.password);
    const managerid = manager.id
    if ( !isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ managerid, email, role: 'manager' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
})

app.get('/Sign-C', async (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    console.log(name)
    console.log(email)
    try {
        const existingUser = await User.findOne(
            name != undefined ? { name } : { email }
        );
        if (existingUser) {
            console.log('exist')
            res.status(200).json({ exists: true, registeredName: existingUser.name });
        } else {
            console.log('non')
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/Sign-M', async (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    try {
        const existingUser = await Restaurant.findOne(
            name != undefined ? { name } : { email }
        );
        if (existingUser) {
            console.log('exist')
            res.status(200).json({ exists: true, registeredName: existingUser.name });
        } else {
            console.log('non')
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/sign-M', async (req, res) => {
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
        res.status(500).json({ success: false, message: 'An error occurred while signing up.' });
    }
});

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
      res.status(500).json({ success: false, message: 'An error occurred while signing up.' });
    }
  });


// start server
app.listen(3002, () => {
    console.log('Server started on port 3002');
});

module.exports = app