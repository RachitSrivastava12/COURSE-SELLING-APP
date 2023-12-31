import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AppBar from "./AppBar";

function Signin(){
    return( <>
    <div style={{
          width:"100vw", height:"100vh" , backgroundColor:"#eeeeee"
    }}> 
      <AppBar />
     <div style={{
        paddingTop:140,
        padding:20,
        display:"flex",
        justifyContent:"center"
     }}>
        <Typography variant={"h6"}>
            Welcome to  Coursera! Sign in below
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
    fullWidth={true}
     id="filled-basic"
      label="Email"
       variant="filled" />
    <br/>
    <TextField  fullWidth={true} id="filled-basic" label="Password" variant="filled" />
    <br/>
    <br/>
    <Button  size='large' variant="contained">Sign In</Button>
    </Card>
    </div>
    </div>
    </>
    )
}
export default Signin;