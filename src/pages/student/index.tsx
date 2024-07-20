import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAuth, Diary } from "@/providers/AuthProvider";

export default function StudentPage() {
  const { usersList, setLoading, loading } = useAuth();
  const location = useLocation();
  const [selectedUserDiaries, setSelectedUserDiaries] = useState<Diary[]>([]);


  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const userId = location.pathname.split('/').pop(); // Extrair UID do pathname
    if (userId) {
      const foundUser = usersList.find((user: any) => user.uid === userId); // Utilizando 'any' para evitar erros de tipagem
      if (foundUser && foundUser.diaries) {
        setSelectedUserDiaries(Object.values(foundUser.diaries)); // Configura os diários encontrados como array de valores
      } else {
        console.warn(`User with UID ${userId} not found in usersList or no diaries found`);
        setSelectedUserDiaries([]); // Define como um array vazio se o usuário não for encontrado ou se não houver diários
      }
      setLoading(false); // Marca o carregamento como completo após encontrar ou não encontrar o usuário
    } else {
      setLoading(false); // Marca o carregamento como completo se não houver userId no pathname
    }
  }, [usersList, location.pathname]);

  const columns: GridColDef[] = [
    { field: 'sleepDate', headerName: 'Data de Sono', width: 150 },
    { field: 'bedtime', headerName: 'Hora de Dormir', width: 150 },
    { field: 'wakeUpTime', headerName: 'Hora de Acordar', width: 150 },
    { field: 'lastWakeUpTime', headerName: 'Última Hora de Acordar', width: 180 },
    { field: 'timeToFallAsleep', headerName: 'Tempo para Dormir', width: 160 },
    { field: 'timeToFallAsleepAgain', headerName: 'Tempo para Dormir Novamente', width: 220 },
    { field: 'medicationUsageYesterday', headerName: 'Uso de Medicamento Ontem', width: 200 },
    { field: 'anxietyComparisonToday', headerName: 'Comparação de Ansiedade Hoje', width: 220 },
    { field: 'stressComparisonToday', headerName: 'Comparação de Estresse Hoje', width: 200 },
    { field: 'fatigueReduction', headerName: 'Redução da Fadiga (%)', width: 200 },
    { field: 'morningFeeling', headerName: 'Sentimento Matinal', width: 160 },
    { field: 'nightAwakenings', headerName: 'Acordar à Noite', width: 160 },
    // Adicione mais colunas conforme necessário para cada propriedade do modelo Diary
  ];

  const getRowId = (diary: Diary) => diary.sleepDate; // Exemplo usando a data como id, ajuste conforme necessário

  if (loading) {
    return <p>Loading...</p>; // Exibe "Loading..." enquanto os diários estão sendo carregados
  }

  return (
    <div style={{ height: 400, width: '700px' }}>
      <DataGrid
        rows={selectedUserDiaries}
        columns={columns}
        getRowId={getRowId} // Configuração para obter o id de cada linha
        checkboxSelection
        pagination
        // pageSize={5} // Defina o tamanho da página aqui
      />
    </div>
  );
}
