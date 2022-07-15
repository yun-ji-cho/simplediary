import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Counter A update - count: ${count}`);
  });

  return <div>{count}</div>;
});
// const CounterB = React.memo(({ obj }) => {
//   //리랜더링이 일어남 - prop 인 obj 가 객체이기 때문. 자바스크립트에서 기본적으로 객체 비교는 얕은 비교를 하기 때문이다.
//   //객체타입의 값은 주소에 의한 비교를한다. : 얕은비교
//   //원시타입의 값은 값을 비교한다.
//   useEffect(() => {
//     console.log(`Counter B update - count: ${obj.count}`);
//   });
//   return <div>{obj.count}</div>;
// });

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`Counter B update - count: ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // return true; //이전 프롭스와 현재 프롭스가 같다. -> 리랜더링 일으키지 않음
  // return false; // 이전과 현재가 다르다. ->리랜더링 일어남

  // if (prevProps.obj.count === nextProps.obj.count) {
  //   return true;
  // }
  // return false;

  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        {/* <CounterB obj={obj} /> */}
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B Button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
