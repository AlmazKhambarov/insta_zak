import React, { useEffect, useState } from "react";
import "./UserSetting.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import userimg from "../../../assets/images/user_img.png";
import { getUser } from "../../../redux/reduxToolkit/extraReducer";
import { auth } from "../../../api/firebase";
import { updateEmail } from "firebase/auth";
import { upload } from "../../../api/firebase";
const UserSetting = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState();
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const currentUser = auth.currentUser;
  useEffect(() => {
    getUser();
  }, []);

  const [data, setData] = useState({
    name: user?.displayName,
    email: user?.email,
  });

  const update = () => {
    upload(photo, user, setLoading);
    setPhoto('')
  };
  const handleSave = (e) => {
    e.preventDefault();
    try {
      updateEmail(auth.currentUser, data.email).then((res) => console.log(res));
    } catch (e) {}
  };

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [currentUser, loading]);
  console.log(loading);
  return (
    <>
      {!loading ? (
        <div className="setting">
          <div className="userava">
            <img src={photoURL} className="user" />
            <label htmlFor="userimg">
              <AddCircleOutlineIcon />{" "}
            </label>
            <input
              type="file"
              name="userimg"
              id="userimg"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            {photo ? (
              <button className="upload_btn" onClick={update}>
                Upload
              </button>
            ) : null}
          </div>
          <div className="edit_card">
            <form onSubmit={handleSave}>
              <label>username</label>
              <input
                type="text"
                value={data?.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <label>Name</label>
              <input type="text" placeholder={user?.displayName} />
              <label>Email</label>
              <input type="text" placeholder={user?.email} />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      ) : (
        <p className="loading">Loading</p>
      )}
    </>
  );
};

export default UserSetting;
