import React from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import axios from '../../requests/axios'

const SideBarIcon = ({ icon }) => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem('authToken')

  const handleLogout = async () => {
    try {
        const response = await axios.post('/logout', null, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.status === 200) {
            localStorage.removeItem('authToken')
            navigate('/login')
        }
    } catch (e) {
        console.log(e)
        navigate('/error')
    }
  };
  return (
    <button onClick={handleLogout} className="sidebar-icon-top ">{icon}</button>
  );
}

const TopBar = () => {
  return (
    <div className="flex align-top w-full sticky top-0 h-24 m-0 bg-primary-light shadow-lg">
      <SideBarIcon icon={<MdLogout size="30" />} />
      
    </div>
  );
};

export default TopBar;
