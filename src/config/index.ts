import express from "express";
import cors from "cors";
import db from "./database.config";

db.sync().then(()=>{
  console.log('connect to db');
})


const app = express();
app.use(cors());

app.get("/", function (req, res) {
  const dataTodoList = [
    {
      icon: "iconAnchorOff",
      title: "todolist ที่ 1",
      description: "เรืแดฟหกงกดสหก",
      status: "DONE",
    },
    {
      title: "todolist ที่ 2",
      description: "เรืแดฟหกงกดสหกด ทม รา",
      status: "DOING",
    },
    {
      title: "todolist ที่ 3",
      description: "เรืแดฟหกงกดสหกด ทม รา",
      status: "DONE",
    },
  ];
  res.send(dataTodoList);
});

app.listen(3030, () => {
  console.log("start server");
});
