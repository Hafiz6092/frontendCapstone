import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess} from "react-plaid-link"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAccessTokenThunk } from "../redux/user/user.action";

const LinkPlaid = () => {
  const [link_token, setLinkToken] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  async function getLinkToken() {
    const response = await axios.post(
      "http://localhost:8080/api/plaid/create_link_token",
      {},
      { withCredentials: true }
    );

    console.log("Response 'FrontEnd' link_token:\n", response.data.link_token);
    setLinkToken(response.data.link_token);
  }

  useEffect(() => {
    getLinkToken();
  }, []);

  const config = {
    token: link_token,
    onSuccess: async (public_token, metadata) => {
      // Send the public_token to your app server here.
      // The metadata contains info about the institution the
      // user selected and the account ID or IDs, if the
      // Select Account view is enabled.
      console.log(public_token)
      const response = await axios.post('http://localhost:8080/api/plaid/exchange_public_token', {
        public_token: public_token
      }, {withCredentials: true});
      console.log("access_token:", response.data)
    },
    onExit: (err, metadata) => {
      // handle the case when your user exits Link
      if (err != null) {
        console.error(err);
      }
    },
    onEvent: (eventName, metadata) => {
      // Optionally capture Link flow events, streamed through this callback as your users connect an Item
      console.log(eventName, metadata);
    },
    receivedRedirectUri: null,
  };
  
  const {open, exit, ready} = usePlaidLink(config)
  const popUp = () => {
    open()
  }

  
  return (
    <div>
      <h1>You are inside Link PLaid</h1>
      {/* <PlaidLinkOnSuccess onSuccess={onSuccess} />
      <PlaidLinkOnEvent onEvent={onEvent} />
      <PlaidLinkOnExit onExit={onExit} /> */}
      <button onClick={popUp} disabled={!ready}> Link with Plaid</button>
    </div>
  );
};

export default LinkPlaid;