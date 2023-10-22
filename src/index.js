
import  app  from "./app.js";
import { PORT } from "./config.js";

app.set('port', process.env.PORT || PORT);

app.listen(PORT, () => {
    console.log(`Servidor web iniciado en el puerto ${PORT}`);
});
