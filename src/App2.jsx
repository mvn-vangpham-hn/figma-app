import React, { useEffect, useState } from "react";
import App from "./App";

const CLIENT_ID = "iBFpGEmWlfk5tpkXav3vqK";
const CLIENT_SECRET = "B3XKvz0Cz936XZmgWcPzqttswM0lAL";
const REDIRECT_URI = "http://localhost:3000";

const App2 = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      return;
    }

    fetch(
      `https://www.figma.com/api/oauth/token?${new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
        grant_type: "authorization_code",
      })}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserData(res);
      });
  }, []);

  return (
    <div>
      <h3>Figma Login</h3>
      {userData ? (
        <>
          <div>access_token: {userData.access_token}</div>
          <div>expires_in: {userData.expires_in}</div>
          <div>refresh_token: {userData.refresh_token}</div>
          <div>user_id: {userData.user_id}</div>
          <App token={userData.access_token} />
        </>
      ) : (
        <a
          href={`https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
          )}&scope=files:read,file_comments:write,file_dev_resources:read,file_dev_resources:write,webhooks:write&response_type=code&state=${new Date().getTime()}`}
        >
          Login
        </a>
      )}
    </div>
  );
};

export default App2;
