import { TodayGroupInfo, DateGroup } from '@/lib/models'
import { createServerFn } from '@tanstack/react-start'
import { getSchoolDayAndIndex } from '@/constants/school-days'
import { groups, groupOffset } from '@/constants/groups'

export const getCurrentGroup = createServerFn({
  method: 'GET',
}).handler(async (): Promise<TodayGroupInfo> => {
  const today = new Date();

  const getGroupForDate = (date: Date): DateGroup => {
    const result = getSchoolDayAndIndex(date);
    if (result) {
      const [_, index] = result;
      const group = groups[(index + groupOffset) % groups.length];
      return { date: new Date(date), group };
    }
    return { date: new Date(date), group: null };
  };

  const currentGroup = getGroupForDate(today);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const previousGroup = getGroupForDate(yesterday);

  const nextGroups: DateGroup[] = [];
  for (let i = 1; i <= 5; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + i);
    nextGroups.push(getGroupForDate(nextDate));
  }

  return {
    previousGroup,
    currentGroup,
    nextGroups
  }
})
