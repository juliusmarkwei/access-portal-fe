import type { Metadata } from "next";
import { Archivo, Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Archivo({
    subsets: ["latin"],
    weight: ["300", "600", "700"],
    fallback: ["Kanit"],
});

export const metadata: Metadata = {
    title: "Access Portal",
    description: "Generate and manage access tokens for your applications.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Toaster position="top-center" reverseOrder={false} />
                {children}
            </body>
        </html>
    );
}
