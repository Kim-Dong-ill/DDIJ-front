import React from "react";
import NeuterButton from "./NeuterButton";
import VaccineButton from "./VaccineButton";
import RabiesButton from "./RabiesButton";

function RegisterPetVC({
  neuter,
  vaccine,
  rabies,
  handleNeuter,
  handleVaccine,
  handleRabies,
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="mb-2">중성화</div>
        <NeuterButton neuter={neuter} handleNeuter={handleNeuter} />
      </div>
      <div className="mb-6">
        <div className="mb-2">기본 접종</div>
        <VaccineButton vaccine={vaccine} handleVaccine={handleVaccine} />
      </div>
      <div className="mb-6">
        <div className="mb-2">광견병</div>
        <RabiesButton handleRabies={handleRabies} rabies={rabies} />
      </div>
    </div>
  );
}

export default RegisterPetVC;
