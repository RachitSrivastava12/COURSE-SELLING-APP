import { Button, Typography } from '@mui/material';
import { Await, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function AppBar() {
  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/me", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
  
        if (!res.ok) {
          // Handle 403 Forbidden or other errors
          console.error("Error fetching user data. Status:", res.status);
          return;
        }
  
        const data = await res.json();
        if (data.username) {
          setUserEmail(data.username);
        }
      } catch (error) {
        // Handle other errors
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
 
if(userEmail){
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div>
            {userEmail}
        </div>
        <div style={{marginRight: 10}}>
        <Button
          size='large'
          variant="contained"
          onClick={() => { localStorage.setItem("token", null);
          window.location="/"
        }}
          style={{ marginRight: "10px" }}>
          log out
        </Button>
      </div>
    </div>
    </div>
  );
}
else{
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      <div>
        <Button
          size='large'
          variant="contained"
          onClick={handleSignInClick}
          style={{ marginRight: "10px" }}
        >
          Sign In
        </Button>
        <Button
          size='large'
          variant="contained"
          onClick={handleSignUpClick}
          style={{ marginRight: "10px" }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
} 
}

export default AppBar;
