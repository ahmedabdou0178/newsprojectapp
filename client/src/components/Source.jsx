import { useState } from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FlexBetween from "../widgets/FlexBetween";
import Button from "@mui/material/Button";

export default function Source({
  id,
  name,
  description,
  url,
  category,
  language,
  country,
  handleSubscribe,
  handleUnsubscribe,
  subscribed,
}) {
  const [isSubscribed,setIsSubscribed] = useState(subscribed)
  return (
    <>
      <FlexBetween gap="1rem">
        <a href={url}>
          <Typography variant="h5" color="primary" fontWeight="800">
            {name}
          </Typography>
        </a>
      </FlexBetween>

      <Box>
        <Typography color="black" fontWeight="200">
          {description}
        </Typography>
        <Typography color="gray">
          {" "}
          {category.toUpperCase()} {language.toUpperCase()}{" "}
          {country.toUpperCase()}
        </Typography>
      </Box>
      <Box>
        <Button
          disabled={isSubscribed}
          onClick={(e) => {
            handleSubscribe(id);
            setIsSubscribed(!isSubscribed);
          }}
          sx={{
            p: "1rem",
            backgroundColor: "#F6F6F6",
            "&:hover": { color: "black", backgroundColor: "#2596be" },
          }}
        >
          Subscribe
        </Button>
        <Button
          disabled={!isSubscribed}
          onClick={() => {
            handleUnsubscribe(id);
            setIsSubscribed(!isSubscribed);
          }}
          sx={{
            p: "1rem",
            ml: "1rem",
            color: "black",
            backgroundColor: "#C5480",
            "&:hover": { color: "white", backgroundColor: "#C54809" },
          }}
        >
          Unsubscribe
        </Button>
      </Box>

      <Divider />
    </>
  );
}
