import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionList, setQuestionList] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestionList(questions));
  }, []);

  function handleNewQuestion(question) {
    // The form data isn't formatted exactly like the API.  I'm sure there is a fancy automatted way to do it,
    // but I'm too tired.
    let formattedQuestion = {prompt:question.prompt, answers:[question.answer1, question.answer2, question.answer3, question.answer4], correctIndex:question.correctIndex}

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedQuestion),
    })
      .then((r) => r.json())
      .then((newQuestion) => setQuestionList([...questionList, newQuestion]))
  }

  function handleQuestionDeletion(question) {
    const newQuestionList = questionList.filter((questionCandidate) => {
      if (question.id === questionCandidate.id) {
        return false
      } else {
        return true
      }
    })
    console.log(newQuestionList)
    setQuestionList(newQuestionList)
  }

  function handleUpdatedQuestion(question) {
    console.log("handleUpdatedQuestion")
    let foo = questionList.map((questionCandidate) => {
      if (questionCandidate.id === question.id) {
        return(question)
      } else {
        return(questionCandidate)
      }
    })

    console.log(foo)
    debugger
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion = {handleNewQuestion} /> : 
        <QuestionList listOfQuestions = {questionList} onDeleteItem = {handleQuestionDeletion} onUpdatedCorrectIndex = {handleUpdatedQuestion} />}
    </main>
  );
}

export default App;
