import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { StateContext } from "../state";
import _ from "lodash";

export default function LoginAttempts() {
  const { state } = useContext(StateContext);
  const loginAttempts = _.get(state, "user.loginAttempts", []);

  return (
    <Box>
      <Box
        mt="1rem"
        p="1rem "
        width="100%"
        mr="10rem"
        borderRadius="10px"
        backgroundColor={"#F0F0F0"}
      >
        <b>Recent Login History</b>
        {loginAttempts.length > 0 &&
          loginAttempts.map(({ ip, success, time }, index) => (
            <div key={index}>
              <Box gap="1rem" mb="0.5rem">
                <Typography color={success ? "primary" : "red"}>
                  Date and Time: {new Date(time).toLocaleString()}
                </Typography>
                <Typography color={success ? "primary" : "red"}>
                  IP Address:{ip}
                </Typography>
                <Typography color={success ? "primary" : "red"}>
                  {success ? "Successful" : "Failed"}
                </Typography>
              </Box>
              <Divider />
            </div>
          ))}
      </Box>
    </Box>
  );
}
