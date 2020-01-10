// import {observable} from 'mobx';

export class ScoreModel {
  readonly courseCode: string;
  readonly lessonClassCode: string;
  readonly scores: number[];
}

export class LessonModel {
  readonly lessonClassCode: string;
  readonly courseCode: string;
  readonly lessonClassName: string;
  readonly termName: string;
  readonly lecturers: string[];
}

export class CourseModel {
  readonly courseCode: string;
  readonly courseName: string;
  readonly courseNameEn: string;
  readonly lessons: Array<string[]>;
  readonly terms: string;
}

export default CourseModel;

