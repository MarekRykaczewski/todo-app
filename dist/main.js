const todoInput = document.querySelector("#new-todo-button")
const todoInputText = document.querySelector("#new-task-input")
const todoInputPrio = document.querySelector("#new-task-priority")
const todoInputDate = document.querySelector("#new-task-date")
const listInput = document.querySelector("#new-list-button")
const listInputText = document.querySelector("#new-list-input")

class ListManager {
    constructor(lists) {
        this.lists = []
    }

    addList(list) {
        let newList = new List(list, [])
        this.lists.push(newList)
    }

    loadList(list, todos) {
        let loadedList = new List(list, todos)
        this.lists.push(loadedList)
    }
}

let listCounter = 0;

class List {
    constructor(title, todos) {
        this.id = listCounter++
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

let todoCounter = 0;

class Todo {
    constructor(title, description, dueDate, priority) {
        this.id = currentList.todos.length
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }

}

class DisplayController {
    createTodo(list, position) {
        const display = document.getElementById("display-items")
        const newTodo = document.createElement("div")
        const newTodoTitle = document.createElement("p")
        const newTodoTitleText = document.createTextNode(list.todos.at(position).title)
        const newTodoBtn = document.createElement("button")
        const newTodoDeleteBtn = document.createElement("button")
        newTodo.className = "todo-item"
        newTodoDeleteBtn.dataset.indexNum = list.todos.at(position).id
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

        let todoId = parseInt(newTodoDeleteBtn.dataset.indexNum)
        

        let result = currentList.todos.filter(obj => {
            return obj.id === todoId
        })

        console.log(Object.values(result)[0])
        let index = Object.values(result)[0]

        let detailsContainer = document.createElement("div")
        detailsContainer.setAttribute("id","details-container");

        let prio = document.createElement("span")
        let prioText = document.createTextNode("Priority: " + currentList.todos[index.id].priority)
        prio.appendChild(prioText)
        detailsContainer.appendChild(prio)

        let date = document.createElement("span")
        let dateText = document.createTextNode("Date: " + currentList.todos[index.id].dueDate)
        date.appendChild(dateText)
        detailsContainer.appendChild(date)

        newTodo.appendChild(detailsContainer)
        detailsContainer.style.display = "none"

        newTodo.onclick = function() {
            if (newTodo.classList.contains("todo-expanded")) {
                this.classList.remove("todo-expanded")
                detailsContainer.style.display = "none"
            } else {
                this.classList.add("todo-expanded")
                detailsContainer.style.display = "flex"
            }   
        }
        
    }

    createList(name) {
        let self = this
        const display = document.getElementById("display-items")
        const lists = document.getElementById("sidebar")
        const newList = document.createElement("div")
        const newListName = document.createTextNode(name)
        newList.className = "userlist"
        newList.dataset.indexNum = listManager.lists.at(-1).id
        newList.append(newListName)
        lists.append(newList)
        newList.addEventListener("click", function() {
            const header = document.querySelector("#display-header")
            header.innerHTML = name
            let listId = parseInt(newList.dataset.indexNum)
            currentList = listManager.lists.find(x => x.id === listId)
            while (display.firstChild) {
                display.removeChild(display.lastChild)
            }
            self.refreshTodos(currentList)
        })
    }

    refreshTodos(list) {
        for(let i = 0; i < list.todos.length; i++) {
            this.createTodo(list, i)
        }

    }
}

console.log(JSON.parse(window.localStorage.getItem("lists")))
let library = JSON.parse(window.localStorage.getItem("lists"))
if (window.localStorage.getItem("lists")) {
    console.log("true")
}

function loadStorage() {
    for (let i = 1; i < library.length; i++) { // for each list in library
        listManager.addList(library[i].title) // add list with name of title
        console.log(listManager.lists[listManager.lists.length - 1])
        let now = listManager.lists[listManager.lists.length - 1] // get the last element in listManager
        for (let j = 0; j < library[i].todos.length; j++) { // for each todo in list
            now.addToList(library[i].todos[j].title, library[i].todos[j].description, library[i].todos[j].dueDate, library[i].todos[j].priority) // add todo to list
        }
        
        displayController.createList(library[i].title)
    }
}

function saveStorage() {
    localStorage.setItem("lists", JSON.stringify(listManager.lists))
}


let listManager = new ListManager
let displayController = new DisplayController

let homeList = "Home"
listManager.addList(homeList)
let currentList = listManager.lists[0]


todoInput.onclick = function() {
    title = todoInputText.value
    priority = todoInputPrio.value
    date = todoInputDate.value
    currentList.addToList(title, "", date, priority)
    displayController.createTodo(currentList, -1)
}

listInput.onclick = function() {
    text = listInputText.value
    listManager.addList(text)
    displayController.createList(text)
}
