/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFiltersValues
// ====================================================

export interface GetFiltersValues_processes_steps {
  __typename: "ProcessStep";
  alias: string;
  name: string;
  stepIndex: number;
}

export interface GetFiltersValues_processes {
  __typename: "Process";
  id: number;
  alias: string;
  name: string;
  steps: GetFiltersValues_processes_steps[] | null;
}

export interface GetFiltersValues {
  processes: GetFiltersValues_processes[] | null;
  statuses: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
