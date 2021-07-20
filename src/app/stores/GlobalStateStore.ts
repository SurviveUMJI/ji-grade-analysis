import { observable, computed, action } from 'mobx';
import {Dictionary} from 'lodash';

export class GlobalStateStore {

  @observable public courseListSearchText: string
  @observable public courseSearchText: Dictionary<string>

  constructor() {
    this.courseListSearchText = "";
    this.courseSearchText = {};
  }

  @action
  setCourseListSearchText = (searchText: string): void => {
    this.courseListSearchText = searchText
  };

  @action
  setCourseSearchText = (course: string, searchText: string): void => {
    this.courseSearchText[course] = searchText
  };

}
