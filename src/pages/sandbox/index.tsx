// import DateInput from "@/components/DateInput";
// import { useAuth, type User } from "@/providers/AuthProvider";
// import { useDate } from "@/providers/DateProvider";
// import { formatDate } from "@/utils/dateUtils";
// import clsx from "clsx";
// import { Search, X } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// export default function SandBoxPage() {
//   const [inputValue, setInputValue] = useState<string>('');
//   const [filterSearch, setFilterSearch] = useState<User[]>([]);
//   const [inputFocus, setInputFocus] = useState<boolean>(false); // Estado para controlar o foco do input
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // Estado para controlar a visibilidade da lista de sugestões
//   const suggestionsRef = useRef<HTMLDivElement>(null);

//   const { usersList } = useAuth();
//   const { date } = useDate();

//   // Filtra usuários com base no valor de entrada
//   const handleFilter = (value: string) => {
//     setInputValue(value);
//     const filtered = usersList.filter(user =>
//       user.username?.toLowerCase().includes(value.toLowerCase()) ?? false
//     );
//     setFilterSearch(filtered);
//   };

//   // Se não houver filtro, exibe todos os usuários
//   const usersToDisplay = inputValue ? filterSearch : usersList;

//   // Trata o evento de clique fora da lista de sugestões
//   const handleClickOutside = (e: MouseEvent) => {
//     if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
//       setInputFocus(false);
//       setShowSuggestions(false);
//     }
//   };

//   // Adiciona o listener para clicar fora
//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   interface Column {
//     headerName: string;
//     width: number;
//   }

//   type ColumnType = {
//     [key: string]: Column;
//   }

//   const columns: ColumnType = {
//     username: { headerName: 'Username', width: 150 },
//     sleepDate: { headerName: 'Data de Sono', width: 150 },
//     bedtime: { headerName: 'Hora de Dormir', width: 150 },
//     wakeUpTime: { headerName: 'Hora de Acordar', width: 150 },
//     lastWakeUpTime: { headerName: 'Última Hora de Acordar', width: 180 },
//     timeToFallAsleep: { headerName: 'Tempo para Dormir', width: 160 },
//     timeToFallAsleepAgain: { headerName: 'Tempo para Dormir Novamente', width: 220 },
//     medicationUsageYesterday: { headerName: 'Uso de Medicamento Ontem', width: 200 },
//     anxietyComparisonToday: { headerName: 'Comparação de Ansiedade Hoje', width: 220 },
//     stressComparisonToday: { headerName: 'Comparação de Estresse Hoje', width: 200 },
//     fatigueReduction: { headerName: 'Redução da Fadiga (%)', width: 200 },
//     morningFeeling: { headerName: 'Sentimento Matinal', width: 160 },
//     nightAwakenings: { headerName: 'Acordar à Noite', width: 160 }
//   };

//   return (
//     <div className="h-screen">
//       <header className="w-screen flex items-center justify-between bg-dark-blue-color p-4">
//         <h1 className="text-2xl font-bold text-white">Planilha</h1>
//         <div className="flex items-center gap-2 bg-white rounded-xl px-2 relative">
//           <Search className="size-4" />
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => handleFilter(e.target.value)}
//             onFocus={() => {
//               setInputFocus(true);
//               setShowSuggestions(true);
//             }}
//             onBlur={() => {
//               // Usar setTimeout para garantir que o menu de sugestões não desapareça imediatamente
//               setTimeout(() => {
//                 setInputFocus(false);
//                 setShowSuggestions(false);
//               }, 100);
//             }}
//             className="outline-none"
//           />
//           <button onClick={() => handleFilter('')}>
//             <X className="size-4" />
//           </button>
//           {showSuggestions && ( // Mostrar lista se o input estiver em foco ou se houver um valor no input
//             <div
//               ref={suggestionsRef}
//               className="w-full absolute left-0 rounded-xl top-0 translate-y-8 bg-white space-y-2 overflow-scroll max-h-56 shadow-xl"
//             >
//               {usersToDisplay.map((user, index) => (
//                 <div
//                   key={index}
//                   className="px-2 cursor-pointer"
//                   onClick={() => {
//                     handleFilter(user.username ?? '');
//                     setInputFocus(false);
//                     setShowSuggestions(false);
//                   }}
//                 >
//                   {user.username}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <DateInput className="text-white" />
//       </header>

//       <main>
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr>
//               {Object.keys(columns).map((key) => (
//                 <th
//                   key={key}
//                   className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis"
//                   style={{ width: columns[key].width }}
//                 >
//                   {columns[key].headerName}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {usersToDisplay.map((user, index) => (
//               user.diaries ? Object.keys(user.diaries).map((diaryId, diaryIndex) => {
//                 const diary = user.diaries![diaryId];
//                 const formattedDate = new Date(diary.sleepDate);
//                 return (
//                   <tr key={`${index}-${diaryIndex}`}>
//                     <td className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">{user.username}</td>
//                     <td className={clsx(
//                       "border p-2 whitespace-nowrap overflow-hidden text-ellipsis",
//                       { "bg-green-500": formatDate(date, 'yyyy-mm-dd') === diary.sleepDate }
//                     )}>
//                       {formatDate(formattedDate, 'longDate')}
//                     </td>
//                     <td className="border p-2">{diary.bedtime}</td>
//                     <td className="border p-2">{diary.wakeUpTime}</td>
//                     <td className="border p-2">{diary.lastWakeUpTime}</td>
//                     <td className="border p-2">{diary.timeToFallAsleep}</td>
//                     <td className="border p-2">{diary.timeToFallAsleepAgain}</td>
//                     <td className="border p-2">{diary.medicationUsageYesterday ? "Sim" : "Não"}</td>
//                     <td className="border p-2">{diary.anxietyComparisonToday}</td>
//                     <td className="border p-2">{diary.stressComparisonToday}</td>
//                     <td className="border p-2">{diary.fatigueReduction}</td>
//                     <td className="border p-2">{diary.morningFeeling}</td>
//                     <td className="border p-2">{diary.nightAwakenings}</td>
//                   </tr>
//                 );
//               }) : null
//             ))}
//           </tbody>
//         </table>
//       </main>
//     </div>
//   );
// }
