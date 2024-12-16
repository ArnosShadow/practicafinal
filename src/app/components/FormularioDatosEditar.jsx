
import InputFormulariosEditables from "./InputFormulariosEditables";


export default function FormularioDatosEditables({ inputs, values, placeholders, isEditable, onChange }) {
    if (!Array.isArray(inputs) || !Array.isArray(placeholders)) {
        console.error("Los valores de inputs y placeholders deben ser arrays.");
        return null;
    }

    if (inputs.length !== placeholders.length || inputs.length !== values.length) {
        console.error("Inputs, values y placeholders deben tener la misma longitud.");
        return null;
    }

    return (
        <form className="flex flex-row flex-wrap items-end mt-4 space-y-4 space-x-2">
            {inputs.map((input, index) => (
                <InputFormulariosEditables
                    key={`${input}-${index}`}
                    label={input}
                    value={values[index]}
                    placeholder={placeholders[index]}
                    isEditable={isEditable}
                    onChange={(field, value) => onChange(field, value)}
                />
            ))}
        </form>
    );
}
