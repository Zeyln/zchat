import { forwardRef } from 'react'

const InputField = forwardRef<HTMLDivElement, {
    children?: React.ReactNode;
    placeholder?: "prompt" | "password";
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    onSubmit?: () => void;
}>(({ children, placeholder = "prompt", variant = "primary", size = "sm", onSubmit }, ref) => {
    const types = {
        prompt: "write a new prompt...",
        password: "password...",
    };
    const styles = {
        primary: "flex justify-between self-start h-fit w-full bg-black/30 border-2 border-transparent text-white transition-colors hover:border-gray-900",
        secondary: "flex justify-between self-start h-fit w-full bg-gray-300 border-1 border-transparent text-black transition-colors hover:border-gray-400",
    };
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "p-4 text-md",
        lg: "p-4 text-lg",
    };

    return (
        <div className={`${styles[variant]} ${sizes[size]} flex flex-row items-start`}>
            <div
                ref={ref}
                data-placeholder={types[placeholder]}
                contentEditable="true"
                role="textbox"
                aria-multiline="true"
                className="outline-none flex-1 min-w-0 break-words pr-4 font-mono empty:before:content-[attr(data-placeholder)]"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit?.();
                    }
                }}
                onInput={(e) => {
                    const el = e.currentTarget;
                    if (el.innerHTML === "<br>" || el.innerHTML === "") {
                        el.innerHTML = "";
                    }
                }}
            />
            {children}
        </div>
    );
});

export default InputField;
