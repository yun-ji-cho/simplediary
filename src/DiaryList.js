import DiaryItem from "./DiaryItem";

const DiaryList = ({ onRemove, diaryList }) => {
  // console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <strong>{diaryList.length} 개의 일기가 있습니다.</strong>
      <div>
        {diaryList.map((item) => (
          <DiaryItem key={item.id} {...item} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
