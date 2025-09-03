"use client";

import { useCanContext } from "@/context/CollectionContext";
import { CanCard } from "./CanCard";
import { NewCanPopup } from "./NewCanPopup";
import { useState } from "react";
import { Button } from "./Button";
import { CanType } from "@/types/can";

export const CanTable = () => {
  const { canCollection } = useCanContext();
  const [displayPopup, setDisplayPopup] = useState(false);
  const [currentCan, setCurrentCan] = useState<CanType | undefined>();

  const togglePopup = (can?: CanType) => {
    if (can) setCurrentCan(can)
    else setCurrentCan(undefined)
    setDisplayPopup(!displayPopup);
  }

  return (
    <div className="p-4 m-5 rounded-xl shadow-2xl pt-8 bg-secondary1 ">
      <div className="flex flex-row items-center
      gap-4 mb-5">
        <Button onSubmit={() => togglePopup()}>
          Cadastrar nova
        </Button>
        <span>
          Exibindo {canCollection.length} latinhas
        </span>
      </div>
      {displayPopup && <NewCanPopup editCan={currentCan} togglePopup={() => togglePopup()} />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {canCollection.map((can, index) => (
          <CanCard togglePopup={() => togglePopup(can)} key={index} can={can} />
        ))}
        {canCollection.map((can, index) => (
          <CanCard togglePopup={() => togglePopup(can)} key={index} can={can} />
        ))}
        {canCollection.map((can, index) => (
          <CanCard togglePopup={() => togglePopup(can)} key={index} can={can} />
        ))}
      </div>
    </div>
  );
};
