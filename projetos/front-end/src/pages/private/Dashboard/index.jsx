import useAuth from "../../../hooks/useAuth"

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <button type="button" onClick={logout}>Sair</button>
    </div>
  )
}