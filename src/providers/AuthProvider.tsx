import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import DashboardLayoutWithProvider from "../layout/DashboardLayout";

export interface Diary {
  uid: string;
  additionalComments: string;
  anxietyComparisonToday: number;
  bedtime: string;
  fatigueReduction: number;
  lastWakeUpTime: string;
  medicationUsageYesterday: boolean;
  morningFeeling: number;
  negativeFactorsToday: string[];
  nightAwakenings: number;
  positiveFactorsToday: string[];
  sleepAttemptTime: string;
  sleepDate: string;
  sleepFactors: string[];
  sleepFlowDedication: number;
  stressComparisonToday: number;
  techniquesUsedToday: string[];
  timeToFallAsleep: string;
  timeToFallAsleepAgain: string;
  wakeUpTime: string;
}

export interface User {
  uid: string;
  email: string;
  username?: string;
  diaries?: { [diaryId: string]: Diary };
}

interface AuthContextProps {
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getAllUsers: () => Promise<void>;
  usersList: User[];
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email || "",
        });
        getAllUsers();
      } else {
        setCurrentUser(null);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapShot = await getDocs(q);
      const fetchedUsers: User[] = [];

      for (const doc of querySnapShot.docs) {
        const userData = doc.data();
        let newUser: User = {
          uid: doc.id,
          email: userData.email || "",
          username: userData.username || "",
          diaries: {} // Inicializando como um objeto vazio para mapear IDs de diários para Diaries
        };

        // Buscar documentos da coleção "diaries" para este usuário
        const diariesRef = collection(db, "users", doc.id, "diaries");
        const diariesSnapShot = await getDocs(diariesRef);

        diariesSnapShot.forEach(diaryDoc => {
          newUser.diaries![diaryDoc.id] = {
            ...diaryDoc.data() as Diary // Converter para o tipo Diary
          };
        });

        fetchedUsers.push(newUser);
      }

      setUsersList(fetchedUsers);
      console.log(usersList)
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      throw error;
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-black text-white">Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signOut: handleSignOut, getAllUsers, usersList, loading, setLoading }}>
      <DashboardLayoutWithProvider>
        {children}
      </DashboardLayoutWithProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
