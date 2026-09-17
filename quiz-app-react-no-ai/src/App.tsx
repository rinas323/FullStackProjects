import { useState } from "react";
import { Button } from "./components/ui/button"

const ArrowLeft = ({ size = 20, color = "currentColor" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ArrowRight = ({ size = 20, color = "currentColor" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

interface quest{
  id:number;
  question:string,
  options:string[],
  correctAnswer:string
}

function validateAnswer(answer:string,question:quest){
  if(answer===question.correctAnswer){
     return true;
  }else{
    return false;
  }


}

export default function App() {
  const historyQuestions = [
  {
    id: 1,
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1950", "1939"],
    correctAnswer: "1945"
  },
  {
    id: 2,
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
    correctAnswer: "George Washington"
  },
  {
    id: 3,
    question: "The ancient city of Carthage was located in present-day which country?",
    options: ["Greece", "Tunisia", "Italy", "Egypt"],
    correctAnswer: "Tunisia"
  },
  {
    id: 4,
    question: "Who delivered the famous 'I Have a Dream' speech in 1963?",
    options: ["Malcolm X", "Rosa Parks", "Martin Luther King Jr.", "John Lewis"],
    correctAnswer: "Martin Luther King Jr."
  },
  {
    id: 5,
    question: "The Fall of the Berlin Wall occurred in which year?",
    options: ["1987", "1989", "1991", "1985"],
    correctAnswer: "1989"
  },
  {
    id: 6,
    question: "Which empire was ruled by Julius Caesar during its transition phase?",
    options: ["Roman Empire", "Ottoman Empire", "British Empire", "Mongol Empire"],
    correctAnswer: "Roman Empire"
  },
  {
    id: 7,
    question: "Who was the first Emperor of a unified China?",
    options: ["Kublai Khan", "Sun Yat-sen", "Qin Shi Huang", "Emperor Taizong"],
    correctAnswer: "Qin Shi Huang"
  },
  {
    id: 8,
    question: "In which century was the Magna Carta signed?",
    options: ["11th Century", "12th Century", "13th Century", "14th Century"],
    correctAnswer: "13th Century"
  },
  {
    id: 9,
    question: "Which country gifted the Statue of Liberty to the United States?",
    options: ["United Kingdom", "France", "Spain", "Germany"],
    correctAnswer: "France"
  },
  {
    id: 10,
    question: "Who discovered penicillin in 1928?",
    options: ["Louis Pasteur", "Alexander Fleming", "Marie Curie", "Jonas Salk"],
    correctAnswer: "Alexander Fleming"
  }
];

const [questionNumber,setQuestionNumber] = useState(0);
const [correctAnswer,setCorrectAnswer] = useState(0);

  return (
    <div className="">
      <div className="navbar w-screen h-15 bg-blue-600 shadow-2xl shadow-slate-500 flex justify-center items-center mb-6">
        <div className="text-amber-100 text-3xl">QUIZ APP</div>
      </div>
      <div className=" score-card-container flex justify-center items-center w-screen mb-3.5">
        <button onClick={()=>{
          setQuestionNumber(prev=>(Math.abs(prev-1))%10)
        }}><ArrowLeft/></button>
        <div className="score-card h-10 w-20 bg-black rounded-[10px] flex text-white">
          <div className="attained-score w-[50%] bg-green-700 h-full rounded-l-[10px] flex justify-center items-center">{correctAnswer}</div>
          <div className="total-score w-[50%] h-full rounded-[10px] justify-center items-center flex">10</div>
        </div>
        <button onClick={()=>{
          setQuestionNumber(prev=>(prev+1)%10)
        }}><ArrowRight/></button>
      </div>
      <div className="quiz-container w-screen flex justify-center items-center">
        <div className="quiz-frame h-70 w-140 bg-blue-500 rounded-2xl wrap-word-break">
          <div className="question-frame h-40 flex p-4 text-white">
            <span>{questionNumber+1}.</span>
            <div>{historyQuestions[questionNumber].question}</div>
          </div>
          <div className="option-frame h-30 bg-slate-800 rounded-b-2xl text-white flex justify-center items-center">
            <div className="button-container">
              <div className="top-two-button m-7 flex gap-7">
              <Button onClick={()=>{
                let qn = historyQuestions[questionNumber];
                let ans=validateAnswer(qn.options[0],qn);
                if(ans) {
                  setQuestionNumber(prev=>(prev+1%10));
                  setCorrectAnswer(prev=>(prev+1)%11);}
              }}>{historyQuestions[questionNumber].options[0]}</Button>
              <Button onClick={()=>{
               let qn = historyQuestions[questionNumber];
                let ans=validateAnswer(qn.options[1],qn); 
                if(ans) {
                  setQuestionNumber(prev=>(prev+1)%10);
                  setCorrectAnswer(prev=>(prev+1)%11);}
              }}>{historyQuestions[questionNumber].options[1]}</Button>
              </div>
              <div className="bottom-two-button m-7 flex gap-7">
              <Button onClick={()=>{
                let qn = historyQuestions[questionNumber];
                let ans=validateAnswer(qn.options[2],qn);
                if(ans) {
                  setQuestionNumber(prev=>(prev+1)%10);
                  setCorrectAnswer(prev=>(prev+1)%11);}
              }}>{historyQuestions[questionNumber].options[2]}</Button>
              <Button onClick={()=>{
                let qn = historyQuestions[questionNumber];
                let ans=validateAnswer(qn.options[3],qn);
                if(ans) {
                  setQuestionNumber(prev=>(prev+1)%10);
                  setCorrectAnswer(prev=>(prev+1)%11);}
              }}>{historyQuestions[questionNumber].options[3]}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
