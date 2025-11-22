// src/entities/task.ts
// Тип задачи
export type Task = {
    readonly id: string;     // уникальный идентификатор
    title: string;           // текст задачи
    description: string;
    completed: boolean;      // статус выполнения
    created: Date;         // дата создания
    deadline?: Date | null;
};

// Тип фильтра для списка задач
export type Filter = "all" | "active" | "completed";

export function getRandomId() {
    return Math.random().toString(36).slice(2, 9);
}

// Фабрика для создания новой задачи
export function makeTask(title: string): Task {
    return {
        id: getRandomId(), // простая генерация id
        title: title.trim(),
        description: 'ok',
        completed: false,
        created: new Date()
    };
}
