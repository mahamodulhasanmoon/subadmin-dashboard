export function formatUtcToLocal(utcTime:any) {
    const options:any = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
  
    const date = new Date(utcTime);
    const localTimeString = date.toLocaleString(undefined, options);
    return localTimeString;
  }

  export const formatDate = (date:any) => {
    let tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num:any) {
            let norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return date.getFullYear() +
        '-' + pad(date.getMonth()+1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        '.' + pad(date.getMilliseconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
 };