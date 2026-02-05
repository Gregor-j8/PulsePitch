export interface UserProfileDTO {
  id: number;
  identityUserId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  roles: string[];
  teams?: string[];
}

export interface TeamDTO {
  id: number;
  name: string;
  joinCode: string;
  managerNames?: string[];
  coachNames?: string[];
  isPublic: boolean;
  requiresApproval: boolean;
}

export interface JoinTeamDTO {
  joinCode: string;
  teamName: string;
  playerId: number;
}

export interface EditTeamDTO {
  name?: string;
  joinCode?: string;
  isPublic?: boolean;
  requiresApproval?: boolean;
}

export interface TeamGameDTO {
  id: number;
  onCalendar: boolean;
  start: string;
  end: string;
  awayTeamId?: number;
  awayTeam?: TeamDTO;
  homeTeamId: number;
  homeTeam?: TeamDTO;
  result?: string;
}

export interface EventsDTO {
  id: number;
  name: string;
}

export interface TeamEventDTO {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  teamId: number;
  team?: TeamDTO;
  eventId: number;
  event?: EventsDTO;
}

export interface PlayersInFormationDTO {
  id: number;
  positionId: number;
  name: string;
  role?: string;
  color: string;
  x: number;
  y: number;
  note?: string;
}

export interface FormationsDTO {
  name: string;
  id: number;
  description: string;
  template?: string;
  teamId: number;
  team?: TeamDTO;
  players: PlayersInFormationDTO[];
}

export interface EditFormationsDTO {
  name?: string;
  description?: string;
  template?: string;
  teamId?: number;
}

export interface ChatRoomDTO {
  id: number;
  userOneId: number;
  userOne?: UserProfileDTO;
  userTwoId: number;
  userTwo?: UserProfileDTO;
}

export interface MessageDTO {
  id: number;
  chatRoomId: number;
  senderId: number;
  sender?: UserProfileDTO;
  receiverId: number;
  receiver?: UserProfileDTO;
  content: string;
  sentAt: string;
  chatRoom?: ChatRoomDTO;
  isMatchRequest: boolean;
  matchRequestData?: MatchRequestDTO;
}

export interface EditMessageDTO {
  content?: string;
}

export interface MatchRequestDTO {
  id: number;
  proposedDate: string;
  message: string;
  homeTeamId: number;
  homeTeam?: TeamDTO;
  senderId: number;
  awayTeamId: number;
  awayTeam?: TeamDTO;
  recieverId: number;
  status: string;
}

export interface CreateMatchRequestDTO {
  proposedDate: string;
  message: string;
  homeTeamId: number;
  senderId: number;
  awayTeamId: number;
  recieverId: string;
  status: string;
}

export interface MatchResponseDTO {
  status: string;
}

export interface PlayerTeamDTO {
  id: number;
  playerId: number;
  player?: UserProfileDTO;
  teamId: number;
  team?: TeamDTO;
  role: string;
  status?: string;
  requestedAt?: string;
  respondedAt?: string;
}

export interface GetTeamsByPlayerIdDTO {
  id: number;
  playerId: number;
  teamId: number;
  team?: TeamDTO;
}

export interface PublicTeamSearchDTO {
  id: number;
  name: string;
  managerNames: string[];
  coachNames: string[];
  requiresApproval: boolean;
  memberCount: number;
}

export interface JoinRequestDTO {
  teamId: number;
  playerId: number;
  joinCode?: string;
}

export interface JoinRequestResponseDTO {
  status: string;
}

export interface PendingJoinRequestDTO {
  id: number;
  playerId: number;
  player?: UserProfileDTO;
  teamId: number;
  status?: string;
  requestedAt?: string;
}

export interface TeamStaffDTO {
  managers: UserProfileDTO[];
  coaches: UserProfileDTO[];
  players: UserProfileDTO[];
}

export interface AddTeamMemberDTO {
  userProfileId: number;
  role: string;
}

export interface UpdateTeamMemberRoleDTO {
  newRole: string;
}

export interface UpdateUserRolesDTO {
  roles: string[];
}

export interface AnalyticsDTO {
  totalUsers: number;
  totalTeams: number;
  usersByRole: { [key: string]: number };
  publicTeams: number;
  privateTeams: number;
  activeUsersLast7Days: number;
}

export interface KeyframeDTO {
  time: number;
  x: number;
  y: number;
  action?: string;
}

export interface BallKeyframeDTO {
  time: number;
  x: number;
  y: number;
  action?: string;
  holderId?: number;
}

export interface PlayerWalkthroughDTO {
  keyframes: KeyframeDTO[];
  pathType: string;
  color?: string;
}

export interface BallWalkthroughDTO {
  keyframes: BallKeyframeDTO[];
  pathColor: string;
}

export interface WalkthroughEventDTO {
  time: number;
  type: string;
  description: string;
}

export interface WalkthroughTimelineDTO {
  duration: number;
  players: Record<number, PlayerWalkthroughDTO>;
  ball: BallWalkthroughDTO;
  events: WalkthroughEventDTO[];
}

export interface WalkthroughPlannerDTO {
  id: number;
  formationId: number;
  duration: number;
  name: string;
  description?: string;
  timeline: WalkthroughTimelineDTO;
  createdAt: string;
  updatedAt: string;
}
