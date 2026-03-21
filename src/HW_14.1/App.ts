import {AdvancedTodoList} from "./AdvancedTodoList.js";
import {ConfirmEditTodoItem, DefaultTodoItem} from "./TypeNotes.js";

const todoList = new AdvancedTodoList();

const task1 = new DefaultTodoItem("Buy milk", "In the shop");
const task2 = new ConfirmEditTodoItem("Call a friend", "Clarify meeting details");

todoList.add(task1);
todoList.add(task2);

task1.markCompleted();
task2.edit("Call a friend", "In the evening after work");

console.log("All tasks:", todoList.getAll());
console.log("Statistics:", todoList.getStats());
console.log("Search for 'milk':", todoList.search("milk"));
console.log("Sort by status:", todoList.sortBy("status"));