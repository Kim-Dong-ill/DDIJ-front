import React from "react";
import NeuterButton from "./NeuterButton";
import VaccineButton from "./VaccineButton";
import RabiesButton from "./RabiesButton";

function RegisterPetVC({
  register,
  neuter,
  vaccine,
  rabies,
  handleNeuter,
  handleVaccine,
  handleRabies,
  handleChange,
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="mb-2">중성화</div>
        <NeuterButton
          handleChange={handleChange}
          register={register}
          neuter={neuter}
          handleNeuter={handleNeuter}
        />
      </div>
      <div className="mb-6">
        <div className="mb-2">기본 접종</div>
        <VaccineButton
          handleChange={handleChange}
          register={register}
          vaccine={vaccine}
          handleVaccine={handleVaccine}
        />
      </div>
      <div className="mb-6">
        <div className="mb-2">광견병</div>
        <RabiesButton
          handleChange={handleChange}
          register={register}
          handleRabies={handleRabies}
          rabies={rabies}
        />
      </div>
    </div>
  );
}

export default RegisterPetVC;
