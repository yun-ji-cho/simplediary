import { useState, useRef } from "react";

const DiaryEditor = ({ onCreate }) => {
  const authorInput = useRef(); //useRef 함수를 호출해서 반환값을 authorInput 에 담는다. (React.MutableRefObject : 돔 html 에 접근할 수 있게한다.)
  const contentInput = useRef();
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: "1",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus(); //현재 가르키는 값을 current 프로퍼티로 불러와서 사용할 수 있다.  authorInput.current 는 author input 태그가 된다.
      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    console.log(state);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: "1",
    });
  };
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        오늘의 감정점수 :
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
