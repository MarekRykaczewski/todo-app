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

    removeList(index) {
       this.lists.splice(index)
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
        saveStorage(this.title)
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
        const newTodoExpandBtn = document.createElement("button")
        const newTodoEditBtn = document.createElement("button")
        newTodoExpandBtn.className = "todo-expand-button"
        newTodoEditBtn.className = "todo-edit-button"
        newTodo.className = "todo-item"
        newTodoDeleteBtn.dataset.indexNum = list.todos.at(position).id
        newTodoBtn.className = "todo-submit-button"
        newTodoTitle.append(newTodoTitleText)
        newTodoDeleteBtn.className = "delete-button"
        let todoId = parseInt(newTodoDeleteBtn.dataset.indexNum)
        const index = list.todos.find(x => x.id === todoId)
        newTodoDeleteBtn.onclick = function() {
            list.removeFromList(index)
            newTodoDeleteBtn.parentNode.parentNode.removeChild(newTodoDeleteBtn.parentNode)
            saveStorage(list.title)
        }
        const newTodoTitleEdit = document.createElement("input")
        const newTodoPrioEdit = document.createElement("input")
        newTodoPrioEdit.setAttribute("type", "number")
        newTodoPrioEdit.setAttribute("min", 1)
        newTodoPrioEdit.setAttribute("max", 5)
        const newTodoDateEdit = document.createElement("input")
        newTodoDateEdit.setAttribute("type", "date")
        newTodoEditBtn.onclick = function() {
            
            newTodoTitleEdit.value = newTodoTitle.innerHTML
            newTodoTitle.parentNode.replaceChild(newTodoTitleEdit, newTodoTitle)
            
            // newTodoPrioEdit.value = prio.innerHTML
            prio.parentNode.replaceChild(newTodoPrioEdit, prio) 
            
            // newTodoDateEdit.value = date.innerHTML
            date.parentNode.replaceChild(newTodoDateEdit, date)
            // saveStorage(list.title)
        }
        
        newTodo.append(newTodoBtn)
        newTodo.append(newTodoEditBtn)

        newTodoBtn.onclick = function() {
            index.title = newTodoTitleEdit.value
            index.priority = newTodoPrioEdit.value
            index.dueDate = newTodoDateEdit.value
            while (display.firstChild) {
                display.removeChild(display.lastChild)
            }
            displayController.refreshTodos(currentList)
            saveStorage(list.title)
        }

        let detailsContainer = document.createElement("div")
        
        // const newTodoPrioContainer = document.createElement("div")
        // const newTodoDateContainer = document.createElement("div")
        // newTodoPrioContainer.className = "detail-container"
        // newTodoDateContainer.className = "detail-container"

        detailsContainer.setAttribute("id","details-container");

        let prio = document.createElement("p")
        let prioText = document.createTextNode("Priority: " +  list.todos.at(position).priority)
        prio.appendChild(prioText)
        // newTodoPrioContainer.appendChild(prio)

        let date = document.createElement("p")
        let dateText = document.createTextNode("Date: " +  list.todos.at(position).dueDate)
        date.appendChild(dateText)
        // newTodoDateContainer.appendChild(date)

        detailsContainer.appendChild(newTodoTitle)
        detailsContainer.appendChild(prio)
        detailsContainer.appendChild(date)

        newTodo.appendChild(detailsContainer)
        // detailsContainer.style.display = "none" 
        
        newTodo.append(newTodoExpandBtn)
        newTodo.append(newTodoDeleteBtn)
        display.append(newTodo)

        newTodoExpandBtn.onclick = function() {
            if (newTodo.classList.contains("todo-expanded")) {
                newTodo.classList.remove("todo-expanded")
                // detailsContainer.style.display = "none"
            } else {
                newTodo.classList.add("todo-expanded")
                // detailsContainer.style.display = "flex"
            }   
        }
        
    }

    createList(name) {
        let self = this
        const display = document.getElementById("display-items")
        const lists = document.getElementById("sidebar")
        const newList = document.createElement("div")
        newList.className = "list-item"
        const newListName = document.createTextNode(name)
        const newListDeleteBtn = document.createElement("button")
        newListDeleteBtn.className = "list-delete-button"
        const newListContainer = document.createElement("div")
        newList.dataset.indexNum = listManager.lists.at(-1).id
        newList.append(newListName)
        newListContainer.append(newList)
        newListContainer.append(newListDeleteBtn)
        lists.append(newListContainer)
        newListContainer.className = "userlist"
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
        newListDeleteBtn.addEventListener("click", function() {
            let listId = parseInt(newList.dataset.indexNum)
            listManager.removeList(listId)
            newListDeleteBtn.parentNode.parentNode.removeChild(newListDeleteBtn.parentNode)
            console.log(listId)
            localStorage.removeItem(name)
           
        })
    }

    refreshTodos(list) {
        for(let i = 0; i < list.todos.length; i++) {
            this.createTodo(list, i)
        }
    }
}

let library = JSON.parse(window.localStorage.getItem("lists"))

let listManager = new ListManager
let displayController = new DisplayController

let homeList = "Home"
listManager.addList(homeList)
let currentList = listManager.lists[0]

function saveStorage(listTitle) {
    let list = listManager.lists.find(x => x.title === listTitle)
    localStorage.setItem(listTitle, JSON.stringify(list))
}

let arrayOfKeys = Object.keys(localStorage);

function loadStorage(listTitle) {
    let loaded = JSON.parse(window.localStorage.getItem(listTitle))
    if (arrayOfKeys.includes(listTitle)) {
        listManager.loadList(listTitle, loaded.todos)
        displayController.createList(listTitle)
        }
    }

function loadAll() {
    for (let i = 0; i < arrayOfKeys.length; i++) { // loop through all localStorage keys
        loadStorage(arrayOfKeys[i])
    }
}

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

loadAll()