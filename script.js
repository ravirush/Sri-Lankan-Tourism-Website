//getting all required elements
const start_btn= document.querySelector(".start_btn button");
const info_box= document.querySelector(".info_box");
const exit_btn= info_box.querySelector(".buttons .quit");
const continue_btn= info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeoff = quiz_box.querySelector("header .time_text");
const option_list=document.querySelector(".option_list");

//if start Quiz Button Clicked
start_btn.onclick=()=>{
  info_box.classList.add("activeInfo");//show the info box
}

//if Exit quiz Button Clicked
exit_btn.onclick=()=>{
  info_box.classList.remove("activeInfo");//hide the info box
}

//if Continue Button Clicked
continue_btn.onclick=()=>{
  info_box.classList.remove("activeInfo");//hide the info box
  quiz_box.classList.add("activeQuiz");//show the quiz box
  showQuestions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(6); //calling startTimer function
}

let que_count=0;
let que_numb=1;
let counter;
let timeValue =6;
let widthValue = 0;
let userScore=0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 6;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    next_btn.style.display = "none"; //hide the next button
    startTimer(timeValue); //Starting the timer again with the updated timeValue by calling the startTimer() function
}

// if quit Quiz button clicked
quit_quiz.onclick=()=>{
  window.location.reload(); //reload the current window
}

//if next button clicked
next_btn.onclick=()=>{
  if(que_count < questions.length - 1){ //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    clearInterval(counter); //clear counter
    showQuestions(que_count); //calling showQestions function
    startTimer(timeValue); //calling startTimer function
    queCounter(que_numb); //passing que_numb value to queCounter
    next_btn.style.display = "none"; //hide the next button
    timeoff .textContent = "Time Left"; //change the timeText to Time Left
  }else{
    clearInterval(counter); //clear counter
    console.log("Questions completed") 
    showResultBox(); //calling showResult function
  }
}

//getting questions and options from array
function showQuestions(index){
  const que_text=document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag= '<span>'+ questions[index].numb +". " + questions[index].question+'</span>';
  let option_tag='<div class="option">'+ questions[index].options[0]+'<span></span></div>'
    +'<div class="option">'+ questions[index].options[1]+ '<span></span></div>'
    +'<div class="option">'+ questions[index].options[2]+ '<span></span></div>'
    +'<div class="option">'+ questions[index].options[3]+ '<span></span></div>';
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option")

  // set onclick attribute to all available options
  for (let i = 0; i<option.length; i++){
    option[i].setAttribute("onclick","optionSelected(this)");
  }
}

// creating the new div tags which for icons
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
  clearInterval(counter); //clear counter
  let userAns = answer.textContent; //getting user selected option
  let correctAns = questions[que_count].answer; //getting correct answer from array
  let allOptions = option_list.children.length; //getting all option items

  if(userAns == correctAns){ //if user selected option is equal to array's correct answer
    userScore +=1; //upgrading score value with 1
    console.log(userScore);
    answer.classList.add("correct"); //adding green color to correct selected option
    console.log("Answer is Correct");
    answer.insertAdjacentHTML("beforeend",tickIcon); //adding tick icon to correct selected option
  }else{
    answer.classList.add("incorrect"); //adding red color to correct selected option
    console.log("Answer is Wrong");
    answer.insertAdjacentHTML("beforeend",crossIcon); //adding cross icon to correct selected option

    //if answer is incorrect then automatically selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if(option_list.children[i].textContent==correctAns){ //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend",tickIcon); //adding tick icon to matched option
      }
    }
  }

  //once user selected disable all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.style.display = "block";
}

//function that shows the result box once the user has completed the quiz
function showResultBox(){
  info_box.classList.remove("activeInfo");//hide the info box
  quiz_box.classList.remove("activeQuiz");//show the quiz box
  result_box.classList.add("activeResult");//show the result box
  const scoreText = result_box.querySelector(".score_text");

  if(userScore > 7){ // if user scored more than 7
    //creating a new span tag and passing the user score number and total question number
    let scoreTag ='<span>and congrats!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else if(userScore > 5){ //if user scored more than 5
    let scoreTag ='<span>and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else{ //if user scored less than 5
    let scoreTag ='<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

//function for start a countdown timer for the quiz
function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9){ //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if(time < 0){ //if timer is less than 0
      clearInterval(counter); //clear counter
      timeCount.textContent="00";
      timeoff .textContent = "Time off"; //change the time text to time off

      let correctAns = questions[que_count].answer; //getting correct answer from array
      let allOptions = option_list.children.length; //getting all option items

      for (let i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent==correctAns){ //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend",tickIcon); //adding tick icon to matched option
        }
      }
      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.style.display = "block";
    }
  }
}

//function to update the question count number displayed in the bottom of the quiz box
function queCounter(index){
  console.log(index);
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  //creating a new span tag and passing the question number and total question
  let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length+'</p>Questions</span>';
  bottom_ques_counter.innerHTML= totalQuesCountTag; //adding new span tag inside bottom_ques_counter
}