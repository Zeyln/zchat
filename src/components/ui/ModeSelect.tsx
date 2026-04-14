
interface Mode {
    key: string;
    label: string;
}

interface ModeSelectProps {
    modes: Mode[];
    selected: string;
    onChange: (key: string) => void;
}

const ModeSelect = ({ modes, selected, onChange }: ModeSelectProps) => {
    return (
        <div className="flex flex-col self-start gap-2 mr-2 w-1/4">
            {modes.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={`px-6 py-4 rounded-lg text-start justify-top text-md transition-colors transition-transform hover:scale-98
                        ${selected === key
                            ? "bg-rose-600 text-white font-bold italic scale-98"
                            : "bg-gray-500 text-gray-900 hover:bg-natural-400"
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default ModeSelect;
