import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/Header";
import Input from "../../components/common/MUI-themed/Input";
import "./Entry.css";

const Entry = () => {
  const navigate = useNavigate();
  const [loginTab, setLoginTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");           // new
  const [country, setCountry] = useState("");       // new
  const [errorMsg, setErrorMsg] = useState("");

  const loginUser = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/login`,
        { username, password }
      );
      localStorage.setItem("mern-task-management/user", JSON.stringify(data));
      navigate("/");
    } catch (e) {
      if (e.response?.status === 400) setErrorMsg(e.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/register`,
        { username, password, email, country }   // include new fields
      );
      console.log(data);
      setLoginTab(true);
    } catch (e) {
      if (e.response?.status === 400) setErrorMsg(e.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrorMsg("");
    setLoading(false);
    // clear all inputs on tab switch
    setUsername("");
    setPassword("");
    setEmail("");
    setCountry("");
  }, [loginTab]);

  return (
    <>
      <Header loggedIn={false} loginTab={loginTab} setLoginTab={setLoginTab} />
      <div className="flex justify-center items-center page-template entry">
        <form
          className="card"
          onSubmit={e => {
            e.preventDefault();
            setLoading(true);
            loginTab ? loginUser() : registerUser();
          }}
          autoComplete="off"
        >
          <h2 className="text-center mt-8 card-title">
            {loginTab ? "Log In" : "Sign Up"}
          </h2>
          <div className="card-body">
            <Input
              label="Username"
              type="text"
              val={username}
              setVal={setUsername}
              className="w-full mb-4"
              required
            />
            <Input
              label="Password"
              type="password"
              val={password}
              setVal={setPassword}
              className="w-full mb-4"
              required
            />

            {/* Only show these on Sign Up */}
            {!loginTab && (
              <>
                <Input
                  label="Email"
                  type="email"
                  val={email}
                  setVal={setEmail}
                  className="w-full mb-4"
                  required
                />
                <Input
                  label="Country"
                  type="text"
                  val={country}
                  setVal={setCountry}
                  className="w-full mb-4"
                  required
                />
              </>
            )}

            {errorMsg && (
              <div className="text-red-500 text-end text-sm err-msg mb-4">
                {errorMsg}
              </div>
            )}

            <button className="w-full btn-primary" disabled={loading}>
              {loginTab ? "Enter" : "Join"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

Entry.defaultProps = {
  LoginTab: true,
};

export default Entry;
