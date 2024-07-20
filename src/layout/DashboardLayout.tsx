// src/layouts/DashboardLayout.tsx

import React, { ReactNode, useState } from "react"
import { AreaChart, Bell, Search, Settings, Users } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"
import toggleIcon from '@assets/svgs/toggle-icon.svg'
import DateInput from "@/components/DateInput"
import { DateProvider } from "@/providers/DateProvider"
import { useAuth } from "@/providers/AuthProvider"
import { LayoutProvider, useLayout } from "@/providers/LayoutProvider"

interface AuthLayoutProps {
  children: ReactNode
}

const navbarGroup = [
  { id: 0, title: 'Dashboard', icon: <AreaChart className="size-5" />, pathname: '/dashboard' },
  { id: 1, title: 'Usuários', icon: <Users className="size-5" />, pathname: '/students' },
  { id: 2, title: 'Notificações', icon: <Bell className="size-5" />, pathname: '/notification' },
  { id: 3, title: 'Configurações', icon: <Settings className="size-5" />, pathname: '/settings' },
]

const DashboardLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const location = useLocation()
  const { signOut } = useAuth();
  const { showLayout } = useLayout()
  const [showSidebar, setShowSibar] = useState(true)

  if (!showLayout || location.pathname === '/') {
    return (
      <>
        {children}
      </>
    )
  }
  return (
    <DateProvider>
      <div className="flex flex-wrap">

        {/* SIDEBAR */}
        <div className={clsx(
          { 'w-12': !showSidebar },
          "h-screen w-60 border-r bg-sidebar-background overflow-scroll "
        )}>
          <header className="h-20 p-4 py-6 flex  items-center justify-between border-b">
            <button onClick={() => showSidebar ? '' : setShowSibar(true)}><img src="/moon.svg" /></button>
            {showSidebar ? <h1 className="flex-1 text-center font-bold text-xl">SonoFlow</h1> : ''}
            {/* {showSidebar ? <button onClick={() => setShowSibar(!showSidebar)}><img src={toggleIcon} /></button> : ''} */}
          </header>

          <div className=" py-8 space-y-8">
            <div className="flex justify-center">
              <div className=" w-3/4 flex gap-2 px-4 py-2 rounded-2xl items-center justify-center text-gray-color border bg-white">
                <Search className="size-5" />
                <input type="text" placeholder="Pesquisar" className="w-[100%] flex-1  outline-none text-black-color" />
              </div>
            </div>

            <nav>
              <ul className="flex flex-col gap-4">
                {navbarGroup.map((item, index) => {
                  return (
                    <li key={index} className=" flex justify-center" >
                      <Link
                        to={item.pathname}
                        className={clsx(
                          "w-3/4 px-4 py-2 rounded-2xl flex items-center gap-4 text-gray-colo",
                          { 'text-white-color bg-black-color ': location.pathname === item.pathname },
                          { 'hover:bg-gray-100 ': location.pathname !== item.pathname },
                          { 'w-full': !showSidebar }
                        )}>
                        {item.icon}
                        {showSidebar && item.title}
                      </Link>
                    </li>
                  )
                })}
                {showSidebar &&
                  <button
                    type="button"
                    onClick={signOut}
                    className="w-3/4 px-4 py-2 rounded-2xl flex items-center justify-center gap-4 text-gray-colo m-auto bg-black-color text-white-color">Sair</button>
                }
              </ul>

            </nav>
          </div>
        </div>

        {/* HEADER | CHILDREN */}
        <div className="h-screen flex flex-col  flex-1">

          {/* HEADER */}
          <div className="h-20 border-b bg-sidebar-background flex items-center justify-center gap-8">
            <div className=" w-3/4 flex gap-2 px-4 py-2 rounded-2xl items-center justify-center text-gray-color border bg-white">
              <Search className="size-5" />
              <input type="text" placeholder="Pesquisar" className="w-[100%] flex-1  outline-none text-black-color" />
            </div>
            <DateInput />
          </div>
          <div className="h-4/5  overflow-scroll">
            {children}
          </div>
        </div>
      </div>
    </DateProvider>
  )
}

const DashboardLayoutWithProvider: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <LayoutProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </LayoutProvider>
  )
}

export default DashboardLayoutWithProvider;