import React, { useState } from "react";
import { ReactElement } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";
import axios from "axios";
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface LoginFormData {
  email: string;
  password: string;
}
function Login(): ReactElement {
  const host = "http://127.0.0.1:5173";
  const KAKAO_REST_API_KEY = "4646a32b25c060e42407ceb8c13ef14a";
  const KAKAO_REDIRECT_URI = host + "/oauth/callback/kakao";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const {
    handleSubmit,
    register,
    formState: { errors},
    reset,
    watch,
  } = useForm<RegisterFormData>({ mode: "onChange" });
  const register_name = watch('name');
  const register_password = watch('password');
  const register_email = watch('email');
  const register_confirmPassword = watch('confirmPassword');
  const [optSmModal, setOptSmModal] = useState(false);
  // const [registerData, setRegisterData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const toggleShow = () => {
    setOptSmModal(!optSmModal);
  };
  // const host = process.env.REACT_APP_HOST;

  const handleRegisterFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setRegisterData({
      name:register_name,
      email:register_email,
      password:register_password,
      confirmPassword:register_confirmPassword,
    })
    e.preventDefault();
    console.log({ register_name,
      register_email,
      register_password,
      register_confirmPassword,});
    axios.post("http://localhost:8080/login/createUser", {
        name:register_name,
        email:register_email,
        password:register_password,
      })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
      reset(); // Reset the form after submission
  };
  // const handleRegisterFormSubmit = (data: RegisterFormData) => {
  //   console.log(data);
  //   axios
  //     .post('http://localhost:8080/api/user/register', data)
  //     .then((response) => {
  //       // Handle successful response
  //       console.log(response.data);
  //       reset(); // Reset the form after submission
  //       setRegisterData({
  //         name: '',
  //         email: '',
  //         password: '',
  //         confirmPassword: '',
  //       });
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(error);
  //     });
  // };

  // const handleRegisterInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setRegisterData((prevRegisterData) => ({
  //     ...prevRegisterData,
  //     [name]: value,
  //   }));
  // };

  const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);
    axios.post("http://localhost:8080/login/login", loginData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    reset(); // Reset the form after submission
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({ ...prevLoginData, [name]: value }));
  };

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(value) || 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character';
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient full-screen-container"
      >
        <div className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offer <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your business
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5 ">
                <form onSubmit={handleLoginFormSubmit}>
                  <div>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Email"
                          id="login_form3"
                          name="email"
                          type="email"
                          defaultValue={loginData.email}
                          onChange={handleLoginInputChange}
                        />
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Password"
                          id="login_form4"
                          name="password"
                          type="password"
                          defaultValue={loginData.password}
                          onChange={handleLoginInputChange}
                        />

                        <MDBBtn
                          href={KAKAO_AUTH_URI}
                          className="mb-2 w-100"
                          style={{ backgroundColor: "#FEE500" }}
                        >
                          Sign in with kakao
                        </MDBBtn>

                        <ul
                          className="nav nav-pills nav-justified mb-3"
                          id="ex1"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <MDBBtn
                              type="submit"
                              aria-controls="pills-login"
                              className="mx-2 custom-button"
                            >
                              Sign In
                            </MDBBtn>
                          </li>
                          <li className="nav-item" role="presentation">
                            <MDBBtn
                              onClick={toggleShow}
                              className="mx-2 custom-button"
                              color="secondary"
                              type="button"
                            >
                              Register
                            </MDBBtn>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </div>
      </MDBContainer>

      <MDBModal show={optSmModal} tabIndex={-1} setShow={setOptSmModal}>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Register</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleRegisterFormSubmit}>
                <MDBCardBody className="px-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Your Name"
                    size="lg"
                    id="register_form1"
                    type="text"
                    defaultValue={registerData.email}
                    // onChange={handleRegisterInputChange}
                    {...register('name', { required: true })}
                    />
                    {errors.name && (
                      <span className="text-danger">Name is required</span>
                    )}
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Your Email"
                    size="lg"
                    id="register_form2"
                    type="email"
                    defaultValue={registerData.email}
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      }
                    })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    size="lg"
                    id="register_form3"
                    type="password"
                    defaultValue={registerData.password}
                    // onChange={handleRegisterInputChange}
                    {...register('password', {
                      required: true,
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                      validate: validatePassword,
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password.message}</div>
                  )}

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Repeat your password"
                    size="lg"
                    id="register_form4"
                    type="password"
                    // value={registerData.confirmPassword}
                    // onChange={handleRegisterInputChange}
                    {...register('confirmPassword', {
                      required: true,
                      validate: (value) =>
                        value === register_password || 'Passwords do not match', // Use password variable
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="text-danger">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                  <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: "#FEE500" }} disabled={!isFormValid}>
                    Register
                  </MDBBtn>
                </MDBCardBody>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Login;
