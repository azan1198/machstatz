import React from "react";

function UserList({ users, deleteUser }) {
  return (
    <>
      {users.map((user) => (
        <div className="firstbox" key={user._id.$oid}>
          <div className="icons-container">
            <i className="fas fa-pen edit"></i>
            <i
              className="fas fa-trash-alt delete2"
              onClick={() => {
                deleteUser(user.email);
              }}
            ></i>
          </div>
          <div className="circle1">
            {(user.first_name &&
              (user.first_name + "").toUpperCase().charAt(0)) ||
              (user.fist_name && (user.fist_name + "").toUpperCase().charAt(0))}
          </div>
          <div className="text">
            {user.fist_name || user.first_name + " " + user.last_name}
          </div>
        </div>
      ))}
    </>
  );
}

export default UserList;
