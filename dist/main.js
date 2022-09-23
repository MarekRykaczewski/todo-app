class List {
    constructor(title, todos) {
        this.title = title
        this.todos = todos
    }

    addToList(title, description, dueDate, priority) {
        let newTodo = new Todo(title, description, dueDate, priority)
        this.todos.push(newTodo)
    }
}

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

class DisplayController {
    updateList(list) {
        const display = document.getElementById("display-items")
        const newTodo = document.createElement("div")
        const newTodoTitle = document.createTextNode(list.todos.at(-1).title)
        newTodo.append(newTodoTitle)
        display.append(newTodo)
    }
}

let displayController = new DisplayController
let homeList = new List("Home", [])