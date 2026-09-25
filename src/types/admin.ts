// src/types/admin.ts

import type { PollPublicView } from './poll';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  success: true;
  accessToken: string;
  user: AdminUser;
}

export interface AdminPoll extends PollPublicView {
  /** derived client-side */
}