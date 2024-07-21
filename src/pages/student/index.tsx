import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth, Diary, User } from "@/providers/AuthProvider";
import { formatDate } from "@/utils/dateUtils";

interface Column {
  headerName: string;
  width?: number; // Adiciona opcionalmente para a largura
}

type ColumnType = {
  [key: string]: Column;
}

const columns: ColumnType = {
  sleepDate: { headerName: 'Data de Sono' },
  bedtime: { headerName: 'Hora de Dormir' },
  wakeUpTime: { headerName: 'Hora de Acordar' },
  lastWakeUpTime: { headerName: 'Última Hora de Acordar' },
  timeToFallAsleep: { headerName: 'Tempo para Dormir' },
  timeToFallAsleepAgain: { headerName: 'Tempo para Dormir Novamente' },
  medicationUsageYesterday: { headerName: 'Uso de Medicamento Ontem' },
  anxietyComparisonToday: { headerName: 'Comparação de Ansiedade Hoje' },
  stressComparisonToday: { headerName: 'Comparação de Estresse Hoje' },
  fatigueReduction: { headerName: 'Redução da Fadiga (%)' },
  morningFeeling: { headerName: 'Sentimento Matinal' },
  nightAwakenings: { headerName: 'Acordar à Noite' },
  additionalComments: { headerName: 'Comentários Adicionais' },
  negativeFactorsToday: { headerName: 'Fatores Negativos Hoje' },
  positiveFactorsToday: { headerName: 'Fatores Positivos Hoje' },
  sleepAttemptTime: { headerName: 'Hora de Tentativa de Sono' },
  sleepFactors: { headerName: 'Fatores de Sono' },
  sleepFlowDedication: { headerName: 'Dedicação ao Sono' },
  techniquesUsedToday: { headerName: 'Técnicas Usadas Hoje' }
};

export default function StudentPage() {
  const { usersList, setLoading, loading } = useAuth();
  const [selectedUserDiaries, setSelectedUserDiaries] = useState<Diary[]>([]);
  const [userSelected, setUserSelected] = useState<User | null>(null);

  const [isTable, setTableVisible] = useState(true);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const userId = location.pathname.split('/').pop(); // Extrair UID do pathname
    if (userId) {
      const foundUser = usersList.find((user) => user.uid === userId); // Corrigido tipo de busca
      if (foundUser && foundUser.diaries) {
        setUserSelected(foundUser);
        setSelectedUserDiaries(Object.values(foundUser.diaries)); // Configura os diários encontrados como array de valores
      } else {
        console.warn(`User with UID ${userId} not found in usersList or no diaries found`);
        setSelectedUserDiaries([]); // Define como um array vazio se o usuário não for encontrado ou se não houver diários
        setUserSelected(null); // Define como null se não encontrar o usuário
      }
    }
    setLoading(false); // Marca o carregamento como completo após encontrar ou não encontrar o usuário
  }, [usersList, location.pathname, setLoading]);

  const handleSort = (key: string) => {
    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(direction);
    setSelectedUserDiaries((prevDiaries) =>
      [...prevDiaries].sort((a, b) => {
        const aValue = a[key as keyof Diary];
        const bValue = b[key as keyof Diary];

        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      })
    );
  };

  if (loading) {
    return <p>Loading...</p>; // Exibe "Loading..." enquanto os diários estão sendo carregados
  }

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 flex items-center justify-between bg-white">
        <h1 className="font-bold">{userSelected?.username || 'Usuário não encontrado'}</h1>
        <div className="space-x-2">
          <button onClick={() => setTableVisible(true)} className="px-2 bg-slate-100 outline-none rounded-xl">Tabela</button>
          <button onClick={() => setTableVisible(false)} className="px-2 bg-slate-100 outline-none rounded-xl">Gráfico</button>
        </div>
      </header>
      <main className="flex-1">
        {isTable ?
          <table className="border-collapse w-full">
            <thead>
              <tr>
                {Object.keys(columns).map((key) => (
                  <th
                    key={key}
                    className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
                    onClick={() => handleSort(key)}
                  >
                    {columns[key].headerName}
                    {sortKey === key && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedUserDiaries.map((diary, index) => (
                <tr key={index}>
                  {Object.keys(columns).map((columnKey) => (
                    <td key={columnKey} className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {columnKey === 'sleepDate' ? (
                        diary.sleepDate ? (
                          formatDate(new Date(diary.sleepDate), 'longDate')
                        ) : (
                          'N/A'
                        )
                      ) : (
                        Array.isArray(diary[columnKey as keyof Diary])
                          ? (diary[columnKey as keyof Diary] as string[]).join(', ')
                          : diary[columnKey as keyof Diary] || 'N/A'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          :
          <div>
            Em breve... Gráfico
          </div>
        }
      </main>
    </div>
  );
}
