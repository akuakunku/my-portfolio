// utils/formatDate.js
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('id-ID', options); // 'id-ID' for Indonesian locale
    return formatter.format(date);
  };
  