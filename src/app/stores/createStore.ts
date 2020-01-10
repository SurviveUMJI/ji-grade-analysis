import {History} from 'history';
import {TodoModel} from 'app/models';
import {TodoStore} from './TodoStore';
import {RouterStore} from './RouterStore';
import {CoursesStore} from 'app/stores/CoursesStore';
import {STORE_TODO, STORE_ROUTER, STORE_COURSES} from 'app/constants';

export function createStores(history: History, defaultTodos?: TodoModel[]) {
  const todoStore = new TodoStore(defaultTodos);
  const routerStore = new RouterStore(history);
  const coursesStore = new CoursesStore();
  return {
    [STORE_TODO]: todoStore,
    [STORE_ROUTER]: routerStore,
    [STORE_COURSES]: coursesStore,
  };
}
