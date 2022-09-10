let tempLocation = document.querySelector("#lists");
let listCreation = document.querySelector("#createNewList");
listCreation.addEventListener("submit", function(event){
    event.preventDefault()
    addList(event)
})
let allLists = {};
class TodoList{

    constructor(listName, date, description, color){
        this.listName =  listName;
        this.date = date;
        this.description = description;
        this.color = color
    }
    static showList(list){
        console.log(list.listName, list.date, list.description);
    }
    showListOpt(location){
        let html = `
        <div class="todoList ${this.color}"> 
            <h2>${this.listName}</h2>
            <ul> </ul>
            <p>${this.date}</p>
        </div>`
        location.innerHTML += html
    }

}


let myTodo = new TodoList("Ting å gjøre", "test", "en liste med de tingene jeg trenger å gjøre", "red");

myTodo.showListOpt(tempLocation);
function addList(event){
    let test = new Date().toLocaleString();
    let t = event.target.children;
    let name = t[2].value;
    let description = t[4].value;
    if(!name){
        console.log("name is required!");
    }
    else{
    if(!description){
        description = "no description";
    }
    let testTo  = new TodoList(name, test, description, "red");
    testTo.showListOpt(tempLocation);
    console.log("list is created, witch these values: " + name + " " + test + " " + description);

    }

    
}