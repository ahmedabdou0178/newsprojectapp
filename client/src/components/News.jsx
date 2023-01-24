import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { StateContext } from "../state";

export default function News() {
  const { state } = useContext(StateContext);
  const [newsData, setData] = useState([]);
  const navigate = useNavigate();

  const [isFunctionDone, setIsFunctionDone] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/news/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `A3bdou ${state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .then(() => setIsFunctionDone(true))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFunctionDone) {
    return <h2>Loading...</h2>;
  }

  return (
    <Box mr="0">
      <Box mt="1rem" ml="1rem" mr="1rem" p="1rem " width="95%">
        <Typography color="primary" variant="h3" m="0.5rem" >
          <b>{"Your Subscribed News".toUpperCase()}</b>
        </Typography>

        {newsData && newsData.length > 0 ? (
          newsData.map(
            ({
              id,
              source,
              author,
              title,
              description,
              url,
              urlToImage,
              publishedAt,
              content,
            }) => (
              <Box
                key={id}
                m="1rem"
                p="1rem"
                borderRadius="2%"
                backgroundColor={"#F0F0F0"}
              >
                <a href={url}>
                  <Typography color="primary">{title.toUpperCase()}</Typography>
                </a>
                <Typography color="gray">
                  Source: {source.name} || Author: {author} || Published: at{" "}
                  {`${new Date(publishedAt).toLocaleTimeString()}`} on{" "}
                  {`${new Date(publishedAt).toLocaleDateString()}`}
                </Typography>
                <Box>
                  <img
                    width="30%"
                    style={{ objectFit: "cover" }}
                    alt={title}
                    src={urlToImage}
                  />
                  <Typography color="black">{description}</Typography>
                  <Typography color="gray">{content}</Typography>
                </Box>
                <Divider />
              </Box>
            )
          )
        ) : (
          <Typography
            color="primary"
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: "gray",
              },
            }}
            onClick={() => {
              navigate("/sources");
            }}
          >
            {" "}
            Please Subscribe to view the latest news{" "}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
