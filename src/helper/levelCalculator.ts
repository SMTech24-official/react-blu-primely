export const LevelCalculate = (
  exp: number,
  level: number,
  nextLevel?: number
): number => {
  // If no nextLevel (e.g. highest rank), assume 100% progress
  if (!nextLevel) return 100;

  // If exp is below current level, progress is 0%
  if (exp < level) return 0;

  // If exp is above or equal to nextLevel, progress is 100%
  if (exp >= nextLevel) return 100;

  const totalRange = nextLevel - level;
  const progress = exp - level;

  const percentage = (progress / totalRange) * 100;

  return parseFloat(percentage.toFixed(2));
};
