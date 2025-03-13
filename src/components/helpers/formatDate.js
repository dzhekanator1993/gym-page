export const formatDate = (date) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return date.toLocaleDateString("uk-UK", options);
}