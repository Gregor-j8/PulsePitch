import { KeyframeDTO, BallKeyframeDTO, PlayerWalkthroughDTO, BallWalkthroughDTO, WalkthroughEventDTO, StepConfigDTO } from './dtos';

export type PathType = "straight" | "curved" | "dashed";
export type PlaybackSpeed = 0.5 | 1 | 2;
export type EditorMode = "position" | "path" | "playback";

export interface Keyframe extends KeyframeDTO {

}

export interface BallKeyframe extends BallKeyframeDTO {
}

export interface PlayerWalkthrough extends PlayerWalkthroughDTO {
  playerId: number;
}

export interface BallWalkthrough extends BallWalkthroughDTO {
}

export interface WalkthroughEvent extends WalkthroughEventDTO {
}

export interface StepConfig extends StepConfigDTO {
}

export interface WalkthroughTimeline {
  duration: number;
  steps: StepConfig[];
  players: Record<number, PlayerWalkthrough>;
  ball: BallWalkthrough;
  events: WalkthroughEvent[];
}

export interface PlaybackState {
  currentTime: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  loop: boolean;
}

export interface EditorState {
  mode: EditorMode;
  selectedPlayerId: number | null;
  selectedKeyframeIndex: number | null;
}

export interface WalkthroughState {
  timeline: WalkthroughTimeline;
  playback: PlaybackState;
  editor: EditorState;
  history: WalkthroughState[];
  historyIndex: number;
}

export interface InterpolatedPosition {
  x: number;
  y: number;
}
