import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import Tables from "../../components/Tables/Tables";



import { useNavigate } from "react-router-dom";
import { addData, dltdata, updateData } from "../../components/context/ContextProvider";
import { deletefunc, usergetfunc } from "../../services/Apis";

const Home = () => {

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All")
  const [userdata, setUserdata] = useState("");

  const { useradd, setUseradd } = useContext(addData);

  const { update, setUpdate } = useContext(updateData);

  const { deletedata, setDeletedata } = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register");
  };

  const userGet = async () => {
    const response = await usergetfunc(search, gender);
    // console.log(response)

    if (response.status === 200) {
      setUserdata(response.data);
    } else {
      console.log("error for get user..")
    }

  }

  //user delete
  const deleteuser = async (id) => {
    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setDeletedata(response.data)
    }
    else {
      toast.error("error")
    }
  }
  useEffect(() => {
    userGet();
    // setTimeout(() => {
    //   setShowSpin(false);
    // }, 1000);
  }, [search, gender]);

  return (
    <>
      {
        useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Successfully Added..</Alert> : ""
      }
      {
        update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Successfully updated..</Alert> : ""
      }
      {
        deletedata ? <Alert variant="danger" onClose={() => setDeletedata("")} dismissible>{deletedata.fname.toUpperCase()} Successfully Deleted..</Alert> : ""
      }
      <div className="container">
        <div className="main_div">
          {/* search add button */}
          <div className=" search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success " className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                <i class="fa-solid fa-plus"></i>&nbsp; Add User
              </Button>
            </div>
          </div>
          {/* export,gender,activity  */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv p-3">
              <Button variant="primary" className="export_btn">
                <i class="fa-solid fa-file-export"></i>&nbsp; Export csv
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter by Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />

                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* sort by value  */}

            <div className="filter_newold ">
              <h3>Sort By value &nbsp;</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* by activity */}
            <div className="filter_activity">
              <div className="activity">
                <h3>Filter By Activity</h3>
                <div className="activity_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="activity"
                    value={"All"}
                    // onChange={(e) => setactivity(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="activity"
                    value={"Active"}
                  // onChange={(e) => setactivity(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="activity"
                    value={"InActive"}
                  // onChange={(e) => setactivity(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tables
          userdata={userdata}
          deleteuser={deleteuser}
        />
      </div>
    </>
  );
};

export default Home;
