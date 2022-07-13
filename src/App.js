import "./App.css";

import { useState, useRef } from "react";

import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
    console.log(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} />
      {/* dummyList을 내려주는 것이 아니라 undefined을 내려줘서 에러가 난다면 defaultProps 를 이용한다. 기본값 설정. */}
    </div>
  );
};

export default App;
