// Formats date to a "[Month] [Day], [Year] at [Time]" format
export const formatDate = (inputDate) => {
if (inputDate === null) {
    return null;
}
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: undefined,
    };

    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

    return formattedDate;
};