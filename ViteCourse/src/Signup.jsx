import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AppBar from "./AppBar";
import Courses from "./Courses";
import { useState } from 'react';
function Signup(){
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    return( <>     
  <div style={{  
          width:"100vw", height:"100vh" , backgroundColor:"#eeeeee"
    }}> 
    <AppBar></AppBar>
     <div style={{
        paddingTop:140,
        padding:20,
        display:"flex",
        justifyContent:"center"
     }}>
        <Typography variant={"h6"}>
            Welcome to  Coursera! Sign up
       </Typography>
        
    </div>
    
    
    <div style={{
        display:"flex",
        justifyContent:"center"
    }}>
    <Card variant={"outlined"} style={{
        width:400,
        padding:20
    }}>
    <TextField 
    onChange={(e) => {
        setemail(e.target.value);
    }}
    fullWidth={true}
     id={"username"}
      label="Email"
       variant="filled" />
    <br/>
    <TextField
    onChange={(e) => {
        setpassword(e.target.value);
    }}  
    fullWidth={true} 
    id={"password"} 
    label="Password" variant="filled" type={"password"}/>
    <br/>
    <br/>
    <Button size='large' variant="contained" onClick={async () => {
  try {
    const response = await fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    localStorage.setItem("token",data.token);// token stored
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
  window.location = "/courses";
}}>
  Sign up
</Button>
    </Card>
    </div>
    </div>
    </>)
}
export default Signup;
