import type { Task } from "../entities/task";
import { TaskItem } from "./task-item";

type TaskListProps = {
    tasks: Task[];
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
};

export function TasksList(props: TaskListProps) {
    const result = props.tasks.map(task => {
        return (
        <TaskItem 
            key={task.id} 
            task={task} 
            onEdit={props.onEdit} 
            onRemove={props.onRemove}
            />
        );
    });

   const listTask = result.length > 0 ? result : <li>Список задач пуст</li>

   return <ul>{listTask}</ul>
}   


// return <ul>{result.length > 0 ? result : 'Список задач пуст'}</ul>;