import axiosInstance from '../lib/axios';
import ResponseModel, { CodeResponseEnum } from '../models/ResponseModel';

interface FluigPayloadInterface {
    targetState?: number,
    targetAssignee: string,
    subProcessTargetState?: number,
    comment?: string,
    formFields?: Object
  }

class FluigService {
    constructor() {}

    async startProcess(nomeLivro?: string): Promise<number> {
        try {
            const endpoint = '/process-management/api/v2/processes/tst_paralelo/start';

            const payload: FluigPayloadInterface = {
                targetAssignee: 'victor.candido',
                comment: nomeLivro ? `Livro para empréstimo: ${nomeLivro}` : 'Iniciado pelo backend em NodeJS.',
            };

            const data = JSON.stringify(payload);

            const response = await axiosInstance.post(endpoint, data);

            if (response.status === CodeResponseEnum.OK) {
                const { processInstanceId } = response.data;
                return processInstanceId;
            }

            throw new ResponseModel(true, CodeResponseEnum.BAD_REQUEST, 'Falha ao iniciar solicitação no Fluig', response);
        } catch (error) {
            console.log('[ERROR] - startProcess - FluigService - Falha ao iniciar solicitação do Fluig', error);
            throw error;
        }
    }

}

export default FluigService;