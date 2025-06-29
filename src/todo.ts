export enum TodoStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS"
}

export class Task {
    content: string;
    status: boolean;

    constructor(content: string, status: boolean) {
        this.content = content;
        this.status = status;
    }

    // Método para converter um objeto JSON em uma instância de Task
    static fromJSON(json: any): Task {
        return new Task(json.content, json.status);
    }
}

export class TodoItem {
    date: Date;
    status: TaskStatus;
    tasks: Task[];

    constructor(date: Date, status: TaskStatus, tasks: Task[]) {
        this.date = date;
        this.status = status;
        this.tasks = tasks;
    }

    // Método para converter um objeto JSON em uma instância de TodoItem
    static fromJSON(json: any): TodoItem {
        const date = new Date(json.date);
        const status = json.status as TodoStatus; // Assegura que o status é do tipo TaskStatus
        const tasks = json.tasks.map(Task.fromJSON); // Mapeia as tarefas para instâncias de Task
        return new TodoItem(date, status, tasks);
    }
}

export class TodoList {
    TODO: TodoItem[];

    constructor(todoItems: TodoItem[]) {
        this.TODO = todoItems;
    }

    teste():string{
        return "teste abcd"
    }
}

export function todoFromJson(json: string): TodoList {
        const todoItems = JSON.parse(json).TODO.map(TodoItem.fromJSON); // Mapeia os itens para instâncias de TodoItem
        return new TodoList(todoItems);
    }
