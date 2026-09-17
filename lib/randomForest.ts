import { districts } from "./mockData";

type Sample = { features: number[]; target: number };
type Tree = { value: number; feature?: number; threshold?: number; left?: Tree; right?: Tree };

let seed = 20260917;
function random() { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; }

// Synthetic training labels make the algorithm demonstrable without suggesting field validation.
const samples: Sample[] = districts.flatMap((district) =>
  [0, 0.1, 0.2, 0.3].flatMap((ndvi) =>
    [0, 20, 40, 60].flatMap((canopy) =>
      [0, 25, 50, 75].map((roof) => ({
        features: [ndvi, canopy, roof, district.imperviousSurfacePct ?? 50],
        target: Math.min(4, ndvi * 3.8 + canopy * 0.018 + roof * 0.011 + (district.imperviousSurfacePct ?? 50) * 0.002),
      }))
    )
  )
);

function mean(rows: Sample[]) { return rows.reduce((sum, row) => sum + row.target, 0) / rows.length; }
function loss(rows: Sample[], average: number) { return rows.reduce((sum, row) => sum + (row.target - average) ** 2, 0); }

function train(rows: Sample[], depth: number): Tree {
  const value = mean(rows);
  if (depth === 0 || rows.length < 12) return { value };
  const candidates = [0, 1, 2, 3];
  const features = Array.from({ length: 2 }, () => candidates.splice(Math.floor(random() * candidates.length), 1)[0]);
  let best: { feature: number; threshold: number; left: Sample[]; right: Sample[]; score: number } | null = null;
  for (const feature of features) {
    const values = [...new Set(rows.map((row) => row.features[feature]))].sort((a, b) => a - b);
    for (let index = 0; index < values.length - 1; index++) {
      const threshold = (values[index] + values[index + 1]) / 2;
      const left = rows.filter((row) => row.features[feature] <= threshold);
      const right = rows.filter((row) => row.features[feature] > threshold);
      if (left.length < 4 || right.length < 4) continue;
      const score = loss(left, mean(left)) + loss(right, mean(right));
      if (!best || score < best.score) best = { feature, threshold, left, right, score };
    }
  }
  if (!best) return { value };
  return { value, feature: best.feature, threshold: best.threshold, left: train(best.left, depth - 1), right: train(best.right, depth - 1) };
}

const forest: Tree[] = Array.from({ length: 9 }, () => train(Array.from({ length: samples.length }, () => samples[Math.floor(random() * samples.length)]), 5));

function predictTree(tree: Tree, features: number[]): number {
  if (tree.feature === undefined || tree.threshold === undefined || !tree.left || !tree.right) return tree.value;
  return predictTree(features[tree.feature] <= tree.threshold ? tree.left : tree.right, features);
}

export function predictReduction(features: number[]) {
  return forest.reduce((sum, tree) => sum + predictTree(tree, features), 0) / forest.length;
}
