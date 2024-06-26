export type PaginationFilter = {
  page?: string;
  search?: string,
  created_at?: string,
  sexo?: string,
  profile?: string;
};

export type UserVerified = {
  verified: boolean;
  user_id: string;
};

export type FollowUserType = {
  user_id: string;
  follow_user_id: string;
};

export type FilteNotesType = {
  order_by?: string;
  date_schedule?: Date;
  name?: string;
  user_id: string;
} & PaginationFilter;

export type FilterNotesNotificationType = {
  read: boolean | undefined;
  user_id: string;
} & PaginationFilter;

export type CoordinateType = {
  latitude: number;
  longitude: number;
  radius: number;
};
