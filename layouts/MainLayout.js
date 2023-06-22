export const MainLayout = ({ children, ...props }) => {
    return (
        <div className="h-screen w-full p-2 md:p-5">
            {children}
        </div>
    )
}