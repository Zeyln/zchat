import { useState } from 'react'
import InputField from './ui/InputField.tsx'
import Button from './ui/Button.tsx'
import ScaleSelect from './ui/ScaleSelect.tsx'

const ChatPanel = ({ variant = "primary" }) => {
    const [scaleMode, setScaleMode] = useState("sm");
    const styles = {
        primary: "flex flex-col justify-center items-center bg-gray-900 h-screen w-1/2",
        secondary: "flex flex-col justify-center items-center bg-gray-200 h-screen w-1/2",
    }

    return (
        <div className={`${styles[variant]}`}>
            <ScaleSelect size={scaleMode} onSelect={setScaleMode} />
            <InputField size={scaleMode}>
                <Button size={scaleMode}>
                    →
                </Button>
            </InputField>
        </div>
    )
}

export default ChatPanel;
