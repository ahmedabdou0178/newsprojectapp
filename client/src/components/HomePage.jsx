import LoginAttempts from '../widgets/LoginAttempts'
import News from "./News";
import TopSources from "../widgets/TopSources";
import Box from "@mui/material/Box";

export default function HomePage() {
  return (
    <Box display="flex" flexDirection="row" width="95%">
      <TopSources />
      <News />
      <LoginAttempts />
    </Box>
  );
}
