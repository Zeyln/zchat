import { useState, useEffect } from 'react';
import ChatPanel from '../components/ChatPanel.tsx';
import ModeSelect from '../components/ui/ModeSelect.tsx';
import { fetchModes } from '../models/githubModels.ts';

interface Mode {
    key: string;
    label: string;
}

const HomePage = ({ variant = "primary" }) => {
    const styles = {
        primary: "flex flex-col justify-center items-center bg-gray-800 h-screen w-screen",
        secondary: "flex flex-col justify-center items-center bg-gray-100 h-screen w-screen",
    }
    const [modes, setModes] = useState<Mode[]>([]);
    const [selectedMode, setSelectedMode] = useState<string>("default");

    useEffect(() => {
        fetchModes().then(setModes);
    }, []);
    return (
        <div className={` flex-row ${styles[variant]}`}>
            <ModeSelect
                modes={modes}
                selected={selectedMode}
                onChange={setSelectedMode}
            />
            <ChatPanel selectedMode={selectedMode} />
        </div>
    );
};

export default HomePage;
