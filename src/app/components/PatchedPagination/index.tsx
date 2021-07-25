// @ts-nocheck

import { TablePagination, TablePaginationProps } from "@material-ui/core";
import React from "react";

export function PatchedPagination(props: TablePaginationProps) {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  // @ts-ignore
  return (
    <TablePagination
      {...tablePaginationProps}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        // @ts-ignore
        return (
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
          />
        );
      }}
    />
  );
}

export default PatchedPagination;
