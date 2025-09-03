"use client";

import { useCanContext } from "@/context/CollectionContext";
import { CanCard } from "./CanCard";
import { NewCanPopup } from "./NewCanPopup";
import { useState } from "react";
import { Button } from "./Button";
import { CanType } from "@/types/can";
import { Input } from "./Input";

export const CanTable = () => {
  const { canCollection } = useCanContext();
  const [displayPopup, setDisplayPopup] = useState(false);
  const [currentCan, setCurrentCan] = useState<CanType | undefined>();
  const [searchText, setSearchText] = useState("");

  const togglePopup = (can?: CanType) => {
    if (can) setCurrentCan(can);
    else setCurrentCan(undefined);
    setDisplayPopup(!displayPopup);
  };

  const filteredCans = canCollection.filter((can) =>
    can.name.toLowerCase().includes(searchText.toLowerCase()) ||
    can.type.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 m-5 rounded-xl shadow-2xl pt-8 bg-secondary1 ">
      <Button className="mb-5" onSubmit={() => togglePopup()}>
        Cadastrar nova
      </Button>
      <div className="mb-5 w-full">
        <Input
          classname="w-full text-highlight2Dark px-3"
          placeholder="Buscar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <span>Exibindo {filteredCans.length} latinhas</span>
      </div>
      {displayPopup && (
        <NewCanPopup
          currentCan={currentCan}
          togglePopup={() => togglePopup()}
        />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCans.map((can, index) => (
          <CanCard togglePopup={() => togglePopup(can)} key={index} can={can} />
        ))}
        {filteredCans.map((can, index) => (
          <CanCard togglePopup={() => togglePopup(can)} key={index} can={can} />
        ))}
        {filteredCans.map((can, index) => (
          <CanCard togglePopup={() => togglePopup(can)} key={index} can={can} />
        ))}
      </div>
    </div>
  );
};
