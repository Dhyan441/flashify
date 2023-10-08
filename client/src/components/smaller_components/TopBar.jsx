import React, {useEffect} from "react";
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
        // navigate('/')
    }
  };
  return (
    <button onClick={handleLogout} className="sidebar-icon-top ">{icon}</button>
  );
}

const TopBar = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem("authToken")
  useEffect(() => {
    checkLoggedIn()
  }, [])

  const checkLoggedIn = async () => {
    console.log('checkking logged in')
    try {
      const response = await axios.get('/isLoggedIn', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      console.log(response)
      if (response.status !== 200) {
        throw new Error()
      }
    } catch (e) {
      navigate('/login');
    }
  }

  return (
    <div className="flex items-center justify-center w-full sticky top-0 h-24 m-0 bg-primary-background shadow-lg">
      <h1 className="text-2xl font-bold" style={{color: 'black', textAlign: "center", marginLeft: "11rem"}}>Flashify</h1>
      <SideBarIcon icon={<MdLogout size="30" />} />
    </div>
  );
};

export default TopBar;
