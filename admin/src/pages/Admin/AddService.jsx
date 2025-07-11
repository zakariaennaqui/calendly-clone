import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddService() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("image not selected");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      //
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-service",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="">add service</p>
      <div className="">
        <div className="">
          <label htmlFor="doc-img">
            <img
              className=""
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            upload service <br />
            picture
          </p>
        </div>
        <div className="">
          <div className="">
            <div className="">
              <p>Service provider name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className=""
                type="text"
                placeholder="name"
                required
              />
            </div>

            <div className="">
              <p>email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=""
                type="email"
                placeholder="email"
                required
              />
            </div>

            <div className="">
              <p>password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className=""
                type="password"
                placeholder="password"
                required
              />
            </div>

            <div className="">
              <p>experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className=""
                name=""
                id=""
              >
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
              </select>
            </div>
            <div className="">
              <p>fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className=""
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <p>speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className=""
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="">
              <p>education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className=""
                type="text"
                placeholder="education"
                required
              />
            </div>
            <div className="">
              <p>address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className=""
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className=""
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="">about</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className=""
            placeholder="about"
            rows={5}
            required
          />
        </div>

        <button type="submit" className="text-blue-500">
          add service
        </button>
      </div>
    </form>
  );
}

export default AddService;
