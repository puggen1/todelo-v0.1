/**
 * @description HTML location of all upcoming lists
 */
let tempLocation = document.querySelector("#lists");
/**
 * @description HTML location of the create new list form
 */
let listCreation = document.querySelector("#createNewList");
let removeBtn = document.querySelector("#removeAll");
removeBtn.addEventListener("click", () => {
  TodoList.clearAllLists();
  TodoList.loadListsFromStorage();
})
/**
 * @description Adds eventlistener to form, thats prevents default action and runs addList() function
 */
listCreation.addEventListener("submit", function (event) {
  event.preventDefault();
  addList(event);
});
/**
 * @description first test of what will be a local storage of all lists created
 */
let allLists = {};

/**
 * @description TodoList is for creating and showing lists, later it will be able to remove and edit lists
 */
class TodoList {
  constructor(listName, date, nonFormatedItems, items, description, color) {
    this.listName = listName;
    this.date = date;
    this.nonFormatedItems = nonFormatedItems;
    this.items = items;
    this.description = description;
    this.color = color;
  }
  /**
   * @description a temp static method to console log out info about a TodoList.
   * @param {Class} list  a class instance of TodoList
   * @example
   * ```js
   * //input a todo class instance.
   * showList(TodoClass);
   * //output to console:
   * `list name, 11.2.33, item1 item2 item3, my list, red`
   * ```
   */
  static showList(list) {
    console.log(
      list.listName,
      list.date,
      list.items,
      list.description,
      list.color
    );
  }
  static formatObjToString(items) {
    let string = "";
    let obj = Object.entries(items);
    let objLength = obj.length;
    for (let i = 0; i < objLength; i++) {
      string += `<li>${items[i]} </li>`;
    }
    console.log(string);
    return string;
  }
  /**
   * @description this method is used to convert html values to content in an object that will later be stored and used.
   * @param {object} location location of list items wanted added by user
   * @returns a object with all true values
   * @example
   * ```js
   * //give the location of the html content
   * addHtmlToArray(targetDiv);
   * //array / object / set will be added with the values that are not false.
   * ```
   */
  static addHtmlToArray(location) {
    let allContent = {};
    let x = 0;
    for (let i = 0; i < location.length; i++) {
      if (location[i].value) {
        console.log(location[i].value);
        allContent[`${x}`] = location[i].value;
        x++;
      }
    }
    return allContent;
  }
  /**
   * @description this method takes the class variables and feeds them into an html target.
   * @param {object} location the wanted target where a list will be showed
   * @example
   * ```js
   * //when a Todolist should be displayed use
   * myTodo.showListOpt(myHtmlLocation);
   * //expected outcome: a todoList in your html document
   * <div class="todoList red">
   *    <h2> my TodoList </h2>
   *    <ul>
   *        <li> list item one </li>
   *        <li> list item two </li>
   *        <li> list item three </li>
   *    </ul>
   *    <p> 12.09.2022</p>
   * </div>
   * ```
   */
  showListOpt(location) {
    let html = `
        <div class="todoList"> 
            <h2>${this.listName}</h2>
            <ul class=" ${this.color}"> ${this.items} </ul>
            <p>${this.date}</p>
        </div>`;
    location.innerHTML += html;
  }
  /********************************************************************************************** */

  //get storage
  static getStorage(targetedList) {
    if (this.checkStorage(targetedList)) {
      let listFromStorage = JSON.parse(localStorage.getItem(targetedList));
      return listFromStorage;
    }
  }
  // check storage
  static checkStorage(target) {
    if (localStorage.getItem(target)) {
      return true;
    }
  }
  //add to storage
  addToStorage() {
    let storage = TodoList.getStorage("lists");
    console.log(storage);
    storage[`${this.listName}`] = {
      name: this.listName,
      date: this.date,
      nonFormatedItems: this.nonFormatedItems,
      formatedItems: this.items,
      description: this.description,
      color: this.color,
    };
    console.log(storage);
    localStorage.setItem("lists", JSON.stringify(storage));
    //trenger å få navnet på listen.... done?
  }
  static createStorage() {
    let allLists = {};
    let stringedAllLists = JSON.stringify(allLists);
    localStorage.setItem("lists", stringedAllLists);
  }
  static loadListsFromStorage() {
    let storage = TodoList.getStorage("lists");
    if(storage){
      let arrayofStorage = Object.entries(storage);
      console.log(arrayofStorage);
      arrayofStorage.forEach((item) => {
        console.log(item);
        let todoList = new TodoList(
          item[1]["name"],
          item[1]["date"],
          item[1]["nonFormatedItems"],
          item[1]["formatedItems"],
          item[1]["description"],
          item[1]["color"]
        );
        todoList.showListOpt(tempLocation);
      })
    }
    else{
      tempLocation.innerHTML = "";
    }
  }
  static clearAllLists(){
    //removes all lists
    localStorage.setItem("lists", "");
  }
  clearList(){
    let lists = Todo.getStorage("lists");
    console.log(lists);
  }
  static onLoad(){
    if(!TodoList.checkStorage("lists")){
      TodoList.createStorage();
    }
    else{
      TodoList.loadListsFromStorage();
    }

  }

  //listOne: { name: "bendik", desc: "something", time: "this" },
}
function addList(event) {
  //let fullDate = new Date().toLocaleString();
  let dateCreated = new Date().toDateString();
  console.log(dateCreated)
  //temp removed hour and minutes
  //let hourCreated = new Date().getHours();
  //let minuteCreated = new Date().getMinutes();
  //, at ${hourCreated}:${minuteCreated}
  let dateString = `created on ${dateCreated.slice(4,)}.`;
  let t = event.target.children;
  //path to list items
  let allListItems = t.listItems.children;
  //adds html content to map
  let createdListItems = TodoList.addHtmlToArray(allListItems);
  //creates a formated list from the map
  let formatedItems = TodoList.formatObjToString(createdListItems);
  //console.log(t.listItems.children);

  //console.log(t.name);
  let name = t.name.value;
  let description = t.desc.value;
  if (!name) {
    console.log("name is required!");
  } else {
    if (!description) {
      description = "no description";
    }

    //creation of the list
    let testTo = new TodoList(
      name,
      dateString,
      createdListItems,
      formatedItems,
      description,
      "red"
    );
    testTo.showListOpt(tempLocation);
    if (!TodoList.getStorage("lists")) {
      TodoList.createStorage();
      console.log("ingen lists finnes, lager.....");
    }
    testTo.addToStorage();
  }
}

document.addEventListener(`DOMContentLoaded`, TodoList.onLoad);
