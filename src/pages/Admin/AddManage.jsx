import AdminHeader from "../../components/AdminHeader";
import AdminSIdeBar from "../../components/AdminSideBar";
import { useDispatch } from "react-redux";
import { fetchCreateRoom, fetchGetRoom } from "../../store/roomSlice/roomSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

import saleInterface from "../../interfaces/sales.interface";
import roomsInterface from "../../interfaces/rooms.interface";
import usersInterface from "../../interfaces/users.interface";
import servicesInterface from "../../interfaces/service.interface.js";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchCreateHotelServices,
  fetchGetHotelService,
} from "../../store/hotelServiceSlice/hotelServiceSlice";
import { fetchCreateProduct } from "../../store/productSlice/productSlice";
import productInterface from "../../interfaces/product.interface";
import { fetchGetSale } from "../../store/saleSlice/saleSlice";
import { fetchGetUser } from "../../store/userSlice/userSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const [keys, setKeys] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  let { option, method } = useParams();

  useEffect(() => {
    if (option == "rooms") {
      delete roomsInterface["type"];
      delete roomsInterface["id"];
      setKeys([...Object.keys(roomsInterface)]);
      setData({ ...roomsInterface });
    } else if (option == "sales") {
      setKeys([...Object.keys(saleInterface)]);
      setData({ ...saleInterface });
      delete saleInterface["id"];
    } else if (option == "users") {
      setKeys([...Object.keys(usersInterface)]);
      setData({ ...usersInterface });
      delete usersInterface["id"];
    } else if (option == "services") {
      setKeys([...Object.keys(servicesInterface)]);
      setData({ ...servicesInterface });
      delete servicesInterface["id"];
    } else if (option == "products") {
      setKeys([...Object.keys(productInterface)]);
      setData({ ...productInterface });
      delete productInterface["id"];
    }
  }, [option]);

  const addOption = async () => {
    let func;
    if (option == "rooms") {
      if (!data.type) {
        data.type = "VIP";
      }
      let formData = new FormData();
      for (let i in data) {
        formData.append(i, data[i]);
      }
      func = fetchCreateRoom(formData);
    } else if (option == "sales") {
      func = fetchCreateRoom();
    } else if (option == "users") {
      func = fetchCreateRoom();
    } else if (option == "services") {
      let formData = new FormData();
      for (let i in data) {
        formData.append(i, data[i]);
      }
      func = fetchCreateHotelServices(formData);
    } else if (option == "products") {
      func = fetchCreateRoom(formData);
      let formData = new FormData();
      for (let i in data) {
        formData.append(i, data[i]);
      }
      func = fetchCreateProduct(formData);
    }
    const result = await dispatch(func)
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        if (originalPromiseResult.status == "SUCCESS") {
          navigate("/admin/" + option);
        }
        console.log(originalPromiseResult);
        // handle result here
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        // handle result here
      });
  };

  return (
    <div className="main-wrapper">
      <AdminHeader />
      <AdminSIdeBar />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>
                {option.charAt(0).toUpperCase() + option.slice(1)} Management
              </h4>
              <h6>
                Add/Update {option.charAt(0).toUpperCase() + option.slice(1)}
              </h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                {keys &&
                  keys.map((key) => (
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>{key}</label>
                        <input
                          onChange={(e) => {
                            setData((prevState) => {
                              prevState[key] = e.target.value;
                              return prevState;
                            });
                          }}
                          type="text"
                        />
                      </div>
                    </div>
                  ))}
                {option == "users" && (
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> User Image</label>
                      <div className="image-upload">
                        <input
                          type="file"
                          onChange={(e) => {
                            setData((prevState) => {
                              // console.log();
                              prevState["files"] = e.target.files[0];
                              return prevState;
                            });
                          }}
                        />
                        <div className="image-uploads">
                          <img src="assets/img/icons/upload.svg" alt="img" />
                          <h4>Drag and drop a file to upload</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {option == "rooms" && (
                  <>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>type</label>
                        <select
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "9px",
                          }}
                          onChange={(e) => {
                            setData((prevState) => {
                              prevState["type"] = e.target.value;
                              return prevState;
                            });
                          }}
                        >
                          <option value="VIP">VIP</option>
                          <option value="Normal">Normal</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label> Room Image</label>
                        <div className="image-upload">
                          <input
                            type="file"
                            onChange={(e) => {
                              setData((prevState) => {
                                prevState["files"] = e.target.files[0];
                                return prevState;
                              });
                            }}
                          />
                          <div className="image-uploads">
                            <img src="assets/img/icons/upload.svg" alt="img" />
                            <h4>Drag and drop a file to upload</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {(option == "products" || option == "services") && (
                  <>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          {option.charAt(0).toUpperCase() +
                            option.slice(1)}{" "}
                          Image
                        </label>
                        <div className="image-upload">
                          <input
                            type="file"
                            onChange={(e) => {
                              setData((prevState) => {
                                prevState["thumbnailFile"] = e.target.files[0];
                                return prevState;
                              });
                            }}
                          />
                          <div className="image-uploads">
                            <img src="assets/img/icons/upload.svg" alt="img" />
                            <h4>Drag and drop a file to upload</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="col-lg-12">
                  <button
                    style={{ marginRight: "12px" }}
                    className="btn btn-submit me-2"
                    onClick={addOption}
                  >
                    Submit
                  </button>
                  <button className="btn btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
