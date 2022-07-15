import "./App.css";

import React, {
  useMemo,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from "react";

import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest from "./OptimizeTest";

//첫번째 파라미터는 상태변화가 일어나기 직전의 state
//두번째 파라미터는 어떤 상태 변화가 일어나야 하는지 담은 정보가 담겨있는 action 객체
//action 객체에 담겨져 있는 type 프로퍼티를 통해서 스위치 문을 이용해서 상태변화 처리를 한다.
//reducer 가 리턴하는 값이 새로운 상태변화 값이 된다. reducer 는 새로운 state 를 Return 해주는 의무가 있다.

// 즉 dispatch 를 호출하면 reducer 가 실행되고 reducer가 리턴하는 값이 data 의 값이 된다.
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_data = new Date().getTime();
      const newItem = {
        ...action.data,
        created_data,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

//context 생성, context 도 내보내줘야한다. 그래야 다른 컴포넌트들이 접근해서 사용할 수 있음
export const DiarystateContext = React.createContext();

const App = () => {
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_data: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
    // setData(initData);
  };

  //App 컴포넌트가 마운트 되자 마자 실행
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiarystateContext.Provider value={data}>
      {/* DiarystateContext.Provider 로 랩핑을 해주면 */}
      <div className="App">
        <DiaryEditor onCreate={onCreate} />
        <div>전체일기 : {data.length}</div>
        <div>기분 좋은 일기 갯수 : {goodCount}</div>
        <div>기분 나쁜 일기 갯수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
      </div>
    </DiarystateContext.Provider>
  );
};

export default App;
