import { FlexibleSearch, StepDuration } from '../StoreSlices/selectedFilters';

export interface FindRequestResult {
    offset: number
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
    content: Request[]
}

export interface Request {
    id: number
    system_alias: string
    external_id: string
    register_date: number
    process_alias: string
    status: string
    error_description: string
    step_error: number
    step_alias: string
}


export interface RequestsParams {
    process: string | null
    statuses: string[]
    step_aliases: string[]
    step_execution: Period | null
    period: Period | null
    step_duration: StepDuration | null
    step_error_code: number[]
    step_status: string[]
    request_id: number | null
    offset: number
    limit: number
    parameter: FlexibleSearch | null
    smart_card_id: string
    sap_id: string
}

interface Period {
    from: number
    to: number
}

export interface RequestById {
    id: number
    system_alias: string
    external_id: string
    register_date: number
    status: string
    process_alias: string
    executions?: Execution[]
    parameters?: RequestParameter[]
}

export interface Execution {
    id: number
    execution_date: number
    step_alias: string
    step_name: string
    step_index: number
    duration: number
    status: string
    error_code: number
    error_description: string
    children?: RequestById[]
}


export interface RequestParameter{
    id: number
    name: string
    type: string
    value: string
}

export interface MassOperationLaunch {
    status: number
    mass_id: string
}

export interface GetMassOperationsList {
    page_number: number
    total_elements: number
    content: MassOperation[]
}

export interface MassOperation {
    mass_id: number
    type: 'ChangeStatus' | 'ChangeStep'
    dt_create: number
    dt_finish: number | null
    complete: boolean
    owner: string | null
}

export interface MassOperationTask {
    task_id: number
    object_id: number
    create_date: number
    start_date: number
    finish_date: number
    complete: true
    error_text: string
    request_status: {
        request_id: number
        register_date: number
        status: string
        process_alias: string
        process_name: string
        step_id: number
        step_name: string
        error_code: number
        error_message: string
    }
}

export interface MassOperationDetalization {
    status: number
    error: string
    type: string
    job: {
        mass_id: number
        type: string
        complete: true
        start_date: number
        finish_date: number
        tasks: MassOperationTask[]
    }
}

export interface GetMassOperationsListParams {
    page_number: number
    max_page_size: number
    reverse_order: boolean
    mass_id: number | null
    mass_type: string | null
    owner: string | null
    object_id: number | null
}
