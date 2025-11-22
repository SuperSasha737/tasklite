/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {TasksList} from "../components/tasks-list";
import { useEffect, useState } from "react";
import s from "@emotion/styled";
import { makeTask, type Task } from "../entities/task";
import { Button } from "../components/button";
import { getTasksFromLocStorage, saveTasksToLocStorage } from "../entities/storage";
import TaskModal from "../components/task-modal";


const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
`;

const StyledInput = s.input`
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.sm}
`;

export const TasksPage = () => {
  
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>(()=>getTasksFromLocStorage());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  console.log(editingTask)


  useEffect(() => { //что делает - за кем следит (зависимый массив[])
    saveTasksToLocStorage(tasks);
    
    
    // return () => {
    //   console.log('Я родился')
    // }

  }, [tasks])


  function handleAddTask(title: string){
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
    setTask('');
  };

  function handleEditTask(id: string, newTitle: string): void {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, title: newTitle} : task)
    );
  };

  function handleRemoveTask(id: string){
    setTasks(tasks.filter(t => t.id !== id));
  };

  // const arr =[1, 2, 3, 4, 5];
  // const newArr = arr.filter(number => number !== 3);
  // console.log(newArr)
  
  return (
    <Wrapper>
      <StyledInput
        onChange={e => setTask(e.target.value)}
        type="text"
        value={task}
        placeholder="введите задачу"
      />
      <Button label="Добавить" onClick={ () => handleAddTask(task)
      }></Button>
      <h2>{task}</h2>
      <TasksList tasks={tasks} 
      onRemove={handleRemoveTask}
      onEdit={t => setEditingTask(t)}/>

      {editingTask && 
      (<TaskModal 
        onSave={handleEditTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
      />)}
    </Wrapper>
  );
};

// const user = {
//   name: 'Alex',
//   isStudent: true,
// };

// const addToLocalStorage = localStorage.setItem('user', JSON.stringify(user));
// console.log(addToLocalStorage)




// const taskss: Task[] = [
//     {
//             id: '1',
//             title: 'react',
//             description: 'bla bla bla',
//             completed: false,
//             created: new Date(),
//     },

//     {
//             id: '2',
//             title: 'TS',
//     description: 'bla bla bla',
//     completed: false,
//     created: new Date(),
//     },
//     // { id: 1, name: 'Tihon' },
//     // { id: 2, name: 'Shura' },
//     // {id: 3, name: 'Sasha' },
//   ];