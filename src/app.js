import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Configuramos Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
  res.render("index");
});

//Listen
const httServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
});
// me guardo una referencia del servidor
// generamos una instancia del websocket

const io = new Server(httServer);

// creo un array que tenga todo el historial de mensajes
let messages = [];

io.on("connection", (socket) => {
  console.log("nuevo usuario conectado");

  socket.on("message", (data) => {
    messages.push(data);

    io.emit("messagesLogs", messages)
  });
});
