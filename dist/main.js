class List {
    constructor(title, todos) {
        this.title = title
        this.todos = todos
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

function addToList(title, description, dueDate, priority, list) {
    let newTodo = new Todo(title, description, dueDate, priority)
    // I first tried list.push however I needed to access the property!
    list.todos.push(newTodo)
}

let homeList = new List("Home", [])