export interface UserProfileDTO {
  id: number;
  identityUserId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  roles: string[];
}

export interface TeamDTO {
  id: number;
  name: string;
  joinCode: string;
  coachId?: string;
}

export interface JoinTeamDTO {
  joinCode: string;
  teamName: string;
  playerId: number;
}

export interface EditTeamDTO {
  name?: string;
  joinCode?: string;
  coachId?: string;
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
  teamId: number;
  team?: TeamDTO;
  players: PlayersInFormationDTO[];
}

export interface EditFormationsDTO {
  name?: string;
  description?: string;
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
}

export interface GetTeamsByPlayerIdDTO {
  id: number;
  playerId: number;
  teamId: number;
  team?: TeamDTO;
}
