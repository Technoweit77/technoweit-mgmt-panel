import React from 'react'
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Addstudent from './pages/Addstudent';
import Courses from './pages/Courses';
import DashboardLayout from './components/DashboardLayout'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TaskIcon from '@mui/icons-material/Task';
import Login from './pages/auth/Login';
import Project from './pages/Projects';
import Studentlist from './pages/Studentlist';
import Users from './pages/Users';


// import path from 'path';


const App = ({ toggleTheme, themeMode }) => {


  let handleLogout = async () => {
    alert("Logout")
  }

  //Define your routes
  const appRoutes = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
    {path:"/addstudent",element:<Addstudent/>},
    {path:"/courses",element:<Courses/>},
    {path:"/projects",element:<Project/>},
    {path:"/studentlist",element:<Studentlist/>},
    {path:"/users",element:<Users/>},
  ];

  //Define your sidebar Menus

  const appMenus = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon />, allowedRole: ['Admin'] },
    { name: "Addstudent", path: "/addstudent" ,icon:<PersonAddIcon/>, allowedRole: ['Admin'] },
    { name: "Courses", path: "/courses" ,icon:<TextSnippetIcon />, allowedRole: ['Admin'] },
    { name: "Projects", path: "/projects" ,icon:<TaskIcon/>, allowedRole: ['Admin'] },
    { name: "Studentlist", path: "/studentlist" ,icon:<FormatListBulletedIcon/>, allowedRole: ['Admin'] },
    { name: "Users", path: "/users" ,icon:<PeopleAltIcon/>, allowedRole: ['Admin'] },
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