require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const app=express();
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('MongoDB connected...'))
.catch(err=>console.log(err));


app.use(authRoutes);
app.use(userRoutes);

// route to clear all users from the database
app.delete('/delete', async (req, res) => {
    try {
      await User.deleteMany();
      res.status(200).json({ message: 'All users deleted successfully' });
    } catch (err) {
      console.error('Error deleting users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.listen(8000,()=>{
    console.log('Server is up on port 8000');
}
);
