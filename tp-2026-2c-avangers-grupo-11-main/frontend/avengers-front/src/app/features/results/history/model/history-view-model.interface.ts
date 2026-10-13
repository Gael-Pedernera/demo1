import { PageState } from '../../../../core/models/page-state.interface';
import { HistoryApi } from './history-api.interface';

export interface HistoryViewModel extends PageState {
  data: HistoryApi | null;
  lang: 'es' | 'en';
}
