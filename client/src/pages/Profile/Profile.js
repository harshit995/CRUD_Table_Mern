import React, { useEffect, useState } from "react";
import "./profile.css";
import Card from "react-bootstrap/Card";
import { BASE_URL } from "../../services/helper";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { singleuserget } from "../../services/Apis";
import moment from "moment"

const Profile = () => {
  const [userprofile, setUserprofile] = useState({});

  const { id } = useParams();
  const userProfileget = async () => {

    const response = await singleuserget(id);

    if (response.status === 200) {
      setUserprofile(response.data)
    } else {
      console.log("error")
    }
  }

  useEffect(() => {
    userProfileget();
  }, [id])

  return (
    <>
      <div className="container">
        <Card className="card-profile col-lg-6 mx-auto shadow mt-5 p-3">
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt="img" />
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>{userprofile.fname + " " + userprofile.lname}</h3>
              <h4>
                <i class="fa-solid fa-envelope"></i>&nbsp;:-
                <span>{userprofile.email}</span>
              </h4>
              <h5>
                <i class="fa-solid fa-mobile"></i>&nbsp;:-
                <span>{userprofile.mobile}</span>
              </h5>
              <h4>
                <i class="fa-solid fa-venus-double"></i>&nbsp;:-
                <span>{userprofile.gender}</span>
              </h4>
              <h4>
                <i class="fa-solid fa-location-crosshairs"></i>&nbsp;:-
                <span>{userprofile.location}</span>
              </h4>
              <h4>
                Activity&nbsp;:-
                <span>{userprofile.activity}</span>
              </h4>
              <h4>
                <i class="fa-solid fa-calendar-days"></i> Date created&nbsp;:-
                <span> {moment(userprofile.datecreated).format("DD - MM - YYYY / hh:mm:ss")}</span>
              </h4>
              <h4>
                <i class="fa-solid fa-calendar-days"></i> Date Updated&nbsp;:-
                <span> {moment(userprofile.dateupdated).format("DD-MM-YYYY / hh:mm:ss")}</span>
              </h4>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Profile;
