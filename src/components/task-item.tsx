import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { useState } from "react";

type TaskItemProps = {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
  isFirst?: boolean;
};

const Item = styled.li`
  padding: ${p => p.theme.spacing(1)};
  list-style: none;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.sm};
`;

const Content = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
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

const TaskTitle = styled.h3<{ complete: boolean; isFirst?:
boolean }>`
  color: ${p => p.complete ? p.theme.colors.textMuted : p.theme.colors.text};
  text-decoration: ${p => (p.complete ? 'line-through' : 'none')};
  cursor: pointer;
  font-weight: ${(p) => (p.isFirst ? "bold" : "normal")};
  user-select: none;
`;

const TitleRow = styled.div`
 display: flex;
 align-items: flex-end;
 gap: ${(p) => p.theme.spacing(0.5)};
`;

const Description = styled.div<{ expanded: boolean }>`
 font-size: 13px;
 color: ${(p) => p.theme.colors.textMuted};
 font-weight: normal; /* всегда обычный вес */
 margin-top: ${(p) => p.theme.spacing(1)};
 line-height: 1.5;
 max-height: ${(p) => (p.expanded ? "200px" : "0")};
 opacity: ${(p) => (p.expanded ? 1 : 0)};
 overflow: hidden;
 transition: max-height 0.3s ease, opacity 0.3s ease;
 `;

const MoreButton = styled.button`
 border: none;
 background: transparent;
 cursor: pointer;
 padding: 2px;
 display: inline-flex;
 align-items: center;
 justify-content: center;

 svg {
 width: 14px;
 height: 14px;
 }
`;

const DatesRow = styled.div`
 display: flex;
 align-items: flex-end;
 gap: ${(p) => p.theme.spacing(1)};
 font-size: 12px;
 margin-top: 2px;
`;

const Arrow = styled.span`
 color: ${(p) => p.theme.colors.textMuted};
`;

export function TaskItem(props: TaskItemProps) { 
  const theme = useTheme();
  const [showDescription, setShowDescription] = useState(false);

  const getDeadlineColor = (deadline: Date, theme: any) => {
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
      <Content> 
        <TitleRow>
        <TaskTitle
          complete={props.task.complete}
          isFirst={props.isFirst}
          onClick={ () => props.onToggle(props.task.id) }
        >
          {props.task.title}
        </TaskTitle>
        {props.task.description && props.task.description.trim() !== "" &&
          (
          <MoreButton
          onClick={() => setShowDescription((v) => !v)}
          aria-label="Показать описание"
          >
          <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          <circle cx="5" cy="12" r="2" fill="#666" />
          <circle cx="12" cy="12" r="2" fill="#666" />
          <circle cx="19" cy="12" r="2" fill="#666" />
          </svg>
          </MoreButton>
        )}
        </TitleRow>
        <Description expanded={showDescription}>
        {props.task.description}
        </Description>
        <DatesRow>
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
            <Arrow>→</Arrow>
            <DeadlineText
              color={getDeadlineColor(props.task.deadline, theme)}
            >
              {props.task.deadline?.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
             })}
            </DeadlineText>
          </>
        )}
        </DatesRow>
      </Content>
     
      <Content>
        <StyledButton onClick={ () => props.onEdit(props.task)}>
          &#9998;
        </StyledButton>

        <StyledButton onClick={ () => props.onRemove(props.task.id)}>
          &#10060;	
        </StyledButton>
      </Content>
    </Item>
  );
};
