import ChatPanel from '../components/ChatPanel.tsx'

const HomePage = ({ variant = "primary" }) => {
    const styles = {
        primary: "flex flex-col justify-center items-center bg-gray-800 h-screen w-screen",
        secondary: "flex flex-col justify-center items-center bg-gray-100 h-screen w-screen",
    }
    return (
        <div className={`${styles[variant]}`}>
            <ChatPanel />
        </div>
    )
}

export default HomePage;
