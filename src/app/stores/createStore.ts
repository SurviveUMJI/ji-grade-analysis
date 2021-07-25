import { History } from "history";
import { TodoModel } from "app/models";
import { TodoStore } from "./TodoStore";
import { RouterStore } from "./RouterStore";
import { CoursesStore } from "./CoursesStore";
import { GlobalStateStore } from "./GlobalStateStore";

import {
  STORE_TODO,
  STORE_ROUTER,
  STORE_COURSES,
  STORE_GLOBAL_STATE,
} from "app/constants";

export function createStores(history: History, defaultTodos?: TodoModel[]) {
  const todoStore = new TodoStore(defaultTodos);
  const routerStore = new RouterStore(history);
  const coursesStore = new CoursesStore();
  const globalStateStore = new GlobalStateStore();
  return {
    [STORE_TODO]: todoStore,
    [STORE_ROUTER]: routerStore,
    [STORE_COURSES]: coursesStore,
    [STORE_GLOBAL_STATE]: globalStateStore,
  };
}
