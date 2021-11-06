import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://heimamma.com";


function SocketComponent() {

    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('broadcast_siste_verdier', data => {
          setResponse(data);
        });
      }, []);

    return (
        <div>
            {response}
        </div>
    )
}

export default SocketComponent

