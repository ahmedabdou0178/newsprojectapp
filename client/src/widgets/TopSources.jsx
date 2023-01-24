import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export default function TopSources() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/news/top5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.top5))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box>
      <Box
        mt="1rem"
        p="1rem "
        width="150px"
        borderRadius="10px"
        backgroundColor={"#F0F0F0"}
      >
        <b>TOP News Sources</b>
        {data.length > 0 ? (
          data.map(({ id, subscribers }, index) => (
            <div key={index}>
              <Box gap="1rem" mb="0.5rem">
                <Typography color="primary">{id.toUpperCase()}</Typography>
                <Typography color="gray">
                  No. of subscribers: {subscribers}
                </Typography>
              </Box>
              <Divider />
            </div>
          ))
        ) : (
          <Typography color="primary"> 'Loading...' </Typography>
        )}
      </Box>
    </Box>
  );
}
