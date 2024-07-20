import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert("Falha ao fazer login. Verifique suas credenciais.");
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleAdmLogin = () => {
    setEmail('fernandavianna@sonoflow.com');
    setPassword('16121979');
  };

  if(currentUser){
    navigate('/dashboard')
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl flex flex-col items-center gap-4 bg-gray-50 shadow-sm shadow-black">
        <h1 className="text-2xl">Logar na sua conta</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="space-y-2">
            <p>Email</p>
            <input
              id="email"
              type="email"
              className="w-72 bg-transparent outline-none border border-black p-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <p>Senha</p>
            <input
              id="password"
              type="password"
              className="w-72 bg-transparent outline-none border border-black p-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-500 w-full py-2 rounded-lg"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleAdmLogin}
            className="text-white bg-red-600 hover:bg-red-500 w-full py-2 rounded-lg"
          >
            Adm Button
          </button>
        </form>
      </div>
    </div>
  );
}
