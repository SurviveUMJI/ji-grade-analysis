import { observable } from "mobx";
import _ from "lodash";

import { CourseModel, LessonModel, ScoreModel } from "app/models";

import courses from "ji-grade-analysis-data/courses.json";
import lessons from "ji-grade-analysis-data/lessons.json";
import scores from "ji-grade-analysis-data/scores.json";
import { Dictionary } from "lodash";

export class CoursesStore {
  @observable public courses: Array<CourseModel>;
  @observable public coursesMap: Dictionary<CourseModel>;
  @observable public lessonsMap: Dictionary<LessonModel>;
  @observable public scoresMap: Dictionary<ScoreModel>;

  constructor() {
    this.courses = courses;
    this.coursesMap = _.keyBy(courses, "courseCode");
    this.lessonsMap = _.keyBy(lessons, "lessonClassCode");
    this.scoresMap = _.keyBy(scores, "lessonClassCode");
    /*scores.forEach(score => {
      const courseCode = score.courseCode;
      if (this.coursesMap.hasOwnProperty(courseCode)) {
        if (!this.coursesMap[courseCode].hasOwnProperty('sections')) {
          this.coursesMap[courseCode].sections = [];
        }
        this.coursesMap[courseCode].sections.push(score);
        console.log(score, this.coursesMap[courseCode].sections)
      }
    });*/
  }
}
