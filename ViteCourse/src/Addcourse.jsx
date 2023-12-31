import { Button, TextField } from "@mui/material";
import AppBar from "./AppBar";
import Card from "@mui/material/Card";
import { useState } from "react";
function Addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const handleAddCourse = async () => {
    try {
      const token = localStorage.getItem("token")
      console.log(token);
      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "POST",
        body: JSON.stringify({
          Title: title,
          Description: description,
          ImageLink: image,
          published: true,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", token); // Update token
      // Redirect to the Courses route after adding the course 
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
  <>
      <div>
        <AppBar />
      </div>
      <center>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            fullWidth={true}
            id={"title"}
            label="Title"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            id={"description"}
            label="Description"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={(e) => setImage(e.target.value)}
            fullWidth={true}
            id={"image"}
            label="Image"
            variant="outlined"
          />
          <br />
          <Button
            style={{ marginTop: 20 }}
            size={"large"}
            variant={"contained"}
            onClick={handleAddCourse}>
            Add Courses
          </Button>
        </Card>
      </center>
    </>
  );
}
export default Addcourse;
