import { apiRoutes } from '@/config';
import { api } from '@/lib/api/api';
import { UserDTO } from '@/types/dto/user';

export const getUserInfoService = async (): Promise<UserDTO> => {
  const result = await api.get<UserDTO>(apiRoutes.user.getUserInfo);

  return result.data;
};
