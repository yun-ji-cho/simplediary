import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    //Mount
    console.log("Mount");

    return () => {
      //unmount 시점에 실행되면 됨
      console.log("unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
