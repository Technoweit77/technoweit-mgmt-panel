import React from 'react'
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import DashboardIcon from '@mui/icons-material/Dashboard';

import DashboardLayout from './components/DashboardLayout'
import Login from './pages/auth/Login';


const App = ({ toggleTheme, themeMode }) => {


  let handleLogout = async () => {
    alert("Logout")
  }

  //Define your routes
  const appRoutes = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
  ];

  //Define your sidebar Menus

  const appMenus = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon />, allowedRole: ['Admin'] },
  ];

  return (
    <DashboardLayout
      userData={{
        userName: "Technoweit Admin",
        userRole: "Admin"
      }}
      routes={appRoutes}
      menus={appMenus}
      toggleTheme={toggleTheme}
      themeMode={themeMode}
      onLogoutClick={handleLogout}
      sideBarType='fixed' />

  )
}

export default App