import { INITIAL_ARTICLES, INITIAL_WILAYAH } from "@/app/kms/source/data/mockData";

export const districts = INITIAL_WILAYAH;
export const initialArticles = INITIAL_ARTICLES;

export const bmkgStations = [
  { id: "bmkg-ahmad-yani", name: "Stasiun Meteorologi Ahmad Yani", district: "Semarang Barat" },
  { id: "bmkg-tanjung-emas", name: "Stasiun Meteorologi Maritim Tanjung Emas", district: "Semarang Utara" },
];

export function getDistrict(id: string) {
  return districts.find((district) => district.id === id);
}
