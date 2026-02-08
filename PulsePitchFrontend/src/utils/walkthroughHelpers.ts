import { Keyframe, BallKeyframe, InterpolatedPosition, PlayerWalkthrough, WalkthroughTimeline, StepConfig } from '../types';


export const getInterpolatedPosition = (
  keyframes: Keyframe[] | BallKeyframe[],
  currentTime: number
): InterpolatedPosition => {
  if (keyframes.length === 0) return { x: 0, y: 0 };

  const first = keyframes[0]!;
  if (keyframes.length === 1) return { x: first.x, y: first.y };

  if (currentTime <= first.time) {
    return { x: first.x, y: first.y };
  }

  const last = keyframes[keyframes.length - 1]!;
  if (currentTime >= last.time) {
    return { x: last.x, y: last.y };
  }

  let prevKf = first;
  let nextKf = last;

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (keyframes[i]!.time <= currentTime && keyframes[i + 1]!.time >= currentTime) {
      prevKf = keyframes[i]!;
      nextKf = keyframes[i + 1]!;
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

export const getStepAndLocalTime = (
  globalTime: number,
  steps: StepConfig[]
): { currentStep: number; localTime: number; stepStartTime: number } => {
  if (steps.length === 0) {
    return { currentStep: 1, localTime: globalTime, stepStartTime: 0 };
  }

  let accumulated = 0;

  for (const step of steps) {
    if (globalTime < accumulated + step.duration) {
      return {
        currentStep: step.stepNumber,
        localTime: globalTime - accumulated,
        stepStartTime: accumulated,
      };
    }
    accumulated += step.duration;
  }

  const lastStep = steps[steps.length - 1]!;
  return {
    currentStep: lastStep.stepNumber,
    localTime: lastStep.duration,
    stepStartTime: accumulated - lastStep.duration,
  };
};

export const getInterpolatedPositionForStep = (
  keyframes: (Keyframe | BallKeyframe)[],
  currentStep: number,
  localTime: number,
  fallbackPosition?: { x: number; y: number }
): InterpolatedPosition => {
  const stepKeyframes = keyframes.filter(kf => (kf.step ?? 1) === currentStep);

  if (stepKeyframes.length === 0) {
    const previousKeyframes = keyframes
      .filter(kf => (kf.step ?? 1) < currentStep)
      .sort((a, b) => (b.step ?? 1) - (a.step ?? 1) || b.time - a.time);

    if (previousKeyframes.length > 0) {
      const last = previousKeyframes[0]!;
      return { x: last.x, y: last.y };
    }

    return fallbackPosition ?? { x: 0, y: 0 };
  }

  return getInterpolatedPosition(stepKeyframes, localTime);
};

export const getStepBoundaries = (
  steps: StepConfig[],
  totalWidth: number
): { step: number; startX: number; endX: number; color: string }[] => {
  if (steps.length === 0) return [];

  const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);
  if (totalDuration === 0) return [];

  const colors = ['#E0F2FE', '#FEF3C7', '#DCFCE7', '#FCE7F3', '#F3E8FF', '#FEE2E2', '#E0E7FF'];

  let accumulatedTime = 0;
  return steps.map((step, idx) => {
    const startX = (accumulatedTime / totalDuration) * totalWidth;
    accumulatedTime += step.duration;
    const endX = (accumulatedTime / totalDuration) * totalWidth;

    return {
      step: step.stepNumber,
      startX,
      endX,
      color: colors[idx % colors.length]!,
    };
  });
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
  return colors[playerId % colors.length] ?? '#3B82F6';
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const generateEmptyTimeline = (playerIds: number[]): WalkthroughTimeline => {
  const players: Record<number, PlayerWalkthrough> = {};

  playerIds.forEach((id) => {
    players[id] = {
      playerId: id,
      keyframes: [],
      pathType: 'straight',
      color: getPlayerColor(id),
    };
  });

  return {
    duration: 10000,
    steps: [{ stepNumber: 1, duration: 10000 }],
    players,
    ball: {
      keyframes: [],
      pathColor: '#FFFFFF',
    },
    events: [],
  };
};
