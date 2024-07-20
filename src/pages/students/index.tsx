import TableComponent from "@/components/Table"
import { useAuth } from "@/providers/AuthProvider"
import { RotateCcw } from 'lucide-react'

export default function StudentsPage() {
  const { getAllUsers } = useAuth()
  return (
    <div className='flex-1 p-8 flex flex-col'>
      <header className="flex gap-4 items-center justify-between sticky top-0">
        <h1 className="font-extrabold text-3xl">Usuários</h1>
        <button
          type="button"
          onClick={getAllUsers}
        ><RotateCcw />
        </button>
      </header>
      <div className="flex-1 flex   ">

        <TableComponent />

      </div>
    </div>
  )
}