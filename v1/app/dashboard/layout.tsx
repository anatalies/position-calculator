import SideBar from "@/components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex md:flex-row md:overflow-hidden">
        <SideBar/>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-main-50">{children}</div>
      </div>
    )
}