import ChatInput from "./components/SearchFund";
import AuthButton from "./components/AuthButton";
import { ModeToggle } from "./components/DarkMode";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center lg:p-4 sm:p-1">
      <div className="w-full max-w-3xl px-4">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-2 ">
          <h1 className="lg:text-2xl text-xl font-bold text-primary">Next Fund</h1>
          <div className="flex gap-2 items-center ">
            <ModeToggle />
            <AuthButton />
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-2 lg:space-y-6">
          <div>
            <h2 className="font-extrabold text-2xl lg:text-4xl text-primary">Find the Right Match</h2>
            <p className="text-muted-foreground text-sm lg:text-lg lg:mt-2">
              Connect with the ideal investors and mentors tailored to your industry and goals.
            </p>
          </div>
          <div className="w-full max-w-lg">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
}