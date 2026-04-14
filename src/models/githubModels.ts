export async function sendChat(
    messages: { role: string; content: string }[],
    modeKey: string = "default"
) {
    const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, modeKey }),
    });

    const data = await res.json();
    return data.reply;
}

export async function fetchModes(): Promise<{ key: string; label: string }[]> {
    const res = await fetch("http://localhost:3001/modes");
    return res.json();
}
