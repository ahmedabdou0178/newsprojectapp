import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../state";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FlexBetween from "./FlexBetween";
import _ from "lodash";

export default function Navbar() {
  const { state, logout } = useContext(StateContext);
  const fullName = _.get(state, "user.fullName");
  const navigate = useNavigate();

  async function logoutFromServer() {
    fetch(`http://localhost:5000/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `A3bdou ${state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  const handleLogout = async () => {
    await logoutFromServer();
    localStorage.clear();
    navigate("/");
    logout();
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={"#F0F0F0"}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              color: "gray",
              cursor: "pointer",
            },
          }}
        >
          All Over The News App
        </Typography>
        <Button
          sx={{
            "&:hover": {
              color: "gray",
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/sources")}
        >
          <Typography
            color="primary"
            sx={{
              "&:hover": {
                color: "gray",
                cursor: "pointer",
              },
            }}
          >
            <b>News Sources</b>
          </Typography>
        </Button>
      </FlexBetween>

      <FlexBetween gap="2rem">
        <Typography>{fullName}</Typography>
        {fullName && (
          <Button
            sx={{
              color: "gray",
              "&:hover": { color: "white", backgroundColor: "#C54809" },
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}
      </FlexBetween>
    </FlexBetween>
  );
}
