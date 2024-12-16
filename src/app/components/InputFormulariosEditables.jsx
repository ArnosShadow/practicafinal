export default function InputFormulariosEditables({ label, value, placeholder, isEditable, onChange }) {
    return (
        <div className="space-y-2">
            <label className="block font-semibold text-gray-700">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(label, e.target.value)}
                placeholder={placeholder}
                disabled={!isEditable}
                className={`w-full px-4 py-2 border rounded-lg ${
                    isEditable ? "bg-white" : "bg-gray-200 cursor-not-allowed"
                }`}
            />
        </div>
    );
}
