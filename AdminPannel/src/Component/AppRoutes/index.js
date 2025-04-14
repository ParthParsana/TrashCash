import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Users from '../../Pages/Users';
import Orders from '../../Pages/Orders';
import TrashPrices from '../../Pages/TrashPrices';
import Reviews from '../../Pages/Reviews';
import AddTrash from '../../Pages/AddTrash';
import UpdateTrash from '../../Pages/UpdateTrash';
import Tbb from '../../Pages/Tbb';
function AppRoutes() {
    return (
        <Routes>       
            <Route path="/" element={<Dashboard />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/TrashPrices" element={<TrashPrices />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/AddTrash" element={<AddTrash />} />
            <Route path="/UpdateTrash/:id" element={<UpdateTrash />} />
            <Route path="/Tbb" element={<Tbb />} />
        </Routes>
    );
}
export default AppRoutes;