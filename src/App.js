import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import Styles from "./styles/App.css";

const App = () => {
  const [users, setUsers] = useState(null);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    pwd: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState({
    message: "",
    status: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch("http://15.207.229.231:8000/machstatz/get_all_users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(formValues);

    fetch("http://15.207.229.231:8000/machstatz/add_new_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Error") {
          setResponse({ message: data.message, status: data.status });
        } else {
          setResponse({ message: data.message, status: data.status });
          setSubmitting(false);
          setFormValues({
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            pwd: "",
          });
        }
      });
    console.log(formValues);
  };

  const deleteUser = (mailId) => {
    console.log(mailId);

    fetch(
      `http://15.207.229.231:8000/machstatz/delete_existing_user/${mailId}`,
      {
        method: "DELETE",
        // headers: {
        //   "Access-Control-Allow-Origin": "http://localhost:3000",
        // },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setResponse({ message: data.message, status: data.status });
        } else {
          setResponse({ message: data.message, status: data.status });
        }
      });
  };

  return (
    <div className="App">
      <div className="user-list">
        <div className="firstbox">
          <div className="icons-container">
            <i className="fas fa-pen edit"></i>
            <i
              className="fas fa-trash-alt delete2"
              onClick={() => {
                deleteUser("azan@gmail.com");
              }}
            ></i>
          </div>
          <div className="circle1">A</div>
          <div className="text">Azan Isa</div>
        </div>
        {users && (
          <UserList users={users} title="All Users!" deleteUser={deleteUser}>
            {console.log(users)}
          </UserList>
        )}
      </div>

      {/* Form */}
      <div className="form-container">
        <form className="submit-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fname">First Name:</label>
            <br />
            <input
              type="text"
              id="fname"
              placeholder="Enter your first name"
              className="fname"
              name="first_name"
              value={formValues.first_name}
              onChange={(e) => handleChange(e)}
            />
            <br />
          </div>
          <div>
            <label htmlFor="lname">Last Name:</label>
            <br />
            <input
              type="text"
              id="lname"
              placeholder="Enter your last name"
              className="lname"
              name="last_name"
              value={formValues.last_name}
              onChange={(e) => handleChange(e)}
            />
            <br />
          </div>
          <div>
            <label htmlFor="profile">Profiles:</label>
            <br />
            <select id="profile" className="profile" disabled>
              <option value="select">Select</option>
              <option value="profile2">Profile 1</option>
              <option value="profile3">Profile 2</option>
            </select>
            <br />
          </div>
          <div>
            <label htmlFor="uname">Username:</label>
            <br />
            <input
              type="text"
              id="uname"
              placeholder="Enter your username"
              className="uname"
              name="username"
              value={formValues.username}
              onChange={(e) => handleChange(e)}
            />
            <br />
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <br />
            <input
              type="text"
              id="email"
              placeholder="Enter your emaii"
              className="email"
              name="email"
              value={formValues.email}
              onChange={(e) => handleChange(e)}
            />
            <br />
          </div>
          <div>
            <label htmlFor="pswd">Password:</label>
            <br />
            <input
              placeholder="Enter your password"
              id="pswd"
              className="password"
              name="pwd"
              type={showPassword ? "text" : "password"}
              value={formValues.pwd}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <div className="show-password">
              <input
                type="checkbox"
                className="show"
                onClick={() => setShowPassword(!showPassword)}
              />
              Show Password
            </div>
          </div>
          <div className="submit-container">
            <input type="submit" value="Cancel" className="cancel-button" />
            <input
              type="submit"
              value="Add"
              className="add-button"
              // onClick={addUser}
            />
          </div>
        </form>
      </div>
      {submitting && <div>Submtting Form...</div>}
      <div className={`response ${response.status.toLowerCase()}`}>
        {response.message}
      </div>
    </div>
  );
};
export default App;
