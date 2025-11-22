import type { Task } from "./task";

const STORAGE_KEY = 'tasks';

export function saveTasksToLocStorage(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export function getTasksFromLocStorage(): Task[]{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    
    const parsed = JSON.parse(raw);
    return parsed.map((t: any) => ({
        ...t,
        created: new Date(t.created),
    })
    );
};