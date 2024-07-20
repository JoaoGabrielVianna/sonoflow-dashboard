export const formatDate = (date: Date, formatType: 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'longDate'): string => {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  switch (formatType) {
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    case 'longDate':
      return `${day} de ${monthNames[date.getUTCMonth()]} de ${year}`;
    default:
      return `Formato de data não suportado: ${formatType}`;
  }

};