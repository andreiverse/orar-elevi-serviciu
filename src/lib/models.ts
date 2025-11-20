export type Group = string;
export type DateGroup = { date: Date, group: Group | null };

export type TodayGroupInfo = {
    previousGroup: DateGroup,
    currentGroup: DateGroup,
    nextGroups: DateGroup[]
}