import { useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { RotateCw } from 'lucide-react'
import DateInput from '../../components/DateInput'
import TableComponent from '../../components/Table'

export default function DashboardPage() {
  const { signOut, getAllUsers, usersList } = useAuth()
  const [teste] = useState(true)

  if(teste){
    return(
      <div className='flex-1 flex items-center justify-center'>
        <h1>Hello Test!</h1>
      </div>
    )
  }

  return (
    <div className='h-screen flex flex-col gap-4 items-center justify-center'>
      <div className='bg-gray-800 text-white rounded-lg p-8 flex flex-col  gap-4'>
        {/* TITULO | RELOAD(BUTTON) | DESLOGAR(BUTTON) */}
        <div className='flex items-center gap-8'>
          <h1 className='text-center whitespace-nowrap flex-1'>Welcome to Dashboard Page</h1>
          <button className='flex gap-4 bg-blue-600 p-2 rounded-lg' onClick={getAllUsers}>Reload <RotateCw /></button>
          <button onClick={() => signOut()} className=' p-2 bg-red-400 text-white rounded-lg '>Deslogar</button>
        </div>

        {/* USUARIOS LISTADOS(P) | DATEINPUT*/}
        <div className='flex justify-between items-center gap-4'>
          <p>Usuarios Cadastrados: {usersList.length}</p>


          <div className='flex p-2 bg-gray-500 rounded-lg'>
            <DateInput  />
          </div>
        </div>

        {/* TABELA */}
        <TableComponent/>
      </div>
    </div >
  )
}