import { Scheduling } from '../domain/entitie/Scheduling';

export interface ISchedulingPortRepository {
  create(scheduling: Scheduling): Promise<Scheduling>;
}
