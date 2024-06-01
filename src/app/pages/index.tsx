import Header from '../components/Header';
import MainCard from '../components/MainCard';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <div className='p-4 md:px-8 lg:px-16 xl:px-32'>
        <Header className="px-4 sm:px-8 md:px-12 lg:px-18 xl:px-40" />
        <Navbar className='px-12 sm:px-12 md:px-12 lg:px-18 xl:px-40' />

        {/* News Section */}
        <section className="p-4 bg-white rounded-lg shadow-md">
            {/* News Cards */}
            <section className="p-4 bg-white rounded-lg shadow-md">
          {/* News Cards */}
          <MainCard />
        </section>
        </section>
        </div>
    </div>
  );
};

export default Dashboard;
