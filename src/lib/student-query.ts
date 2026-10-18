import { queryOptions } from '@tanstack/react-query';
import { getStudent } from './student.functions';
export const studentQuery = queryOptions({ queryKey: ['student'], queryFn: () => getStudent(), staleTime: 0 });
