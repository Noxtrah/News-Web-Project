import Header from '../components/Header';
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* News Card */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-2">News Title</h2>
                <p className="text-gray-600">News Description</p>
                {/* Add more details as needed */}
            </div>
            {/* Add more news cards as needed */}
            </div>
        </section>
        </div>
    </div>
  );
};

export default Dashboard;
