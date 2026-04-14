import { useState, useRef } from 'react'
import InputField from './ui/InputField.tsx'
import Button from './ui/Button.tsx'
import ScaleSelect from './ui/ScaleSelect.tsx'
import MarkdownRender from './ui/MarkdownRender.tsx'
import { sendChat, type Message } from '../models/githubModels.ts'

interface ChatPanelProps {
    variant?: "primary" | "secondary";
    selectedMode?: string;
}

const ChatPanel = ({ variant = "primary", selectedMode = "default" }: ChatPanelProps) => {
    const [scaleMode, setScaleMode] = useState("sm");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    const styles = {
        primary: "flex flex-col self-end justify-end items-center bg-gray-900 h-screen w-3/4",
        secondary: "flex flex-col self-end justify-bottom items-center bg-gray-200 h-screen w-3/4",
    }

    const handleSend = async () => {
        const text = inputRef.current?.innerText.trim();
        if (!text || loading) return;

        if (inputRef.current) inputRef.current.innerText = "";

        const updated: Message[] = [...messages, { role: "user", content: text }];
        setMessages(updated);
        setLoading(true);

        try {
            const reply = await sendChat(updated, selectedMode);
            setMessages([...updated, { role: "system", content: reply }]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles[variant]}`}>
            <div className="flex flex-col gap-2 w-4/5 mb-6 max-h-full overflow-y-auto">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`text-sm px-4 py-2 rounded-lg w-fit max-w-3/4 ${msg.role === "user"
                            ? "self-end bg-gray-600 text-white"
                            : "self-start bg-gray-700 text-gray-200"
                            }`}
                    >
                        <MarkdownRender content={msg.content} />
                    </div>
                ))}
                {loading && (
                    <div className="self-start text-gray-400 text-sm px-4">Responding...</div>
                )}
            </div>
            <ScaleSelect size={scaleMode} onSelect={setScaleMode} />
            <InputField ref={inputRef} size={scaleMode} onSubmit={handleSend}>
                <Button size={scaleMode} onClick={handleSend} disabled={loading}>
                    →
                </Button>
            </InputField>
        </div>
    )
}

export default ChatPanel;
