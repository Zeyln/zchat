const Button = ({ children, variant = "primary", size = "sm", ...props }) => {
    const styles = {
        primary: "flex justify-center items-center bg-gray-500 border-1 rounded-full text-white w-1 h-1 hover:bg-gray-400",
        secondary: "flex justify-center items-center bg-gray-300 border-1 rounded-full text-black w-1 h-1 hover:bg-gray-400",
    };
    const sizes = {
        sm: "p-4 text-sm",
        md: "p-6",
        lg: "p-8 text-lg",
    };
    return (
        <button className={`${styles[variant]} ${sizes[size]}`} {...props}>
            {children}
        </button>
    )
}

export default Button;
