export default async function VetLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>VETERINARIOS TITULO</h1>
            {children}
        </div>
    )
}