import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../../providers/AuthProvider'

interface PrivateRouterProps {
  children: React.ReactNode
}
/**
 * Componente de rota privada que verifica a autenticação do usuário.
 * 
 * Este componente renderiza os filhos passados como parâmetro se o usuário estiver autenticado.
 * Caso contrário, redireciona o usuário para a página inicial ("/").
 * 
 * @param {PrivateRouterProps} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos a serem renderizados se o usuário estiver autenticado.
 * 
 * @returns {JSX.Element} O componente filho se o usuário estiver autenticado ou um redirecionamento para a página inicial.
 * 
 * @example
 * <PrivateRouter>
 *   <Dashboard />
 * </PrivateRouter>
 */
export const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to={"/"} />
}
