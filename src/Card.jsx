import { useEffect, useState, memo } from "react";
import "./cards.css";
const Card = () => {
  const [cardData, setCardData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const data = fetch(
      `https://jsonplaceholder.typicode.com/posts?limit=9&_page=${page}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data.page["content-items"].content);
        // console.log(data);
        setCardData((preData) => [...preData, ...data]);
      });
  }, [page]);
  console.log("page", cardData);
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);
  console.log("page", page);
  return (
    <div className="card">
      {cardData.map((data, index) => {
        return (
          <div key={index} className="icard">
            <div>{index}</div>
            <div>Name:{data.id}</div>
            <div>Name:{data.body}</div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Card);
