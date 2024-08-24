const express = require('express');
const mongoose = require('mongoose');
const Supplier = require('./model');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/makersharks').then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));



app.post('/api/supplier/create',async(req,res)=>{

    try {
        const supplier = await Supplier.create(req.body)
        res.status(201).json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
   
})



app.post('/api/supplier/query', async (req, res) => {
    const { location, nature_of_business, manufacturing_process } = req.body;

    try {
        const suppliers = await Supplier.find({
            location: location,
            nature_of_business: nature_of_business,
            manufacturing_processes: { $in: [manufacturing_process] }
           
            
        });
      
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



const portfinder = require('portfinder');

portfinder.getPortPromise()
  .then((port) => {
      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
      });
  })
  .catch((err) => {
      console.error('Could not find an available port: ', err);
  });