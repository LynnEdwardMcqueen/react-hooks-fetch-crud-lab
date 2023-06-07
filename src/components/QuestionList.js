import React, {useState} from "react";
import QuestionItem from "./QuestionItem";


function QuestionList({listOfQuestions, onDeleteItem, onUpdatedCorrectIndex}) {
  
  // Add useEffect hook
  const [questionIndex, setQuestionIndex] = useState(1)

  function handleDeleteQuestion( question ) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteItem(question));
  }

  function handleNewCorrectAnswer(question) {
    console.log("handleNewCorrectAnswer")
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: question.correctIndex,
      }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onUpdatedCorrectIndex(updatedQuestion));
  }

  const questionItemArray = listOfQuestions.map((currentQuestion, index) => {
    return (<QuestionItem key = {currentQuestion.id} question = {currentQuestion} 
      onDelete = {handleDeleteQuestion} onNewCorrectAnswer = {handleNewCorrectAnswer} /> )
  })
 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionItemArray}
      </ul>
    </section>
  );
}

export default QuestionList;
