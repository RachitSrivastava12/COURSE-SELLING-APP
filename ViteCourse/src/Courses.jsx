import React, { useState, useEffect } from "react";
import { Card, Button, TextField, Typography } from "@mui/material";
import AppBar from "./AppBar";

function Courses() {
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

  return (
    <>
      <div>
        <AppBar />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}

function Course({ course }) {
  return (
    <>
      <div>
        <CourseCard course={course} />
      </div>
    </>
  );
}
export function CourseCard(props) {
  const course = props.course;
  return (
    <Card variant={"outlined"} style={{ width: 400, padding: 20, minHeight: 200 }}>
      <Typography textAlign={"center"} variant="h4">{course.Title}</Typography>
      <Typography textAlign={"center"} variant="subtitle">{course.Description}</Typography>
      <img src={course.ImageLink} alt={course.Title} style={{ width: 300 }} />
    </Card>
  );
}

export default Courses;
