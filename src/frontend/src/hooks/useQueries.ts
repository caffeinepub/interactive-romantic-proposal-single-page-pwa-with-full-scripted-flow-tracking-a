import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import type { ActivityEvent } from '../backend';

export function useGetAllActivities() {
  const { actor, isFetching } = useActor();

  return useQuery<ActivityEvent[]>({
    queryKey: ['allActivities'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllActivities();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserActivities(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ActivityEvent[]>({
    queryKey: ['userActivities', userId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserActivities(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useClearAllActivities() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // Note: Backend doesn't have a clearAllActivities method yet
      // This is a placeholder for future implementation
      throw new Error('Clear activities not yet implemented in backend');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allActivities'] });
      queryClient.invalidateQueries({ queryKey: ['userActivities'] });
    },
  });
}
