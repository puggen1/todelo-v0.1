/**
 * @description HTML location of all upcoming lists
 */
let tempLocation = document.querySelector("#lists");
/**
 * @description HTML location of the create new list form
 */
let listCreation = document.querySelector("#createNewList");
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
  constructor(listName, date, items, description, color) {
    this.listName = listName;
    this.date = date;
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
  static formatMapToString(map) {
    let string = "";
    for (let i = 1; i <= map.size; i++) {
      string += `<li>${map.get(i)}</li>`;
    }
    return string;
  }
  /**
   * @description this method is used to convert html values to content in an Map that will later be stored and used.
   * @param {object} location location of list items wanted added by user
   * @returns a Map with all true values
   * @example
   * ```js
   * //give the location of the html content
   * addHtmlToArray(targetDiv);
   * //array / map / set will be added with the values that are not false.
   * ```
   */
  static addHtmlToArray(location) {
    let allContent = new Map();
    let x = 1;
    for (let i = 0; i < location.length; i++) {
      if (location[i].value) {
        console.log(location[i].value);
        allContent.set(x, location[i].value);
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
        <div class="todoList ${this.color}"> 
            <h2>${this.listName}</h2>
            <ul> ${this.items} </ul>
            <p>${this.date}</p>
        </div>`;
    location.innerHTML += html;
  }
  /********************************************************************************************** */
  addToStorage() {
    let allLists = [];
    //test
    if (localStorage.getItem("lists")) {
      //skaff liste her osv
      allLists = JSON.parse(localStorage.getItem("lists"));
      console.log(allLists);
    } else {
      allLists = {
        listOne: {
          name: this.listName,
          desc: this.description,
          date: this.date,
          listItems: this.items,
          color: "red",
        },
      };
    }
    localStorage.setItem("lists", JSON.stringify(allLists));
  }
}
function addList(event) {
  //let fullDate = new Date().toLocaleString();
  let dateCreated = new Date().toDateString();
  let hourCreated = new Date().getHours();
  let minuteCreated = new Date().getMinutes();
  let dateString = `created on ${dateCreated}, at ${hourCreated}:${minuteCreated}`;
  let t = event.target.children;
  //path to list items
  let allListItems = t.listItems.children;
  //adds html content to map
  let createdListItems = TodoList.addHtmlToArray(allListItems);
  //creates a formated list from the map
  let formatedItems = TodoList.formatMapToString(createdListItems);
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
    let testTo = new TodoList(
      name,
      dateString,
      formatedItems,
      description,
      "red"
    );
    testTo.showListOpt(tempLocation);
    console.log(
      "list is created, with these values: " +
        name +
        " " +
        dateString +
        " " +
        formatedItems +
        " " +
        description
    );
  }
}
