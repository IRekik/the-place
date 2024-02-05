// Formats date to a "[Month] [Day], [Year] at [Time]" format
export const formatDate = (inputDate: Date | string | null): string | null => {
    if (inputDate === null) {
        return null;
    }

    const dateObj = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: undefined,
    };

    const formattedDate: string = dateObj.toLocaleDateString('en-US', options);

    return formattedDate;
};