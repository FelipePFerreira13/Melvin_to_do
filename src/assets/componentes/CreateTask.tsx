import { useState } from "react";
import { Card } from "./Card";
import { toast } from "react-simple-toasts";

type Step = "Para fazer" | "Em andamento" | "Pronto";

type CreateTaskProps = {
  quandoEnviaComSucesso: Function;
}

export function CreateTask(props: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<Step>("Para fazer");

  async function quandoEnvia() {
    if (title.length < 4) {
      toast("O Título deve ter no mínimo 4 caracteres");
      return;
    }
    if (title.length > 16) {
      toast("O Título deve ter no máximo 16 caracteres");
      return;
    }

    if (description.length < 8) {
      toast("A Descrição deve ter no mínimo 8 caracteres");
      return;
    }
    if (description.length > 64) {
      toast("A Descrição deve ter no máximo 64 caracteres");
      return;
    }

    const dataObj = {
      title: title,
      description: description,
      step: step,
    };

    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/melvin/tasks",
      {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resposta.status === 201) {
      toast("Foi Enviado");
      setTitle("");
      setDescription("");
      setStep("Para fazer");
      props.quandoEnviaComSucesso();
    } else {
      toast("Erro");
    }
  }

  return (
    <div className="mx-4 my-6 sm:mx-6 md:mx-8">
      <Card>
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: "#6366f1" }}>
          Criar Tarefa
        </h2>
        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Digite o Título da Tarefa"
            className="border-2 rounded-lg p-2 sm:p-3 w-full outline-none text-sm sm:text-base"
            style={{ borderColor: "#c7d2fe" }}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="border-2 rounded-lg p-2 sm:p-3 w-full outline-none resize-none h-20 sm:h-24 text-sm sm:text-base"
            style={{ borderColor: "#c7d2fe" }}
            placeholder="Digite a Descrição da Tarefa"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <div className="flex justify-around gap-2 mt-2 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="step-para-fazer" className="font-medium text-xs sm:text-sm" style={{ color: "#ef4444" }}>
                Para fazer
              </label>
              <input
                type="radio"
                name="step-tarefa"
                id="step-para-fazer"
                className="w-4 h-4 sm:w-5 sm:h-5"
                checked={step === "Para fazer"}
                onChange={() => setStep("Para fazer")}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="step-andamento" className="font-medium text-xs sm:text-sm" style={{ color: "#f59e0b" }}>
                Em andamento
              </label>
              <input
                type="radio"
                name="step-tarefa"
                id="step-andamento"
                className="w-4 h-4 sm:w-5 sm:h-5"
                checked={step === "Em andamento"}
                onChange={() => setStep("Em andamento")}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="step-pronto" className="font-medium text-xs sm:text-sm" style={{ color: "#10b981" }}>
                Pronto
              </label>
              <input
                type="radio"
                name="step-tarefa"
                id="step-pronto"
                className="w-4 h-4 sm:w-5 sm:h-5"
                checked={step === "Pronto"}
                onChange={() => setStep("Pronto")}
              />
            </div>
          </div>
          <button
            onClick={quandoEnvia}
            className="rounded-xl text-white font-bold uppercase text-base sm:text-lg h-10 sm:h-12"
            style={{ backgroundColor: "#6366f1" }}
          >
            Enviar
          </button>
        </div>
      </Card>
    </div>
  );
}