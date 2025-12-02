import { useState } from "react";
import { ListTasks } from "./assets/componentes/ListTasks";
import { CreateTask } from "./assets/componentes/CreateTask";

export default function App() {
  const [tarefaCriadaFlag, setTarefaCriadaFlag] = useState(false);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }} className="pb-8">
      <CreateTask
        quandoEnviaComSucesso={() => {
          setTarefaCriadaFlag(true);
        }}
      />
      <ListTasks
        tarefaCriadaFlag={tarefaCriadaFlag}
        toggleTarefaCriadaFlag={() => setTarefaCriadaFlag(false)}
      />
    </div>
  );
}