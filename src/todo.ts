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
    status: boolean;
    tasks: Task[];

    constructor(date: Date, status: boolean, tasks: Task[]) {
        this.date = date;
        this.status = status;
        this.tasks = tasks;
    }

    // Método para converter um objeto JSON em uma instância de TodoItem
    static fromJSON(json: any): TodoItem {
        const date = new Date(json.date);
        const status = json.status;
        const tasks = json.tasks.map(Task.fromJSON); // Mapeia as tarefas para instâncias de Task
        return new TodoItem(date, status, tasks);
    }
}

export class TodoList {
    TODO: TodoItem[];

    constructor(todoItems: TodoItem[]) {
        this.TODO = todoItems;
    }
}

export function todoFromJson(json: any): TodoList {
        const todoItems = JSON.parse(json).TODO.map(TodoItem.fromJSON); // Mapeia os itens para instâncias de TodoItem
        return new TodoList(todoItems);
    }
