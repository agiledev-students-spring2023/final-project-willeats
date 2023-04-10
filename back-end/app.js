const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")
const cors = require('cors')
const axios = require("axios")
// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
// require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests

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

const upload = multer({dest: "./public/uploads" })

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
    resp.status(200).send({message: 'edit successfully'})
});


app.post('/createuserreview', upload.array("image"), (req, resp) => {
    console.log(req.files)
    console.log(req.body)
    resp.status(200).send({message: 'create successfully'})
});
app.get('/getuser', async(req,res)=>{
    try{
        const response = await axios.get(`${process.env.MOCKAROO_USER}?key=${process.env.MOCKAROO_API_KEY_4}`);
        res.json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send('An error occured');
    }
})

app.get('/getbuisness', async(req,res)=>{
    try{
        const response = await axios.get(`${process.env.MOCKAROO_BUSINESS}?key=${process.env.MOCKAROO_API_KEY_4}`);
        res.json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send('An error occured');
    }

})

app.post('/deleteuserreview', (req, resp) => {
    resp.status(200).send({message: 'delete successfully'})
})


app.get('/getmenu', async(req,res)=>{
    try{
        const response = await axios.get(`${process.env.MOCKAROO_MENU}?key=${process.env.MOCKAROO_API_KEY_1}`);
        res.json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send('An error occured');
    }
})


app.get('/getrate', async(req,res)=>{
    try{
        const response = await axios.get(`${process.env.MOCKAROO_RESTAURANT_FEES_RATES}?key=${process.env.MOCKAROO_API_KEY_4}`);
        res.json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send('An error occured');
    }

})




app.post('/api/delete-menu-item', (req, res) => {
    const id = req.body.id;
    console.log(`Deleting menu item with ID ${id}`);
    res.sendStatus(200);
  });


app.get('/getname', async(req,res)=>{
    try{
        const response = await axios.get(`${process.env.MOCKAROO_RESTAURANT_NAME}?key=${process.env.MOCKAROO_API_KEY_1}`);
        res.json(response.data);
    }catch(error){
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


module.exports = app