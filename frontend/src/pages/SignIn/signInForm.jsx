import React, { useState } from "react";
import styles from "./styles/page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import LoaderStyles from "../../pages/UserProfile/styles/page.module.scss";

export default function SignInPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Loggin in with:", userData);
    try {
      console.log(
        "Sending request to:",
        `${import.meta.env.VITE_API_URL}/api/users/signin`
      );
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/signin`,
        userData
      );
      console.log("Response received:", res.data);
      const { token, user } = res.data;
      login({ token, user });
      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      if (err.data.msg === "Incorrect email") {
        setErrorStatus({ email: true, password: false });
      } else if (err.data.msg === "Incorrect password") {
        setErrorStatus({ email: false, password: true });
      } else {
        alert("Error signing in");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.signIn_wrapper}>
        {isLoading && (
          <div className={LoaderStyles.loadingWrapper}>
            <div className={LoaderStyles.loader}></div>
            <p className={LoaderStyles.loadingText}>Logging in...</p>
          </div>
        )}
        <div className={styles.parent_cont_left}>
          <form
            onSubmit={handleSubmit}
            className={styles.main_content_container}
          >
            <h1 className={styles.h3}>GigChain</h1>

            <div>
              <h4 className={styles.h4}>Login Now</h4>
            </div>

            <div className={styles.input_container}>
              <input
                className={` ${styles.input} ${
                  errorStatus.email ? styles.input_error : ""
                }`}
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                className={` ${styles.input} ${
                  errorStatus.password ? styles.input_error : ""
                }`}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className={styles.misc_fields}>
              <label className={styles.custom_checkbox} htmlFor="rememberMe">
                <input type="checkbox" id="rememberMe" />
                <span className={styles.checkbox_label}>Remember Me</span>
              </label>

              <a className={styles.forgetPassLink} href="/forgetPassword">
                Forgot password?
              </a>
            </div>

            <div>
              <button type="submit" className={styles.button_primary}>
                Login
              </button>
            </div>

            <div className={styles.or_container}>
              <div className={styles.line}></div>
              <div className={styles.or_text}>or</div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.register_link_container}>
              <Link to="/register">Dont have a GigChain profile? Register</Link>
            </div>
          </form>
        </div>
        <div className={styles.parent_cont_right}>
          <div>
            <h1 className={styles.h1}>GigChain</h1>
            <p className={styles.p}>
              The first peer-to-peer freelance marketplace
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
