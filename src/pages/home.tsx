import Categories from '@/components/Categories';
import LatestMeals from '../components/LatestMeals';
import MainMeals from '../components/MainMeals';

const Home: React.FC = () => {

    return (
        <div className="bg-gray-100 p-4 mt-1">
            <Categories/>
            <LatestMeals/>
            <MainMeals category={'chicken'} lenght={4} />
            <MainMeals category={'beef'} lenght={4} />
            <MainMeals category={'lamb'} lenght={4} />
        </div>
    );
};

export default Home;