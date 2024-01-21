/* 
a helper function designed to take the database's dateTime and make it look reasonable.
*/

export default function dateTimeFormatter(dateString) {
    const dateObject = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', timeZoneName: 'short' };
    return dateObject.toLocaleDateString('en-US', options);
}