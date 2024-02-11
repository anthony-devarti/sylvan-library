/* 
a helper function designed to take the database's dateTime and make it look reasonable.
*/

export default function dateTimeFormatter(dateString) {
    const dateObject = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', timeZoneName: 'short' };
    return dateObject.toLocaleDateString('en-US', options);
}

export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
  
    // Add leading zero for single-digit months or days
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    return `${year}-${month}-${day}`;
  }; 


  export const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
  
    // Add leading zero for single-digit months, days, hours, and minutes
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };