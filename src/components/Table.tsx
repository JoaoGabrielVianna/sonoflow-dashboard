import { useAuth } from '../providers/AuthProvider';
import { formatDate } from '../utils/dateUtils';
import { calculateSleepHours } from '../utils/sleepUtils'; // Importa a função de cálculo de horas dormidas
import { Diary } from '../providers/AuthProvider'; // Certifique-se de importar corretamente o tipo Diary
import { useDate } from '@/providers/DateProvider';
import { Link } from 'react-router-dom';


const renderUserDiaries = (diaries: { [diaryId: string]: Diary } | undefined, date: Date) => {
  if (!diaries || Object.keys(diaries).length === 0) return (
    <>
      <span className="w-1/4 text-center">-- --</span>
      <span className="w-1/4 text-center">-- --</span>
      <span className="w-1/4 text-center">-- --</span>
    </>
  );

  const diaryForDate = Object.values(diaries).find(diary => diary.sleepDate === formatDate(date, 'yyyy-mm-dd'));
  if (!diaryForDate) return (
    <>
      <span className="w-1/4 text-center">-- --</span>
      <span className="w-1/4 text-center">-- --</span>
      <span className="w-1/4 text-center">-- --</span>
    </>
  );

  const sleepHours = calculateSleepHours({ sleepAttemptTime: diaryForDate.sleepAttemptTime, lastWakeUpTime: diaryForDate.lastWakeUpTime });

  return (
    <>
      <span className="w-1/4 text-center">{sleepHours.formattedDifference} horas</span>
      <span className="w-1/4 text-center">{Math.round(sleepHours.totalMinutes / 90)} ciclos</span>
      <span className="w-1/4 text-center flex items-center justify-center"><div className='bg-green-200 rounded-full px-2'>75%</div></span>
    </>
  );
};

const TableComponent = () => {
  const { usersList } = useAuth();
  const {date} = useDate()
  return (
    <div className=" rounded-lg w-full space-y-8">
      <header className="p-4 flex gap-4 sticky top-0 bg-white">
        <h1 className="flex-1 font-bold text-center">Nome</h1>
        <h1 className="w-1/4 font-bold text-center">Horas Dormidas</h1>
        <h1 className="w-1/4 font-bold text-center">Ciclos</h1>
        <h1 className="w-1/4 font-bold text-center">Qualidade do Sono</h1>
      </header>
      <div className="body space-y-16 ">
        {usersList.map((user, index) => (
          <Link to={`/student/${user.uid}`} key={index} className="flex gap-4 py-2 border-b border-gray-200 ">
            <span className="flex-1 truncate">{user.username}</span>
            {renderUserDiaries(user.diaries, date)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
