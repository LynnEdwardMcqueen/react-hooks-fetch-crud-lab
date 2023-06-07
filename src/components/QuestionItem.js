import React from "react";

function QuestionItem({ question, onDelete, onNewCorrectAnswer }) {


  if (question === undefined) return null;
  const { id, prompt, answers, correctIndex } = question;


  function handleNewCorrectAnswer(question, newCorrectIndex) {
    // Add the new correct index and then update the server
    console.log("handleNewCorrectAnswer question = ", question)
    console.log("handleNewCorrectAnswer newCorrectIndex = ", newCorrectIndex)
    question.correctIndex = newCorrectIndex
    onNewCorrectAnswer(question)
  }

  const options = answers.map((answer, index) => {


    return(
    <option key={index} value={index}>
      {answer}
    </option>
    )
  });



  if ( question === undefined) return null
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange= {(event) => handleNewCorrectAnswer(question, event.target.value)} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick = {() => onDelete(question)} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
