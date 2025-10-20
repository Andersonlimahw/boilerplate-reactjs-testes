import { usePeopleQuery } from '../../../commons/hooks/use-people-query';

export const useGroupsPage = () => {
  return usePeopleQuery({ queryKey: 'groups' });
};
