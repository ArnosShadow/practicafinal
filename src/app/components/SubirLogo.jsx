import React, { useState } from "react";
import { patchSubirLogo } from "../utils";

export default function SubirLogoCliente({ idCliente }) {
  const [previewLogo, setPreviewLogo] = useState(null); 

  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewLogo(reader.result);
      reader.readAsDataURL(file);

      setSubiendo(true);
      try {
        await patchSubirLogo(idCliente, file);
        alert("Logo subido con éxito");
      } catch (error) {
        alert("Error al subir el logo");
      } finally {
        setSubiendo(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-bold">Logo Cliente</h2>

      <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
        {previewLogo ? (
          <img src={previewLogo} alt="Logo Preview" className="h-full w-full object-cover" />
        ) : (
          <label className="cursor-pointer text-gray-400">
            <span>Subir Logo</span>
            <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
          </label>
        )}
      </div>

      {subiendo && <p className="text-blue-600">Subiendo...</p>}
    </div>
  );
}
