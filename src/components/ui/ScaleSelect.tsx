import Button from './Button.tsx'

const ScaleSelect = ({ onSelect, variant = "primary", size = "sm", ...props }) => {
    const styles = {
        primary: "flex flex-row border-1 border-gray-500 rounded-t-lg bg-gray-600",
        secondary: "flex flex-row bg-gray-300",
    }
    const sizes = {
        sm: "p-2 rounded-t-lg",
        md: "p-4 rounded-t-xl",
        lg: "p-6 rounded-t-xl",
    }
    return (
        <div className={`${styles[variant]} ${sizes[size]}`} {...props}>
            <Button onClick={() => onSelect?.("sm")}>S</Button>
            <Button onClick={() => onSelect?.("md")}>M</Button>
            <Button onClick={() => onSelect?.("lg")}>L</Button>
        </div>
    )
}

export default ScaleSelect;
