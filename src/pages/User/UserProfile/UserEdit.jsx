/** @format */

import React, { useEffect, useState } from "react";
// import "./EditModal.scss";
import { useDispatch, useSelector } from "react-redux";

import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Button, Form, Input, Modal } from "antd";
import { updateUserName } from "../../../redux/reduxToolkit/extraReducer";
import { firestore } from "../../../api/firebase";
const UserEdit = ({ setUserSetting, users, userSetting, user }) => {
//   const { postLoading } = useSelector((state) => state.posts);
var postLoading = false
  const [form] = Form.useForm();
  const [data, setData] = useState({
    username: user.displayName,
    bio: "",
    email: "",
  });
  useEffect(() => {
    if (user) {
      form.setFieldsValue(data);
    }
  }, []);

  var currentUserId = users?.find((el) => el.userEmail === data.email);

  var id = currentUserId?.id;
  const dispatch = useDispatch();
  const handleUpdate = async (values) => {
    try {
      var bioRef = doc(firestore, "users", id?.toString());
      await updateDoc(bioRef, {
        userBio: values.bio,
        name: values.username,

      });
    } catch (e) {
      console.log(e);
    }
    dispatch(updateUserName({ username: values.username }));
  };
  const onCancel = () => {
    setUserSetting(false);
  };

  return (
    <>
      <Modal footer={null} open={userSetting} onCancel={onCancel}>
        <br />
        <br />
        <Form onFinish={handleUpdate} form={form}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: "Username cannot be Empty" }]}>
            <Input />
          </Form.Item>
          <div className='buttons'>
            <Button danger>cancel</Button>
            <Button type='primary' htmlType='submit' loading={postLoading}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UserEdit;
