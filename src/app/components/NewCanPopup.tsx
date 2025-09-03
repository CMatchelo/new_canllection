"use client";

import { CloseIcon, SaveIcon } from "@/utils/icons";
import { Button } from "./Button";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { CanType } from "@/types/can";
import { useEffect, useState } from "react";
import Image from "next/image";
import { months, categories } from "@/utils/objectsArray";
import { useCanActions } from "../hooks/useCansActions";
import { useCanContext } from "@/context/CollectionContext";

interface NewCanPopupProps {
  togglePopup: () => void;
  currentCan?: CanType;
}

interface AddCanFormInputs {
  name: string;
  year: string;
  month: string;
  type: string;
}

export const NewCanPopup = ({ togglePopup, currentCan }: NewCanPopupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCanFormInputs>({
    defaultValues: {
      name: currentCan?.name || undefined,
      year: currentCan?.year || undefined,
      month: currentCan?.month || undefined,
      type: currentCan?.type || undefined,
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [noFileMsg, setNoFileMsg] = useState<boolean>(false);
  const { canCollection, setCanCollection } = useCanContext();
  const { addCan, editCan } = useCanActions();

  useEffect(() => {
    if (currentCan) console.log("currentcan: ", currentCan);
    if (currentCan) setPreview(currentCan.imgurl);
  }, [currentCan]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNoFileMsg(false);
      const url = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreview(url);
    } else {
      setNoFileMsg(true);
      setPreview(null);
    }
  };

  const handleAddCan = async (data: AddCanFormInputs) => {
    const newCan: CanType = {
      ...data,
      id: currentCan?.id || crypto.randomUUID(),
      imgurl: currentCan?.imgurl || "",
      userId: currentCan?.userId || "",
    };

    if (!currentCan && !selectedFile) {
      setNoFileMsg(true);
      return;
    }

    if (currentCan) {
      await editCan(newCan)
      setCanCollection(
        canCollection.map((can) => (can.id === currentCan.id ? newCan : can))
      );
    } else {
      if (!selectedFile) return;
      const can = await addCan(newCan, selectedFile);
      if (can) {
        setCanCollection([...canCollection, can]);
      }
    }
    togglePopup();
    setNoFileMsg(false);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-700/60 z-10"></div>
      <form onSubmit={handleSubmit(handleAddCan)}>
        <div
          className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2
     p-4 rounded-2xl flex flex-col gap-3
    bg-gray-100 text-secondary1"
        >
          <h2 className="font-extrabold text-xl self-center">Nova latinha</h2>

          <div className="relative flex flex-col gap-2 mb-2 items-center justify-center self-center w-50">
            {preview && (
              <div className="w-40 h-40 relative rounded-lg overflow-hidden border border-gray-300">
                <Image
                  src={preview}
                  alt="Prévia"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {!currentCan && (
              <div>
                <input
                  id="Imagem"
                  name="Imagem"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="Imagem"
                  className="cursor-pointer bg-highlight1 text-white px-3 py-1 rounded-lg
                 border border-highlight1 hover:bg-highlight1Light transition"
                >
                  Escolher imagem
                </label>
              </div>
            )}
          </div>
          {noFileMsg && <p className="text-red-500">Imagem é obrigatória</p>}

          <Input
            id="Nome"
            {...register("name", { required: "O nome é obrigatório" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Input
            id="Ano"
            type="number"
            {...register("year", { required: "O ano é obrigatório" })}
          />
          {errors.year && <p className="text-red-500">{errors.year.message}</p>}

          <div className="relative flex gap-3 items-center">
            <label className="ml-auto w-[25%]" htmlFor="Mês">
              Mês
            </label>
            <select
              {...register("month", { required: "O mês é obrigatória" })}
              className="border-1 border-highlight1 rounded-lg p-1
      focus:border-highlight1Light bg-gray-200 w-[75%]"
              id="Mês"
            >
              <option value="">-- Selecione --</option>
              {months.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {errors.month && (
            <p className="text-red-500">{errors.month.message}</p>
          )}

          <div className="flex gap-3 items-stretch">
            <label className="ml-auto w-[25%]" htmlFor="type">
              Categoria
            </label>
            <select
              {...register("type", { required: "A categoria é obrigatória" })}
              className="border-1 border-highlight1 rounded-lg p-1
      focus:border-highlight1Light bg-gray-200 w-[75%]"
              id="type"
            >
              <option value="">-- Selecione --</option>
              {categories.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}

          <Button type="submit" className="text-gray-100 flex gap-2 font-bold">
            Salvar
            <SaveIcon size={24} />
          </Button>

          <button
            onClick={() => togglePopup()}
            className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300 cursor-pointer"
          >
            <CloseIcon size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
function deleteCan(currentCan: CanType) {
  throw new Error("Function not implemented.");
}

