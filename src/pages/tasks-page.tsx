/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {TasksList} from "../components/tasks-list";
import { useEffect, useMemo, useState } from "react";
import s from "@emotion/styled";
import { makeTask, type Task } from "../entities/task";
import { Button } from "../components/button";
import { getTasksFromLocStorage, saveTasksToLocStorage } from "../entities/storage";
import TaskModal from "../components/task-modal";
import ProgressBar from "../components/progress-bar";
import { FilterBar } from "../views/filter-bar";


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
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [query, setQuery] = useState<string>('');

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

  function handleEditTask(
    id: string, 
    newTitle: string, 
    newDesc: string, 
    newDeadline: Date | null): void {
    setTasks(
      tasks.map(task => 
        task.id === id ? {
           ...task,
           title: newTitle,
           description: newDesc,
           deadline: newDeadline,
          } : task)
    );
  };

  function handleRemoveTask(id: string){
    setTasks(tasks.filter(t => t.id !== id));
  };

  function handleToggleTask(id: string){
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, complete: !task.complete } : task)
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "active") return !task.complete;
      if (filter === "completed") return task.complete;
      return true;
    });
  }, [tasks, filter]);
  
  // Оптимизация
  // tasks.filter(function (task) {
  //   if (filter === 'completed') return task.complete; //только невыполненные
  //   if (filter === 'active') return !task.complete; //только завершённые
  //   return true; //"all" — без фильтра
  // });

  const searchedTasks = useMemo(() => {
    return filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [filteredTasks, query]);
  
  // filteredTasks.filter(task => {
  //   return task.title.toLowerCase().includes(query.toLowerCase().trim());
  // });

  const total = tasks.length;
  let completedTasks = tasks.filter(t => t.complete).length;
  let activeTasks = total - completedTasks;
  let percent = total === 0 ? 0 : Math.round((completedTasks / total) * 100);

  // const arr =[1, 2, 3, 4, 5];
  // const newArr = arr.filter(number => number !== 3);
  // console.log(newArr)
  
  return (
    <Wrapper>
      <StyledInput
        onChange={e => setTask(e.target.value)}
        type="text"
        value={task}
        placeholder="Введите задачу"
      />
      <Button label="Добавить" onClick={ () => handleAddTask(task)
      }></Button>
      {/* <h2>{task}</h2> */}
      <StyledInput placeholder="Поиск" type="text" onChange={e => setQuery(e.target.value)}/>

      <FilterBar filter={filter} onChange={setFilter} />
      <ProgressBar percent={percent} />
      
      <TasksList 
        tasks={searchedTasks} //было: просто tasks
        onRemove={handleRemoveTask}
        onEdit={t => setEditingTask(t)}
        onToggle={handleToggleTask}
      />
      
      <p>
        Всего: {total} | Активных: {activeTasks} | Выполненных: {completedTasks}
      </p>

      {editingTask && (
        <TaskModal 
          onSave={handleEditTask}
          onClose={() => setEditingTask(null)}
          task={editingTask}
      />
      )}
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