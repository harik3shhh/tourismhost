// const User = require("../models/user-model");
const userModel = require("../models/user-model");
const { hashPassword, comparePassword } = require("../helpers/helper")
const JWT = require("jsonwebtoken");


// *------------*
// REGISTRATION KA LOGIC
// *------------*


const register = async(req, res) =>{
    try {
        const {name, email, phone, password } = req.body;
    if(!name){
        res.send({message: "Name is Required"});
    }

    if(!email){
        res.send({message: "Email is Required"});
    }

    if(!phone){
        res.send({message: "Phone Number is Required"});
    }

    if(!password){
        res.send({message: "Password is Required"});
    }

  
    //CHECK FOR EXISTING USER
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(200).send({
            success: false,
            message: "User Already Exists!!!"
        });
    }

    //hashing
    const hashedPassword = await hashPassword(password);

    //saving new user
    const user = await userModel.create({
        name, email, phone, password:hashedPassword
    });

    res.status(201).send({
        success: true, 
        message: "User Registration Successfull",
        user
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register",
            error
        });
    }

};


// *------------*
// LOGIN KA LOGIC
// *------------*

const login = async(req, res) => {
    try {

        //validation
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        //check if user exists or not
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        // match password 
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        // Generate token if logged in successfull
        const token = await JWT.sign(
            {_id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "3d",});

            console.log("Login Success");
            res.status(200).send({
            success: true,
            message: "Login Successfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};



//test controller
const testController = (req, res) => {
    console.log("Procted routes");
    res.send("Protected route with token")
}



// UPDATE PROFILE CONTROLLER 
const updateProfileController = async(req, res)=>{
    try {
        const {name, email, password, phone} = req.body;
        const user = await userModel.findById(req.user._id);
        // password
        if(password && password.length < 6){
            return res.json({error: "Password is required and min 6 char"})
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            // address: address || user.address
        } , {new:true});

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile in profile controller",
            error
        })
    }
};

module.exports = {register, login, testController, updateProfileController};