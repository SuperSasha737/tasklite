import { useEffect, useState } from "react";
import { normalizeTitle } from "../utils/utils";
import type { Task } from "../entities/task";

type TaskModalProps = {
    onClose: () => void;
    onSave: (id: string, title: string) => void;
    task: Task;
};

export default function TaskModal(props: TaskModalProps) {
    const [title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    
    useEffect(()=>{
        const handler = (e: KeyboardEvent) => {
            if(e.code === 'Escape') props.onClose();
        };    
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler)
    }, [props]);
    console.log(props)

    return (
        <div>
            <div>
                <h2>Редактирование задачи</h2>
                <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                />
                
                <textarea
                    value={description} 
                    onChange={e => setDescription(e.target.value)}>
                </textarea>

                <div>
                    <button onClick={ () => props.onClose()}>Отмена</button>
                    <button 
                        onClick={ () => {
                            if(title.trim() !== '') {
                            props.onSave(
                                props.task.id, 
                                normalizeTitle(title)
                            );      
                            props.onClose();                      
                            }
                        }}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );

}