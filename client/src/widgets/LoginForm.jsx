import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../state";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().min(8).required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  fullName: "",
  email: "",
  password: "",
};

const initialValueLogin = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const { setUser } = useContext(StateContext);
  const [errorMessage, setError] = useState("");

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn.user) {
      setUser(loggedIn);
      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
      navigate("/home");
    } else {
      setError(loggedIn.message);
    }
  };

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      `http://localhost:5000/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser.savedUser) {
      setPageType("login");
    } else {
      setError(savedUser.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (!isLogin) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValueLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              "&>div": { gridColumn: "span 4" },
            }}
          >
            {!isLogin && (
              <TextField
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS SECTION */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#F6F6F6",
                "&:hover": { color: "black" },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              sx={{
                textDecoration: "underline",
                color: "red",
              }}
            >
              {errorMessage}
            </Typography>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
                setError("");
              }}
              sx={{
                textDecoration: "underline",
                color: "#00353F",
                "&:hover": { cursor: "pointer", color: "#00353F" },
              }}
            >
              {isLogin
                ? "Don't have an account? Rigester here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}
