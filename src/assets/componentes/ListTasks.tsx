import { useEffect, useState } from "react";
import { Card } from "./Card";
import toast from "react-simple-toasts";

type ListTasksProps = {
  tarefaCriadaFlag: boolean;
  toggleTarefaCriadaFlag: Function;
};

export function ListTasks(props: ListTasksProps) {
  const [tasks, setTasks] = useState([]);

  async function carregaTarefas() {
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/melvin/tasks"
    );
    const tarefas = await resposta.json();
    setTasks(tarefas);
  }

  async function deletarTarefa(taskId: string) {
    const resposta = await fetch(
      `https://pacaro-tarefas.netlify.app/api/melvin/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (resposta.status === 200) {
      toast("Tarefa deletada");
      carregaTarefas();
    } else {
      toast("Erro ao deletar")
    }
  }

  async function atualizarTarefaProximo(taskId: string, taskStep: string) {
    if(taskStep === "Para fazer"){
      const resposta = await fetch(
        `https://pacaro-tarefas.netlify.app/api/melvin/tasks/${taskId}/update-step`,
        {
          method: "PATCH",
          body: JSON.stringify({ 
            step: 'Em andamento'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (resposta.status === 200) {
        toast("Tarefa atualizada");
        carregaTarefas();
      } else {
        toast("Erro ao atualizar")
      }

    } else if(taskStep === "Em andamento"){
      const resposta = await fetch(
        `https://pacaro-tarefas.netlify.app/api/melvin/tasks/${taskId}/update-step`,
        {
          method: "PATCH",
          body: JSON.stringify({ 
            step: 'Pronto'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (resposta.status === 200) {
        toast("Tarefa atualizada");
        carregaTarefas();
      } else {
        toast("Erro ao atualizar");
      }

    } else if(taskStep === "Pronto"){
      toast("Tarefa não pode ser progredida");
    }
  }

  async function atualizarTarefaAnterior(taskId: string, taskStep: string) {
    if(taskStep === "Para fazer"){
      toast("Tarefa só pode ser progredida");
        
    } else if(taskStep === "Em andamento"){
      const resposta = await fetch(
        `https://pacaro-tarefas.netlify.app/api/melvin/tasks/${taskId}/update-step`,
        {
          method: "PATCH",
          body: JSON.stringify({ 
            step: 'Para fazer'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (resposta.status === 200) {
        toast("Tarefa atualizada");
        carregaTarefas();
      } else {
        toast("Erro ao atualizar")
      }

    } else if(taskStep === "Pronto"){
      toast("Tarefa não pode ser regredida");
    }
  }

  useEffect(() => {
    carregaTarefas();
  }, []);

  useEffect(() => {
    if (props.tarefaCriadaFlag === true) {
      carregaTarefas();
      props.toggleTarefaCriadaFlag();
    }
  }, [props.tarefaCriadaFlag]);

  const tarefasPorStep = {
    "Para fazer": tasks.filter((task) => task.step === "Para fazer"),
    "Em andamento": tasks.filter((task) => task.step === "Em andamento"),
    "Pronto": tasks.filter((task) => task.step === "Pronto"),
  };

  const coresPorStep = {
    "Para fazer": "#ef4444",
    "Em andamento": "#f59e0b",
    "Pronto": "#10b981",
  };

  const catImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HAP4GCixYcgX5rkPDQZ5hxl3juSak8Nw8A&s",
    "https://i.pinimg.com/170x/a5/7d/17/a57d1781837fa29ff8f8f7b6e9e4d714.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4vD4_03Pbc5z0e4_IoRK5ilY6rnizNqgPKA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvXwfleF-_uui06AZchcWQE43v6DGjSTzIPCA_r6HxfoWzmYQHHurZQ14wycfa1ooLaPc&usqp=CAU",
    "https://pbs.twimg.com/media/GDESvjHboAAlwOX.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDa34mq5y5QVP_cyMqLOPVh1aX1OYan_SNRcRQi7gKPBjuUwolPigXkbtsbFcj2zooEiU&usqp=CAU",
    "https://i.pinimg.com/170x/b0/37/d1/b037d1573b4f2ccbb32cc8e54a031414.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-T2UEoMhkcXWQMIRQ309wooIwVN0t11tqxw&s",
    "https://pbs.twimg.com/media/GDEbCoYaQAAZSS1.jpg?format=jpg&name=thumb"
  ];

  return (
    <div className="w-full px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-8 max-w-screen-2xl mx-auto">
      <div className="mb-4 sm:mb-5 md:mb-6 flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 justify-center flex-wrap">
        {catImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Gato"
            className="rounded-md sm:rounded-lg w-14 h-11 min-[375px]:w-16 min-[375px]:h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 xl:w-32 xl:h-26 object-cover"
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {Object.keys(tarefasPorStep).map((stepNome) => (
          <div key={stepNome} className="w-full">
            <Card>
              <h3
                className="text-base sm:text-lg md:text-xl font-bold mb-2.5 sm:mb-3 md:mb-4 text-center break-words"
                style={{ color: coresPorStep[stepNome] }}
              >
                {stepNome}
              </h3>
              <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
                {tarefasPorStep[stepNome].length === 0 ? (
                  <p className="text-center text-gray-400 italic text-xs sm:text-sm">Nenhuma tarefa</p>
                ) : (
                  tarefasPorStep[stepNome].map((task) => (
                    <div
                      key={task.id}
                      className="p-2.5 sm:p-3 md:p-4 rounded-md sm:rounded-lg border-2"
                      style={{ 
                        backgroundColor: "#fef3c7",
                        borderColor: coresPorStep[stepNome]
                      }}
                    >
                      <h4 className="font-bold mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base break-words" style={{ color: "#1e40af" }}>
                        {task.title}
                      </h4>
                      <p className="text-xs sm:text-sm mb-2 sm:mb-2.5 md:mb-3 break-words" style={{ color: "#1e3a8a" }}>
                        {task.description}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <button 
                          onClick={() => atualizarTarefaAnterior(task.id, task.step)} 
                          className="px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded text-white font-semibold text-xs sm:text-sm whitespace-nowrap"
                          style={{ backgroundColor: "#6366f1" }}
                        >
                          Voltar
                        </button>
                        <button 
                          onClick={() => deletarTarefa(task.id)} 
                          className="px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded text-white font-semibold text-xs sm:text-sm whitespace-nowrap"
                          style={{ backgroundColor: "#dc2626" }}
                        >
                          Deletar
                        </button>
                        <button 
                          onClick={() => atualizarTarefaProximo(task.id, task.step)} 
                          className="px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded text-white font-semibold text-xs sm:text-sm whitespace-nowrap"
                          style={{ backgroundColor: "#6366f1" }}
                        >
                          Avançar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}