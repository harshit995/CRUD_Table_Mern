const users = require("../models/userSchema")
const moment = require("moment");

//register user
exports.userpost = async (req, res) => {
    const file = req.file.filename;
    const { fname, lname, email, mobile, gender, location, activity } = req.body;

    if (!fname || !lname || !email || !mobile || !gender || !location || !activity || !file) {
        res.status(401).json("All Inputs is required")
    }

    try {
        const preuser = await users.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our databse")
        } else {

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new users({
                fname, lname, email, mobile, gender, location, activity, profile: file, datecreated
            });

            await userData.save();
            res.status(200).json(userData);
            console.log("User created successfully......")
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }
};

//user get
exports.userget = async (req, res) => {
    try {
        const usersdata = await users.find();
        res.status(200).json(usersdata)
    } catch (error) {
        res.status(401).json(error)
    }
}

//single user get
exports.singleuserget = async (req, res) => {
    const { id } = req.params;
    try {
        // console.log(params);
        const userdata = await users.findOne({ _id: id })
        // console.log(id);
        res.status(200).json(userdata)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//user edit
exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, mobile, gender, location, activity, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateupdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, gender, location, activity, profile: file, dateupdated
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        console.log("error")
    }
}

exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteuser = await users.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteuser)
    } catch (error) {
        console.log("error..")
    }
}