import React, { ReactNode, useState } from "react";
import { AreaChart, Bell, Search, Settings, Users } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import DateInput from "@/components/DateInput";
import { DateProvider } from "@/providers/DateProvider";
import { useAuth } from "@/providers/AuthProvider";
import { LayoutProvider, useLayout } from "@/providers/LayoutProvider";

interface AuthLayoutProps {
  children: ReactNode;
}

const navbarGroup = [
  { id: 0, title: 'Dashboard', icon: <AreaChart className="size-5" />, pathname: '/dashboard' },
  { id: 1, title: 'Usuários', icon: <Users className="size-5" />, pathname: '/students' },
  { id: 2, title: 'Notificações', icon: <Bell className="size-5" />, pathname: '/notification' },
  { id: 3, title: 'Configurações', icon: <Settings className="size-5" />, pathname: '/settings' },
];

const DashboardLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { showLayout } = useLayout();
  const [showSidebar, setShowSidebar] = useState(true);

  if (!showLayout || location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <DateProvider>
      <div className="flex h-screen">
        {/* SIDEBAR */}
        <div className={clsx(
          "border-r bg-sidebar-background transition-width duration-300",
          { 'w-12': !showSidebar, 'w-60': showSidebar }
        )}>
          <header className="h-20 p-4 flex items-center justify-between border-b">
            <button onClick={() => setShowSidebar(!showSidebar)}>
              <img src="/moon.svg" alt="Toggle Sidebar" />
            </button>
            {showSidebar && <h1 className="flex-1 text-center font-bold text-xl">SonoFlow</h1>}
          </header>

          <div className="py-8 space-y-8">
            <div className="flex justify-center">
              <div className="w-3/4 flex gap-2 px-4 py-2 rounded-2xl items-center justify-center text-gray-color border bg-white">
                <Search className="size-5" />
                <input type="text" placeholder="Pesquisar" className="w-[100%] flex-1 outline-none text-black-color" />
              </div>
            </div>

            <nav>
              <ul className="flex flex-col gap-4">
                {navbarGroup.map((item) => (
                  <li key={item.id} className="flex justify-center">
                    <Link
                      to={item.pathname}
                      className={clsx(
                        "w-3/4 px-4 py-2 rounded-2xl flex items-center gap-4 text-gray-color",
                        { 'text-white-color bg-black-color': location.pathname === item.pathname },
                        { 'hover:bg-gray-100': location.pathname !== item.pathname },
                        { 'w-full': !showSidebar }
                      )}
                    >
                      {item.icon}
                      {showSidebar && item.title}
                    </Link>
                  </li>
                ))}
                {showSidebar &&
                  <button
                    type="button"
                    onClick={signOut}
                    className="w-3/4 px-4 py-2 rounded-2xl flex items-center justify-center gap-4 m-auto bg-black-color text-white-color"
                  >
                    Sair
                  </button>
                }
              </ul>
            </nav>
          </div>
        </div>

        {/* HEADER | CONTENT */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <div className="h-20 border-b bg-sidebar-background flex items-center justify-between px-4">
            <div className="w-3/4 flex gap-2 px-4 py-2 rounded-2xl items-center justify-center text-gray-color border bg-white">
              <Search className="size-5" />
              <input type="text" placeholder="Pesquisar" className="w-[100%] flex-1 outline-none text-black-color" />
            </div>
            <DateInput />
          </div>

          {/* CONTENT AREA */}
          <div className="w-[75vw] h-[85vh] p-4 bg-white overflow-auto">
            {/* Aqui fica a tabela */}
            {children}
          </div>
        </div>
      </div>
    </DateProvider>
  );
};

const DashboardLayoutWithProvider: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <LayoutProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </LayoutProvider>
  );
};

export default DashboardLayoutWithProvider;
