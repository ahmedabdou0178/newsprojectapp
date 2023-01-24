import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginForm from "../widgets/LoginForm";

export default function LoginPage() {
  return (
    <Box>
      <Box
        width="93%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="#F6F6F6"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to All Over The News App, The practice project.
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}
