import { Keyframe, BallKeyframe, InterpolatedPosition } from '../types';


export const getInterpolatedPosition = (
  keyframes: Keyframe[] | BallKeyframe[],
  currentTime: number
): InterpolatedPosition => {
  if (keyframes.length === 0) return { x: 0, y: 0 };
  if (keyframes.length === 1) return { x: keyframes[0].x, y: keyframes[0].y };

  if (currentTime <= keyframes[0].time) {
    return { x: keyframes[0].x, y: keyframes[0].y };
  }

  if (currentTime >= keyframes[keyframes.length - 1].time) {
    const last = keyframes[keyframes.length - 1];
    return { x: last.x, y: last.y };
  }

  let prevKf = keyframes[0];
  let nextKf = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (keyframes[i].time <= currentTime && keyframes[i + 1].time >= currentTime) {
      prevKf = keyframes[i];
      nextKf = keyframes[i + 1];
      break;
    }
  }

  const timeDiff = nextKf.time - prevKf.time;
  if (timeDiff === 0) return { x: prevKf.x, y: prevKf.y };

  const t = (currentTime - prevKf.time) / timeDiff;

  return {
    x: prevKf.x + (nextKf.x - prevKf.x) * t,
    y: prevKf.y + (nextKf.y - prevKf.y) * t,
  };
};

export const formatTime = (ms: number): string => {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const deciseconds = Math.floor((totalSeconds % 1) * 10);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds}`;
};

export const timeToX = (time: number, duration: number, width: number): number => {
  return (time / duration) * width;
};

export const xToTime = (x: number, duration: number, width: number): number => {
  return (x / width) * duration;
};

export const getPlayerColor = (playerId: number): string => {
  const colors = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#F97316',
    '#84CC16',
    '#6366F1',
  ];
  return colors[playerId % colors.length];
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const generateEmptyTimeline = (playerIds: number[]) => {
  const players: Record<number, { keyframes: Keyframe[]; pathType: string; color: string }> = {};

  playerIds.forEach((id) => {
    players[id] = {
      keyframes: [],
      pathType: 'straight',
      color: getPlayerColor(id),
    };
  });

  return {
    duration: 10000,
    players,
    ball: {
      keyframes: [],
      pathColor: '#FFFFFF',
    },
    events: [],
  };
};
