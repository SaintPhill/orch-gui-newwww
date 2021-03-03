export interface Process {
    id: number
    alias: string
    name: string
}

export interface ProcessSteps {
    id: number
    alias: string
    name: string
    steps: ProcessStep[]
}

export interface StepError {
    id: number
    name: string
    status: string
}

export interface ProcessStep {
    id: number
    name: string
    alias: string
    stepIndex: number
}

export interface MassOperationType {
    name: string
    alias: string
}

