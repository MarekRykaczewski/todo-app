class List {
    constructor(title, todos) {
        this.title = title
        this.todos = todos
    }

    addToList(title, description, dueDate, priority) {
        let newTodo = new Todo(title, description, dueDate, priority)
        this.todos.push(newTodo)
    }

    removeFromList(index) {
        this.todos.splice(index, 1)
    }

}

let counter = 0;

class Todo {
    constructor(title, description, dueDate, priority) {
        this.id = counter++
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }

}

class DisplayController {
    createTodo(list) {
        const display = document.getElementById("display-items")
        const newTodo = document.createElement("div")
        const newTodoTitle = document.createElement("p")
        const newTodoTitleText = document.createTextNode(list.todos.at(-1).title)
        const newTodoBtn = document.createElement("button")
        const newTodoDeleteBtn = document.createElement("button")
        newTodo.className = "todo-item"
        newTodoDeleteBtn.dataset.indexNum = list.todos.at(-1).id
        newTodoBtn.className = "submit-button"
        newTodoTitle.append(newTodoTitleText)
        newTodoDeleteBtn.className = "delete-button"
        newTodoDeleteBtn.onclick = function() {
            let todoId = parseInt(newTodoDeleteBtn.dataset.indexNum)
            const index = list.todos.find(x => x.id === todoId)
            list.removeFromList(index)
            newTodoDeleteBtn.parentNode.parentNode.removeChild(newTodoDeleteBtn.parentNode)
        }
        newTodo.append(newTodoBtn)
        newTodo.append(newTodoTitle)
        newTodo.append(newTodoDeleteBtn)
        display.append(newTodo)
    }

    createList(name) {
        const lists = document.getElementById("sidebar")
        const newList = document.createElement("div")
        const newListName = document.createTextNode(name)
        newList.className = "userlist"
        newList.append(newListName)
        lists.append(newList)
    }
}

let displayController = new DisplayController
let homeList = new List("Home", [])

// homeList.addToList("workout", "buy milk", "tomorrow", "high")
// displayController.createTodo(homeList)

const todoInput = document.querySelector("#new-todo-button")
const todoInputText = document.querySelector("#new-task-input")
todoInput.onclick = function() {
    text = todoInputText.value
    homeList.addToList(text)
    displayController.createTodo(homeList)
}
