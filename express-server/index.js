import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
const app=express();
dotenv.config();

const PORT=process.env.PORT || 7000;
const MONGO_URL=process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})

const userSchema=new mongoose.Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  birthday: String,
  age: Number,
  gender: String,
  email: String
});

const usermodel=mongoose.model("users",userSchema);

app.get("/api/users",async(req,res)=>{
    try {
        const userData = await usermodel.find();
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
})

app.post("/api/users", async(req,res)=>{
    try {
        const userCount = await usermodel.countDocuments();
        const newId = userCount + 1;
        
        const newUser = new usermodel({ ...req.body, id: newId });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
})

app.put("/api/users/:id", async(req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const updatedUser = await usermodel.findOneAndUpdate(
            { id }, 
            req.body, 
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
})

app.delete("/api/users/:id", async(req,res)=>{
    try {
        const id = parseInt(req.params.id);
        await usermodel.findOneAndDelete({ id });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
})

