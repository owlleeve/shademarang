import { INITIAL_WILAYAH } from "./referenceData";

export const districts = INITIAL_WILAYAH;

export function getDistrict(id: string) {
  return districts.find((district) => district.id === id);
}
