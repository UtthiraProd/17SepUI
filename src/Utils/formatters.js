
export function formatToTwoDigits(number) {

// if(number == null || number== undefined || number==''|| number =='null' )
//   return ''
// else
  return  number?.toString().padStart(2, '0');
}

export function formatDateDayMonthYear(dateTime) {

  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;

}

export function returnEmptyIfNull(data) {

  if (data == null || data == undefined)
    return ''
  else
    return data
}
