//유저가 값을 입력한다.
//+버튼을 클릭시 할일이 추가 된다.
//유저가 delete버튼을 누르면 리스트에서 완전 삭제 된다.
//check버튼을 누르면 밑줄이 그어진다
 //1.check버튼을 클릭하는 순간 true, false
 //2.true이면 끝난걸로 간주하고 밑줄 보여 주기
 //3.false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면 언더바가 이동
//끝난 탭과 진행중인 탭을 구분한다. 
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput=document.getElementById("task-input");

let addButton=document.getElementById("add-button");
addButton.addEventListener("click", plusTask);//클릭하면 plus함수로 이동()
let taskList=[];

let checkButton=document.getElementById("check-button");

let deleteButton=document.getElementById("delete-button");


function plusTask(){
    //let taskContent=taskInput.value;
    let task={//객체
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    };
    taskList.push(task);
    console.log("plus");
    console.log(taskList);
    render();
}

function render(){
    let resultHTML='';
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete==true){
            resultHTML+=`<div class="task">
            <div class="task-done"> ${taskList[i].taskContent}</div>
            <div>
                <button class="button-checked" onclick="toggleComplete('${taskList[i].id}')" >Check</button>
                <button  onclick="toggleDelete('${taskList[i].id}')">Delete</button>
            </div>
          </div>`;
        }else{
            resultHTML+=`<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button class="button-checked" onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML=resultHTML;
}


function toggleComplete(id){
    console.log("id: "+id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
        // if()
    }
    console.log(taskList);
    
    //changeColor();
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
}

function deleteTask(id){
    console.log("delete id"+id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);//task.length=0과 동일 단, 성능적으로 splice가 우수하여 slice사용함. 
            break;
        }
    }
    render();
    console.log(taskList);
}
/*
function changeColor(id){
    console.log("change color"+id);
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id==id){
            document.getElementsByClassName(".task").style.color=gray;
            break;
        }
    }
}*/

