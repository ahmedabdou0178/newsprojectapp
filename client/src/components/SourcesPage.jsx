import { useContext, useEffect, useState } from "react";
import { StateContext } from "../state";
import Source from "./Source";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

export default function SourcesPage() {
  const {
    state: { token, user },
  } = useContext(StateContext);

  const [newsSources, setNewsSources] = useState([]);
  const [messageAlert, setAlert] = useState("");
  const [errorAlert, setError] = useState("");
  const navigate = useNavigate();
  async function getSources() {
    const response = await fetch(`http://localhost:5000/news/sources`, {
      method: "GET",
    });
    const data = await response.json();
    setNewsSources(data.sources || []);
  }

  useEffect(
    () => {
      getSources();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubscribe = async (sourceid) => {
    setAlert('');
    setError('');
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const subscribe = await fetch(
        `http://localhost:5000/user/subscribe/${sourceid}`,
        {
          method: "PATCH",
          headers: { Authorization: `A3bdou ${token}` },
        }
      );
      const response = await subscribe.json();
      console.log(response);
      response.status == "200"
        ? setAlert(response.message)
        : setError(response.message);
    } catch (err) {
      setError(err);
    }
  };

  const handleUnsubscribe = async (sourceid) => {
    setAlert('');
    setError('');
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const unSubscribe = await fetch(
        `http://localhost:5000/user/unsubscribe/${sourceid}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `A3bdou ${token}`,
          },
        }
      );
      const response = await unSubscribe.json();
      response.status == "200"
        ? setAlert(response.message)
        : setError(response.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          position: "fixed",
          top: "0px",
          left: "0px",
          "z-index": "10",
        }}
        spacing={2}
        position="absolute"
        zIndex="10"
      >
        {errorAlert && (
          <Alert
            severity="error"
            onClick={() => {
              setError("");
            }}
          >
            <AlertTitle>Error</AlertTitle>
            <strong>{errorAlert}</strong>
          </Alert>
        )}

        {messageAlert && (
          <Alert
            severity="success"
            onClick={() => {
              setAlert("");
            }}
          >
            <AlertTitle>Success</AlertTitle>
            <strong>{messageAlert}</strong>
          </Alert>
        )}
      </Stack>
      {newsSources.map(
        ({ id, name, description, url, category, language, country }) => (
          <Source
            key={name}
            id={id}
            name={name}
            description={description}
            url={url}
            category={category}
            language={language}
            country={country}
            handleSubscribe={handleSubscribe}
            handleUnsubscribe={handleUnsubscribe}
            subscribed={user && _.includes(user.sources, id)}
          />
        )
      )}
    </>
  );
}
