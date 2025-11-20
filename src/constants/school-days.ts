import config from "../../config.json";

const SCHOOL_YEAR_START = new Date(config.schoolYear.start);
const SCHOOL_YEAR_END = new Date(config.schoolYear.end);

const SCHOOL_HOLIDAYS = config.holidays.map(h => ({
    start: new Date(h.start),
    end: new Date(h.end)
}));

const generateSchoolDays = () => {
    const school_days: Date[] = [];

    const currentDate = new Date(SCHOOL_YEAR_START);

    while (currentDate <= SCHOOL_YEAR_END) {
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday

        const isHoliday = SCHOOL_HOLIDAYS.some(holiday =>
            currentDate >= holiday.start && currentDate <= holiday.end
        );

        if (!isWeekend && !isHoliday) {
            school_days.push(new Date(currentDate));
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return school_days;
}

const SCHOOL_DAYS = generateSchoolDays();

const getSchoolDayAndIndex = (date: Date): [Date, number] | null => {
    const index = SCHOOL_DAYS.findIndex(day => day.getMonth() === date.getMonth() && day.getDate() === date.getDate());
    return index !== -1 ? [SCHOOL_DAYS[index], index] : null;
}

export { SCHOOL_DAYS, getSchoolDayAndIndex };