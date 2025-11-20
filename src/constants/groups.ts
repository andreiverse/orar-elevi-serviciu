import { Group } from "@/lib/models";
import config from "../../config.json";

export const groups: Group[] = config.groups;
export const groupOffset: number = config.offset || 0;