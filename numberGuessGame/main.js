/*랜덤 번호 지정
 유저가 게임 시작
 유저가 번호 입력-> go 버튼 누름
 값을 정답과 비교하여 
 맞으면 정답! 다르면 up, down 표시 
 리셋 버튼을 누르면 게임이 리셋되다.
 기회는 ㅣ총 다섯번, 기회를 다쓰면 게임끝 다시 추측 불가, (=버튼 disable)
 범위 초과, 미만의 수 입력 시 알려주고, 기회는 차감하지 않는다.
 유저가 이미 입력한 수를 입력시 또 입력했다고 알려주고 기회는 차감하지 않는다.*/

let computerNumber=0;//컴퓨터가 제시한 번호 
let playGame=document.getElementById("play-button");//play-button이라는 id를 가진 element를 불러와서 playGame변수에 저장;
playGame.addEventListener("click", play);//playGame은 유저가 go버튼을 클릭해야 게임을 실행(=play함수)하는 이벤트를 가짐 

let userInput=document.getElementById("user-input");

let resetGame=document.getElementById("reset-button");
resetGame.addEventListener("click", reset);//버튼을 클릭하면 게임 리셋 이벤트 

let chances=5; //남은 기회를 하나씩 감소시키기 위해 사용
let gameOver=false;//게임종료 비활
let resultArea=document.getElementById("result-area");//화면에 결과를 보여줌
remainChance=document.getElementById("remain-chance");//남은기회를 보여줌 

let history=[];//유저가 입력한 숫자를 저장하는 배열


function randomNumber(){
    computerNumber=Math.floor(Math.random()*100)+1;
    console.log("정답 : "+computerNumber);
}

function play(){//컴퓨터가 제시한 번호와 사용자가 입력한 번호를 비교하여 값을 up,down,correct를 알려줌
    let userValue=userInput.value; //위 절차를 실행하기 위해서는 사용자가 입력한 값을 불러와야함.
       
    if(userValue <1 || userValue>100){//사용자가 입력한 숫자의 유효성 검사
        resultArea.textContent="범위내의 숫자를 입력해 주세요.";
        console.log("범위내의 숫자를 입력해 주세요 ");
        return ;//아무것도 반환하지 않고 해담 조건을 만족하면 게임은 중단되야함으로 return사용    
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자 입니다. 다른 숫자를 입력해 주세요.";
        return ;
    }
    chances--;//유효성 검사를 통과하면 이제 본격적으로 게임 start
    remainChance.textContent=`남은 기회 : ${chances}`;
    console.log("chance : " +chances);

    if(computerNumber>userValue ){
        resultArea.textContent="UP";
        console.log("UP!");
    }else if(computerNumber<userValue){
        resultArea.textContent="DOWN";
        console.log("DOWN!");
    }else{
        resultArea.textContent="CORRECT";
        gameOver=true;
        console.log("CORRECT!");
        chances=5;
        console.log("정답 맞추면 남은 기회는 5로 초기화"+chances);
    }
    history.push(userValue);//유저가 입력한 숫자를 history배열에 넣음
    console.log("History: "+history);
    
    if(chances<1){//남은기회가 0이면 
        gameOver=true;//게임오버는 활성화 
        playGame.disabled=true;//go-btn 클릭 불가
        //게임기회내에 맞추지 못하면 창을 띄워!~> YOU LOSE! TRY AGAIN?=>추가할 사항
    }
    if(gameOver==true){//게임오버가 활성화 되었다면
        playGame.disabled=true; //playGame(=GO-Button)은 비활성화(클릭이 가능해져서는 안됨)
    }
} 
function reset(){
    userInput.value="";
    playGame.disabled=false;
    randomNumber();
    resultArea.textContent="결과값이 여기 나옵니다."
    history.splice(0, history.length);//reset을 누르면 이전에 입력하여 저장된 수들을 초기화함 (=history.length=0과 동일: 단, 성능면에서 좀 더 우수하여 사용함 )
    chances=5;
    gameOver=false;
    remainChance.textContent=`남은 기회 : ${chances}`;
}
userInput.addEventListener("focus", function(){
    userInput.value="";
});

randomNumber();