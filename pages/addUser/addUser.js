import React from "react";
import { getSession } from "next-auth/react";
import AddQuesAns from "../../Component/FAQ/AddQuesAns";
import AddUser from '../../Component/AddUser/AddUser'
const addUser = () => {
  return (
    <div>
      <AddUser/>
    </div>
  );
};

export default addUser;