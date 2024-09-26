import React from 'react';

const WsRecieveMessage = React.forwardRef((props, webSocketRef) => {

  React.useEffect(() => {
    if (!webSocketRef.current)
      return;

    const onMessage = (event) => {
      let arBuf = new Uint8Array(event.data);
      //console.log(`we recive `, arBuf);
    };

    webSocketRef
      .current
      .addEventListener("message", onMessage);

    return () => {
      webSocketRef
        .current
        .removeEventListener("message", onMessage);
    }
  }, []);

  return (null);
});

export default WsRecieveMessage;