import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";

type TaskItemProps = {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
};

const Item = styled.li`
  padding: ${p => p.theme.spacing(1)};
  list-style: none;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.sm};
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${p => p.theme.colors.error};
  font-size: ${p => p.theme.font.size.md};
`;

const DateText = styled.span`
  color: ${p => p.theme.colors.textMuted};
  font-size: ${p => p.theme.font.size.sm};
`;

const DeadlineText = styled.span<{ color: string | undefined}>`
  color: ${p => p.color};
`;

const TaskTitle = styled.h3<{ complete: boolean }>`
  color: ${p => p.complete ? p.theme.colors.textMuted : p.theme.colors.text};
  text-decoration: ${p => (p.complete ? 'line-through' : 'none')};
`;

export function TaskItem(props: TaskItemProps) { 
  const theme = useTheme();

  const getDeadlineColor = (deadline: Date) => {
    if (!deadline) return;
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const day = diffTime / (1000 * 60 * 60 * 24);
    if (day < 0) return theme.colors.error;
    if (day <= 1) return theme.colors.warning;
    if (day <= 3) return theme.colors.accent;
    return theme.colors.textMuted
  };

  return (
    <Item> 
      <div>
        <TaskTitle
          complete={props.task.complete}
          onClick={ () => props.onToggle(props.task.id) }
        >
          {props.task.title}
        </TaskTitle>
        <DateText>
          {props.task.created.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })}
        </DateText>
        {props.task.deadline && (
          <>
            <span>--</span>
            <DeadlineText
              color={getDeadlineColor(props.task.deadline)}
            >
              {props.task.deadline?.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
             })}
            </DeadlineText>
          </>
        )}
      </div>
     
      <div>
        <StyledButton onClick={ () => props.onEdit(props.task)}>
          &#9998;
        </StyledButton>

        <StyledButton onClick={ () => props.onRemove(props.task.id)}>
          &#10060;	
        </StyledButton>
      </div>
    </Item>
  );
};
