import React from 'react';

const WsSendMessage = React.forwardRef((props, webSocketRef) => {

  const onclick = () => {
    if (webSocketRef.current.readyState != 0) {
      let arBuf = new Uint8Array(10);
      arBuf[0] = 100;
      arBuf[1] = 200;
      console.log(arBuf);
      webSocketRef.current.send(arBuf);
    }
  };

  return (<>
    <button onClick={onclick}>Click to send message</button></>);
});

export default WsSendMessage;