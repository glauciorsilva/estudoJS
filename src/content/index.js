import day01 from './days/day01.js';
import day02 from './days/day02.js';
import day03 from './days/day03.js';
import day04 from './days/day04.js';
import day05 from './days/day05.js';
import day06 from './days/day06.js';
import day07 from './days/day07.js';
import day08 from './days/day08.js';
import day09 from './days/day09.js';
import day10 from './days/day10.js';
import day11 from './days/day11.js';
import day12 from './days/day12.js';
import day13 from './days/day13.js';
import day14 from './days/day14.js';
import day15 from './days/day15.js';

export const DAYS = [day01, day02, day03, day04, day05, day06, day07, day08, day09, day10, day11, day12, day13, day14, day15];

export const EXERCISES = DAYS.flatMap((d) => d.exercises.map((e) => ({ ...e, day: d.day })));

const byId = new Map(EXERCISES.map((e) => [e.id, e]));

export const getDay = (n) => DAYS.find((d) => d.day === Number(n)) || null;
export const getExercise = (id) => byId.get(id) || null;

export function nextExercise(id) {
  const i = EXERCISES.findIndex((e) => e.id === id);
  return i >= 0 && i < EXERCISES.length - 1 ? EXERCISES[i + 1] : null;
}
