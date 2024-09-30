import SideBar from "@/components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen md:flex-row md:overflow-hidden">
        <SideBar/>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    );
}