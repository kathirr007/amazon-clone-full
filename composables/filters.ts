import { format, parseISO } from "date-fns";

export const useVueFilters = () => {
  const shortenText = (text:string, maxLength = 300) => {
    // debugger
    if (text) {
      const finalChar = text.length > maxLength ? "..." : "";
      return text.substr(0, maxLength) + finalChar;
    }

    return "";
  };

  const capitalize = (str:string) => {
    // debugger
    return str.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()));
  };

  /* const formatDate2 = (date, dateFormat = "LLL") => {
    // debugger
    if (!date) return "";
    return moment(date).format(dateFormat);
  }; */

  // replaced moment with dat-fns
  const formatDate = (date : any, dateFormat = "LLLL dd, yyyy hh:mm aa") => {
    // debugger
    if (!date) return "";
    return format(parseISO(date), dateFormat);
  };

  return {
    shortenText,
    capitalize,
    formatDate
  }

}
