import axios from 'axios';
import { Process, ProcessSteps, StepError } from '../types/filtersOptionsTypes';

export const API = {
    'BASE_URL': 'http://192.168.102.43:8081',
};

export async function loadConfig(): Promise<any> {
    const { data } = await axios.get('/config.json');
    if (data.BASE_URL) {
        API.BASE_URL = data.BASE_URL;
    }
}

const orchRest = 'orch/rest';

export const filtersOptionsAPI = {
    getProcesses: () => axios.get<Process[]>(`${API.BASE_URL}/${orchRest}/processes`),
    getStatuses: () => axios.get<string[]>(`${API.BASE_URL}/${orchRest}/statuses`),
    getStepsByProcess: (process: string) => axios.get<ProcessSteps>(`${API.BASE_URL}/${orchRest}/process/${process}`),
    getStepsErrors: () => axios.get<StepError[]>(`${API.BASE_URL}/${orchRest}/errors`),
};

