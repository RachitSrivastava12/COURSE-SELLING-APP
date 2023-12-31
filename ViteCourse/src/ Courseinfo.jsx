
import { Card,Typography,TextField,Button } from "@mui/material";
import { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import AppBar from "./AppBar";
function Courseinfo(){
     let {courseId} =useParams();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          if (!res.ok) {
            console.error("Error fetching courses data. Status:", res.status);
            return;
          }
          const data = await res.json();
          setCourses(data.courses);
        } 
        catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
    let course = null;
    for(let i =0; i<courses.length;i++)
    {
      if(courses[i].id == courseId)
      {
        course = courses[i]
        console.log(courseId);
      }
    }
    //only the needed course fteched
    if (!course)
    {
      console.log(courseId);
      return <div>
        loading...
      </div>
    }
    return <> <AppBar/>
    <div style={{display:"flex",justifyContent: "center"}}>
      <CourseCard course={course} />
      <UpdateCard courses={courses} course={course} setCourses={setCourses} />
    </div>
    </>
}
function UpdateCard(props) {
  const [title, setTitle] = useState(""); 
   const [description, setDescription] = useState(""); 
   const [image, setImage] = useState(""); 
   const course = props.course; 
   const handleAddCourse = async () => { try {
    const token = localStorage.getItem("token"); 
    console.log(token); 
    const response = await fetch("http://localhost:3000/admin/courseinfo/" + course.id, 
    { method: "PUT",
     body: JSON.stringify({ 
       Title: title, 
       Description: description, 
       ImageLink: image, 
       published: true, }), 
       headers: { "Content-Type": "application/json", 
       Authorization: "Bearer " + token, }, }); 
       if (!response.ok) 
       { throw new Error("Network response was not ok"); } 
       const data = await response.json();
       let updatedCourses = [];
       for( let i =0; i< props.courses.length;i++){
        if(props.courses.id == course.id){
          updatedCourses.push({
            id: course.id,
            title: title,
            description : description,
            imageLink : image
          })
        }else{
          updatedCourses.push(props.courses[i]);
        }
       }
       props.setCourses(updatedCourses);
        console.log(data);
        localStorage.setItem("token", token);
        // Update token // Redirect to the Courses route after adding the course // Example redirection to Courseinfo 
       } catch (error) { console.error("There was a problem with the fetch operation:", error); 
     } 
     }
   return ( <>  <div style={{display:"flex",justifyContent:"center"}}>
    <center> 
      <Card variant={"outlined"} style={{ width: 400, padding: 20 }}> 
      <Typography>Update the course</Typography> 
      <TextField onChange={(e) => setTitle(e.target.value)} 
      fullWidth={true} id={"title"} label="Title" 
      variant="outlined" /> 
      <br /> 
      <TextField 
      onChange={(e) => setDescription(e.target.value)} 
      fullWidth={true} id={"description"} 
      label="Description" variant="outlined" />
       <br /> 
       <TextField 
       onChange={(e) => setImage(e.target.value)} 
       fullWidth={true} id={"image"} 
       label="Image" variant="outlined" /> 
       <br /> 
       <Button style={{ marginTop: 20 }} 
       size={"large"} variant={"contained"} 
       onClick={handleAddCourse} > Update Course </Button>
        </Card>
        </center> 
        </div>
        </> ); 
      }
      function CourseCard(props) {
        const course = props.course;
        return (<div style={{display:"flex",justifyContent:"center"}}>
          <Card variant={"outlined"} style={{ width: 400, padding: 20, minHeight: 200 }}>
            <Typography textAlign={"center"} variant="h4">{course.Title}</Typography>
            <Typography textAlign={"center"} variant="subtitle">{course.Description}</Typography>
            <img src={course.ImageLink} alt={course.Title} style={{ width: 300 }} />
          </Card>
          </div>
        );
        }
        export default Courseinfo;