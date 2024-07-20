export interface SleepHours {
  formattedDifference: string;
  totalMinutes: number;
}

export const calculateSleepHours = ({ lastWakeUpTime, sleepAttemptTime }: { sleepAttemptTime: string; lastWakeUpTime: string }): SleepHours => {
  // Extrai as horas e minutos dos horários de despertar
  const [lastWakeUpHours, lastWakeUpMinutes] = lastWakeUpTime.split(':').map(Number);
  const [sleepAttemptHours, sleepAttemptMinutes] = sleepAttemptTime.split(':').map(Number);

  // Calcula o tempo total em minutos
  const lastWakeUpTotalMinutes = lastWakeUpHours * 60 + lastWakeUpMinutes;
  const sleepAttemptTotalMinutes = sleepAttemptHours * 60 + sleepAttemptMinutes;

  // Calcula a diferença total em minutos
  let differenceInMinutes = lastWakeUpTotalMinutes - sleepAttemptTotalMinutes;

  // Se a diferença for negativa, adiciona 24 horas em minutos
  if (differenceInMinutes < 0) {
    differenceInMinutes += 24 * 60;
  }

  // Formata a diferença para o formato desejado (horas e minutos)
  const differenceHours = Math.floor(differenceInMinutes / 60);
  const differenceMinutes = differenceInMinutes % 60;
  const formattedDifference = `${differenceHours.toFixed(0).padStart(2, '0')}:${differenceMinutes.toFixed(0).padStart(2, '0')}`;

  return {
    formattedDifference,
    totalMinutes: differenceInMinutes,
  };
};
