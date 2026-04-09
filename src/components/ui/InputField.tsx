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
        primary: "flex justify-between h-fit bg-gray-500 border-1 border-transparent text-white hover:border-gray-400",
        secondary: "flex justify-between h-fit bg-gray-300 border-1 border-transparent text-black hover:border-gray-400",
    };
    const sizes = {
        sm: "p-4 rounded-lg w-1/2 text-md",
        md: "p-6 rounded-xl w-3/4 text-lg",
        lg: "p-8 rounded-xl w-4/5 text-xl",
    };

    return (
        <div className={`${styles[variant]} ${sizes[size]} flex flex-row items-start`}>
            <div
                ref={ref}
                data-placeholder={types[placeholder]}
                contentEditable="true"
                role="textbox"
                aria-multiline="true"
                className="outline-none flex-1 min-w-0 break-words pr-4 font-serif empty:before:content-[attr(data-placeholder)]"
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
