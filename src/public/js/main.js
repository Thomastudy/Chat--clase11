console.log("Hola desde el main.js");

const socket = io();
// Crear una instancia ed

// socket.emit("mensaje", "saluditossss desde el fronty");

// crear variable para huardar usuario conectado
let user;

const chatBox = document.getElementById("chatBox");

// utilizamos swaet alert para el mensaje de bienvenida

// swall es un objeto que nos permite usar los metodos de la libreria
// fire nos permite configurar el alerta

swal
  .fire({
    title: "identificate",
    input: "text",
    text: "Ingresa un usuario para identificarte en el chat",
    inputValidator: (value) => {
      return !value && "Escribi tu nombre dale, no seas gil";
    },
    allowOutsideClick: false,
  })
  .then((result) => {
    user = result.value;
  });

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // trim me permite sacar los espacios en blanco del principio y del final de un string
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

// Listener de mensajes
socket.on("messagesLogs", (data) => {
  const log = document.getElementById("messagesLogs");
  let messages;
  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br>`;
  });

  log.innerHTML = messages
});
