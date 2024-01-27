
import './App.css';
import { useEffect, useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
function App() {
  const [isCompleteScreen,setCompleteScreen] = useState(false)
  const [Todes,TodesList] = useState([])
  const [newTitle,setNewTitle] = useState("")
  const [newDes,setNewDes] = useState("")
  const [completedTodos,setCompletedTodo] = useState([])


  let handleAddTodo = () =>{
    let newTodoItem = {
      title:newTitle,
      description:newDes
    }

    let updateTodoArr = [...Todes];
    updateTodoArr.push(newTodoItem);
    TodesList(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
    console.log(localStorage)
  }

  const handleDeleteTodo=(index)=>{
    let reducedTodo = [...Todes];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    TodesList(reducedTodo)
    
  }
  
  const handleCompletedDeleteTodo=(index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodolist',JSON.stringify(reducedTodo))
    setCompletedTodo(reducedTodo)
  } 



  const handleComplete=(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' +m+ ':' + s;
    let filteredItem={
      ...Todes[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr); 
    handleDeleteTodo(index)
    localStorage.setItem('completedTodolist',JSON.stringify(updatedCompletedArr))
    


  }


  

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodolist'))
    if(savedTodo){
      TodesList(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodo(savedCompletedTodo)
    }

  },[])

  return (
      <div className="APP">
        <h1>MY TODOS</h1>

        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>TITLE</label>
              <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} type="text"/>
            </div>
            <div className="todo-input-item">
              <label>DESCRIPTION</label>
              <input value={newDes} onChange={(e)=>setNewDes(e.target.value)} type="text"/>
            </div>
            <div className="todo-input-item">
              <buttton type="button" onClick={handleAddTodo} className="primaryBtn">ADD</buttton>
            </div>
          </div>

          <div className="btn-area">
            <button 
            className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} 
            onClick={()=>setCompleteScreen(false)}
            >TODO</button>
            <button 
            className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} 
            onClick={()=>setCompleteScreen(true)}
            >COMPLETED</button>
          </div>
          <div className="todo-list">
            { isCompleteScreen===false && Todes.map((item,index)=>{
              return(
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} />
                    <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)}/> 
                  </div>
                </div>
              )
            })}


            { isCompleteScreen===true && completedTodos.map((item,index)=>{
              return(
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small> Completed on:{item.completedOn}</small></p>
                  </div>
                  <div>
                    <AiOutlineDelete className='icon' onClick={()=>handleCompletedDeleteTodo(index)} />
                    
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
  );
}

export default App;
