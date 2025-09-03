"use client";

import { CanType } from "@/types/can";
import Image from "next/image";
import { Button } from "./Button";
import { DeleteIcon, UpdateIcon } from "@/utils/icons";
import { useCanActions } from "../hooks/useCansActions";
import { useCanContext } from "@/context/CollectionContext";

interface CanCardProps {
  can: CanType;
  togglePopup: (...args: unknown[]) => void;
}

export const CanCard = ({ can, togglePopup }: CanCardProps) => {
  const { deleteCan } = useCanActions();
  const { canCollection, setCanCollection } = useCanContext();

  const submitDelete = async () => {
    try {
      await deleteCan(can.id || "", can.imgurl);
      setCanCollection(canCollection.filter((item) => item.id !== can.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 border-1 border-highlight2 rounded-lg shadow-lg">
      <div className="relative w-full aspect-square rounded overflow-hidden shadow">
        {can.imgurl && (
          <Image
            alt={`Imagem da ${can.name}`}
            src={can.imgurl}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="flex flex-col mt-4">
        <span className="text-xl font-bold">{can.name}</span>
        <span className="text-md">{can.type}</span>
        <span className="text-md">
          {can.month}/{can.year}
        </span>
        <div className="flex flex-row gap-2 mt-4">
          <Button onSubmit={() => togglePopup()} className="flex-1">
            <UpdateIcon size={18} />
          </Button>
          <Button
            onSubmit={submitDelete}
            className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-center flex-1"
          >
            <DeleteIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
