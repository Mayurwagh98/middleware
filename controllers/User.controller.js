const User = require("../models/User.model")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const signup = async(req, res) =>{
  
  let {username, password} = req.body

  let user = await User.findOne({username})

  try{
      if(user) return res.status(400).json({
        status: false,
        message:"User already exists"
      })

      let hashedPassword = await bcrypt.hash(password, 10)

      user = await User.create({username, password: hashedPassword})

      return res.status(201).json({
        status:true,
        message:"User registered"
      })

  }
  catch(error){
     return res.status(500).json({
      status:false,
      message:error.message
     })
  }
}

const login = async(req, res) =>{

  let {username, password} = req.body

  let user = await User.findOne({username})

    try {

        if(!user){
            return res.status(400).send({message: "User doesn't exists"})
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if(!matchPassword){
            return res.status(404).send({message: "Wrong Credentials"})
        }

        const token = jwt.sign({userID: user._id},'blah',{ expiresIn: '1h' })

        return res.status(200).send({message: "Login Successful!", token: token})
        
    } catch (error) {
        return res.status(500).send({message: error. message})
    }
}


const logout = (req,res) =>{
  
  return res.json({ message: 'Logged Out' });  

}

const home = (req, res) =>{
 return  res.status(200).json({ message: 'Welcome authenticated user' });
}


module.exports = {signup,login, logout, home}