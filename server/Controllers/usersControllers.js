const users = require("../models/userSchema")
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL

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
    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const activity = req.query.activity || ""
    const sort = req.query.sort || ""

    const query = {
        fname: { $regex: search, $options: "i" }
    }
    if (gender != "All") {
        query.gender = gender
    }
    if (activity != "All") {
        query.activity = activity
    }
    try {
        console.log(req.query)
        const usersdata = await users.find(query).sort({ datecreated: sort == "new" ? -1 : 1 });
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

exports.useractivity = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const userstatusupdate = await users.findByIdAndUpdate({ _id: id }, { activity: data }, { new: true });
        res.status(200).json(userstatusupdate)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.userExport = async (req, res) => {
    try {
        const usersdata = await users.find();


        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("public/files/export/")) {
            if (!fs.existsSync("public/files")) {
                fs.mkdirSync("public/files/");
            }
            if (!fs.existsSync("public/files/export")) {
                fs.mkdirSync("./public/files/export/");
            }
        }

        const writablestream = fs.createWriteStream(
            "public/files/export/users.csv"
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: `${BASE_URL}/files/export/users.csv`,
            });
        });
        if (usersdata.length > 0) {
            usersdata.map((user) => {
                csvStream.write({

                    FirstName: user.fname ? user.fname : "-",
                    LastName: user.lname ? user.lname : "-",
                    Email: user.email ? user.email : "-",
                    Phone: user.mobile ? user.mobile : "-",
                    Gender: user.gender ? user.gender : "-",
                    Status: user.activity ? user.activity : "-",
                    Profile: user.profile ? user.profile : "-",
                    Location: user.location ? user.location : "-",
                    DateCreated: user.datecreated ? user.datecreated : "-",
                    DateUpdated: user.dateUpdated ? user.dateUpdated : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
}