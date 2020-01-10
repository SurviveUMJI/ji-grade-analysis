import { Dictionary } from "lodash";

export enum ReportStep {
  MAIN,
  INTRODUCTION,
  DATA_SHEET,
}

export const REPORT_STEP_TYPES = [
  ReportStep.MAIN,
  ReportStep.INTRODUCTION,
  ReportStep.DATA_SHEET
];

export const REPORT_STEP_LABELS: Dictionary<string> = {
  [ReportStep.MAIN]: 'Select a Lab',
  [ReportStep.INTRODUCTION]: 'Introduction',
  [ReportStep.DATA_SHEET]: 'Data Sheet'
};

export const REPORT_STEP_URL: Dictionary<string> = {
  [ReportStep.MAIN]: '/',
  [ReportStep.INTRODUCTION]: '/introduction',
  [ReportStep.DATA_SHEET]: '/data_sheet'
};
