import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}