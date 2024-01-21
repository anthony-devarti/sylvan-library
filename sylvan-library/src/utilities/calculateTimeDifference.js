export default function calculateTimeDifference(dateString) {
    const currentDate = new Date();
    const providedDate = new Date(dateString);
  
    const timeDifference = providedDate.getTime() - currentDate.getTime();
    const seconds = Math.abs(Math.floor(timeDifference / 1000));
    const minutes = Math.abs(Math.floor(seconds / 60));
    const hours = Math.abs(Math.floor(minutes / 60));
    const days = Math.abs(Math.floor(hours / 24));
  
    if (timeDifference < 0) {
      return 'This reservation is overdue.';
    } else if (timeDifference === 0) {
      return 'Today';
    } else {
      return `In ${days} day${days !== 1 ? 's' : ''}`;
    }
  }