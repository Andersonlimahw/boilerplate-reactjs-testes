import { useQuery } from '@tanstack/react-query';

import { useStoreHook } from '../../store/hooks/use-store';
import { SWApiPeopleService } from '../../services/swapi/people';
import { PeopleModel } from '../../models';

interface UsePeopleQueryOptions {
  queryKey?: string | readonly unknown[];
}

const service = new SWApiPeopleService();

export const usePeopleQuery = (options?: UsePeopleQueryOptions) => {
  const store = useStoreHook((state: any) => state);
  const { dispatch, theme } = store;

  const queryKey = Array.isArray(options?.queryKey)
    ? options?.queryKey
    : [options?.queryKey ?? 'people'];

  async function fetchPeople(): Promise<PeopleModel[] | undefined> {
    return await service
      .getPeople()
      .then((data: PeopleModel[]) => data as PeopleModel[])
      .catch((error) => {
        console.error('usePeopleQuery fetch error:', error);
      });
  }

  const peopleQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await fetchPeople();
      console.log('React query sample:', data);
      return data;
    },
  });

  return {
    peopleQuery,
    theme,
    dispatch,
  };
};

export type UsePeopleQueryReturn = ReturnType<typeof usePeopleQuery>;
