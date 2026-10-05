import 'server-only';
import { jsonRepositories } from './json';
import type { Repositories } from './types';

/**
 * The single place that decides where content is stored. To move to a REST
 * API or database, implement `Repositories` and return it here.
 */
export const repositories: Repositories = jsonRepositories;

export type { Repositories } from './types';
