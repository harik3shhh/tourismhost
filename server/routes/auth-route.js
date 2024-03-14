const express = require("express");
const {register, login, testController, updateProfileController} = require("../controllers/auth-controller");
const {requireSignIn, isAdmin} = require("../middlewares/auth-middleware");


const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);


// testing protected routes
router.route("/test").get(requireSignIn, isAdmin, testController);

// dashboard route
router.get("/user-auth", requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
});

//admin dashboard
router.get("/admin-auth", requireSignIn,isAdmin, (req, res)=>{
    res.status(200).send({ok: true});
});

// UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController)

module.exports = router;