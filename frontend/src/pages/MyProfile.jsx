//ameliorer css properties tailwind of this file
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {

  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {

      const formData = new FormData();
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData,  { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return userData && (
    <div className="flex flex-col items-center justify-center mt-10 mb-10 gap-4 p-4 sm:p-8 bg-gray-100 rounded-lg shadow-lg">

      {
        isEdit
        ? <label htmlFor="image">
          <div className="">
            <img className="" src={image ? URL.createObjectURL(image): userData.image} alt="" />
            <img className="" src={image ? '': assets.upload_icon } alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>
        :<img className="" src={userData.image} alt="" />
      }

      {isEdit ? (
        <input
          className="mb-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="">{userData.name}</p>
      )}

      <hr className="" />
      <div>
        <p className="">contact info</p>
        <div className="">
          <p className="">email id:</p>
          <p className="">{userData.email}</p>
          <p className="">phone:</p>
          {isEdit ? (
            <input
              className=""
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="">{userData.phone}</p>
          )}
          <p className="">address:</p>
          {isEdit ? (
            <p>
              <input
                className=""
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
                className=""
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </p>
          ) : (
            <p className="">
              {userData.address.line1} <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="">basic info</p>
        <div className="">
          <p className="">gender:</p>
          {isEdit ? (
            <select
              className=""
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          ) : (
            <p className="">{userData.gender}</p>
          )}
          <p className="">birthday:</p>
          {isEdit ? (
            <input
              className=""
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        {isEdit ? (
          <button className="text-green-600" onClick={updateUserProfileData}>save info</button>
        ) : (
          <button className="text-blue-600" onClick={() => setIsEdit(true)}>edit</button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
