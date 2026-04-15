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
        primary: "flex flex-col self-end justify-end items-start bg-gradient-to-t from-slate-500 to-gray-900 h-screen w-3/4",
        secondary: "flex flex-col self-end justify-end items-start bg-gray-200 h-screen w-3/4",
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
            <div className="flex flex-col self-start w-full max-h-full overflow-y-auto">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`text-sm px-4 py-2 w-full ${msg.role === "user"
                            ? "self-start font-mono bg-[linear-gradient(to_right,_#7f1d1d_0%,_transparent_75%)] border-l-10 border-red-400 text-white"
                            : "self-start font-mono bg-[linear-gradient(to_right,_#111827_0%,_transparent_75%)] border-l-10 border-blue-400 text-gray-200"
                            }`}
                    >
                        <div className="flex flex-row">
                            <p>&nbsp;</p>
                            <MarkdownRender content={msg.content} />
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="self-start text-gray-400 text-sm px-4 w-full bg-[linear-gradient(to_right,_#ffffff_0%,_transparent_75%)] animate-pulse">Responding...</div>
                )}
            </div>

            <InputField ref={inputRef} size={scaleMode} onSubmit={handleSend}>
                <Button onClick={handleSend} disabled={loading}>
                    →
                </Button>
                <ScaleSelect className="flex flex-row static" size={scaleMode} onSelect={setScaleMode} />
            </InputField>
        </div>
    )
}

export default ChatPanel;
