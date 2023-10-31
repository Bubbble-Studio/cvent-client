import React from "react";
import { useParams } from "react-router-dom";
import styles from "./QuestionPage.module.css";
const QuestionPage = () => {
  let { qid } = useParams();
  let quesId = qid;
  console.log(quesId);
  let questions = [
    {
      id: 1,
      question: "What is the capital of India?",
      image:
        "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      video: "",
      sideText: "",
      options: [
        {
          id: 1,
          option: "Delhi",
          isCorrect: true,
        },
        {
          id: 2,
          option: "Mumbai",
          isCorrect: false,
        },
        {
          id: 3,
          option: "Kolkata",
          isCorrect: false,
        },
        {
          id: 4,
          option: "Chennai",
          isCorrect: false,
        },
      ],
    },
    {
      id: 2,
      question: "What is the capital of India?",
      image:
        "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      video: "",
      sideText: "Here is side Text",
      options: [
        {
          id: 1,
          option: "Delhi",
          isCorrect: true,
        },
        {
          id: 2,
          option: "Mumbai",
          isCorrect: false,
        },
        {
          id: 3,
          option: "Kolkata",
          isCorrect: false,
        },
        {
          id: 4,
          option: "Chennai",
          isCorrect: false,
        },
      ],
    },
    {
      id: 3,
      question: "What is the capital of India?",
      image: "",

      video: "../../assets/video/IMEX_BG.mp4",
      sideText: "",
      options: [
        {
          id: 1,
          option: "Delhi",
          isCorrect: true,
        },
        {
          id: 2,
          option: "Mumbai",
          isCorrect: false,
        },
        {
          id: 3,
          option: "Kolkata",
          isCorrect: false,
        },
        {
          id: 4,
          option: "Chennai",
          isCorrect: false,
        },
      ],
    },
  ];
  let question = questions.find((q) => q.id == quesId);
  return (
    <div className={styles.container}>
      <div
        className={styles.mediaContainer}
        style={{
          justifyContent: question?.sideText != "" ? "space-between" : "center",
        }}
      >
        {question?.image && <img src={question.image} alt="image" />}
        {question?.sideText && (
          <div className={styles.sideText}>{question.sideText}</div>
        )}
        {question?.video && <video src={question.video} autoplay />}
      </div>
      <div className={styles.text}>{question?.question}</div>
    </div>
  );
};

export default QuestionPage;
