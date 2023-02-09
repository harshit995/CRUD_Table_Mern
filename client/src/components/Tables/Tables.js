import React from "react";
import "./table.css";
import { BASE_URL } from "../../services/helper";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../services/Apis";
import { toast, ToastContainer } from "react-toastify";

const Tables = ({ userdata, deleteuser, userGet }) => {


  const handleChange = async (id, activity) => {
    const response = await statuschangefunc(id, activity);

    if (response.status === 200) {
      userGet();
      toast.success("Status Updated")
    } else {
      toast.error("error ")
    }
  }
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-3">
            <Card className="shadow ">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? userdata.map((element, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{element.fname + " " + element.lname}</td>
                          <td>{element.email}</td>
                          <td>{element.gender === "Male" ? "M" : "F"}</td>
                          <td className="d-flex align-items-center">
                            <Dropdown className="text-center">
                              <Dropdown.Toggle id="dropdown-basic">
                                <Badge className="btns" bg={element.activity === "Active" ? "primary" : "danger"}>
                                  {element.activity}&nbsp;<i class="fa-solid fa-angle-down"></i>
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>

                          <td className="img_parent">
                            <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                          </td>
                          <td>
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                variant="light"
                                className="action"
                                id="dropdown-basic"
                              >
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink className="text-decoration-none" to={`/userprofile/${element._id}`} >
                                    <i
                                      class="fa-solid fa-eye"
                                      style={{ color: "blue" }}
                                    ></i>
                                    <span> View</span>
                                  </NavLink>

                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink className="text-decoration-none" to={`/edit/${element._id}`} >
                                    <i
                                      class="fa-solid fa-pen"
                                      style={{ color: "green" }}
                                    ></i>
                                    <span> Edit</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div onClick={() => deleteuser(element._id)}>
                                    <i
                                      class="fa-solid fa-trash"
                                      style={{ color: "red" }}
                                    ></i>
                                    <span> Delete</span>
                                  </div>

                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>

                      </>
                    )
                  }) : <div className="no_data text-center">No data Found</div>
                  }

                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div >
    </>
  );
};

export default Tables;
