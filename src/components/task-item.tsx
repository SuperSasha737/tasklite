import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { useState } from "react";

type TaskItemProps = {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
};

const Item = styled.li`
    padding: ${p => p.theme.spacing(1)};
    list-style: none;
    display: flex;
    justify-content: space-between;
    border: 1px solid ${p => p.theme.colors.border};
    border-radius: ${p => p.theme.radius.sm}
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${p => p.theme.colors.error};
  font-size: ${p => p.theme.font.size.md};
`;

const DateText = styled.span`
    color: ${p => p.theme.colors.textMuted};
    font-size: ${p => p.theme.font.size.sm}
`;

export function TaskItem(props: TaskItemProps) { 
  const [draft, setDraft] = useState('');
  const [isEditing, setIsEditing] = useState('');
  // 

  function handleSave() {
    props.onEdit(props.task.id, draft)
  }
  
  return <Item> 
      <div>
        <h3>{props.task.title}</h3> 
       
        {isEditing &&(<input type="text" onChange={e => setDraft(e.target.value)} onBlur={() => handleSave}/>)}
       
        <DateText>
          {props.task.created.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })}</DateText>
      </div>
     
      <div>
        <StyledButton onClick={ () => props.onEdit(props.task)}>
          &#9998;
        </StyledButton>

        <StyledButton onClick={ () => props.onRemove(props.task.id)}>
          &#10060;	
        </StyledButton>
      </div>
    </Item>;
};
