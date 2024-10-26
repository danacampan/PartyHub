import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userSchema.js';
import authMiddleware from '../utils.js';
dotenv.config();

const userRouter = express();

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

userRouter.post('/signup', async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch {
    res.status(500).send('Error signing up');
    console.log('Error at signup');
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) {
      res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({
      token,
      user: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    //res.status(500).json({ error: 'Login failed' });
    console.log('Login failed');
  }
});

userRouter.delete('/:id', authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.send({ message: 'Deleted user' });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

export default userRouter;
