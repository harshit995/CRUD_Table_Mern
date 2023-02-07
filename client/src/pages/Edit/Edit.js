import React, { useEffect, useState } from "react";
import "./edit.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { singleuserget } from "../../services/Apis";

const Edit = () => {
  const [inputdata, setInputdata] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
  console.log(inputdata)

  const [activity, setActivity] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  console.log(preview)




  //Activity options
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  //setinput valu3e
  const setInputValue = (e) => {
    const { name, value } = e.target;

    setInputdata({ ...inputdata, [name]: value });
  };

  // Activity set
  const setActivityValue = (e) => {
    setActivity(e.value);
  };

  //profile
  const setprofile = (e) => {
    setImage(e.target.files[0]);
  };

  ///get id 
  const { id } = useParams();
  const userProfileget = async () => {

    const response = await singleuserget(id);

    if (response.status === 200) {

      setInputdata(response.data)
      setActivity(response.data.activity)
    } else {
      console.log("error")
    }
  }


  //submit user data
  const submitUserData = (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      mobile === "" ||
      gender === "" ||
      location === ""
    ) {
      toast.error("All fields are required");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else {
      toast.success("Registeration is successfully done!");
    }
  };

  //setpreview
  useEffect(() => {
    userProfileget()
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);
  return (
    <>
      <div className="container">
        <h2 className="text-center mt-1">Update Your Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile_div text-center">
            <img src={preview ? preview : "/man.png"} alt="img" />
          </div>

          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={inputdata.fname}
                  onChange={setInputValue}
                  type="text"
                  name="fname"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={inputdata.lname}
                  onChange={setInputValue}
                  type="text"
                  name="lname"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={inputdata.email}
                  onChange={setInputValue}
                  type="email"
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  value={inputdata.mobile}
                  onChange={setInputValue}
                  type="text"
                  name="mobile"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select your Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={"Male"}
                  name="gender"
                  value={"Male"}
                  checked={inputdata.gender === "Male" ? true : false}
                  onChange={setInputValue}
                />

                <Form.Check
                  type={"radio"}
                  label={"Female"}
                  name="gender"
                  value={"Female"}
                  checked={inputdata.gender === "Female" ? true : false}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select your Activity</Form.Label>
                <Select
                  options={options}
                  defaultValue={activity}
                  onChange={setActivityValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control
                  type="file"
                  onChange={setprofile}
                  name="user_profile"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control
                  value={inputdata.location}
                  onChange={setInputValue}
                  type="text"
                  name="location"
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Edit;
