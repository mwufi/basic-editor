
function BackgroundImageHeader({ children, height }: { children: React.ReactNode, height: string }) {
    return (
        <div className={`bg-cover bg-center ${height}`} style={{ backgroundImage: "url('https://picsum.photos/1200/400')" }}>
            <div className="bg-gradient-to-t from-black/70 to-transparent h-full">
                {children}
            </div>
        </div>
    )
}

export default BackgroundImageHeader