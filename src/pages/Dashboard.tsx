import { CalendarTemplate } from '../components/CalendarTemplate';
import { Header } from '../components/Header';

export const Dashboard = () => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <Header />
      <div className="flex flex-col justify-center min-h-[90vh]  gap-10 ">
        <div className="flex items-center justify-between mx-auto min-w-2xl mt-[80px]">
          <p className="text-6xl font-bold">
            Welcome, <span className="text-green-500">Diego</span>
          </p>
          <div className="flex items-center gap-4 pr-2">
            <p className="flex items-center justify-center w-10 h-10 p-2 text-2xl rounded-full cursor-pointer bg-black/5 hover:bg-black/15">
              ⚙️
            </p>
            <p className="flex items-center justify-center w-10 h-10 text-2xl text-blue-400 rounded-full cursor-pointer bg-black/5 hover:bg-black/15">
              ↓
            </p>
          </div>
        </div>
        <CalendarTemplate />
      </div>
    </div>
  );
};
