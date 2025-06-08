// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Import components
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ManagementEmployee from './pages/management_exployee';
import AdminLayout from './components/AdminLayout';
import ProductInfo from './components/ProductInfo';
import ProductCategoryList from './components/ProductCategoryList';
import Ordering from './components/Ordering';
import ProductCategories from './components/ProductCategories';
import UserDashboard from './components/UserDashboard';
import UserLayout from './components/UserLayout';
import UserProductCategoryList from './components/UserProductCategoryList';
import UserProductInfo from './components/UserProductInfo'
import ManageSupplierInfo from './pages/Manage_supplier_Info';
import Manage_product_Info from './pages/Manage_product_Info';
import Manage_product_brand_Info from './pages/Manage_product_brand_Info';
import Management_product_category from './pages/Management_product_category';
import ManagementPurchase from './pages/ManagementPurchase';
import WithdrawalRequest from './components/WithdrawalRequest';
import EmployeeReport from './pages/Employee_report';


// Import Cart Context
import { CartProvider } from './context/CartContext';
import { PurchaseProvider } from './context/PurchaseContext';

// Import Cart Component (ຖ້າມີ)
// import Cart from './components/Cart';
import Cart from './pages/Cart';


// Approde 
import AdminRequestApproval from './components/AdminRequestApproval';
import UserRequestStatus from './components/UserRequestStatus';
import { authService } from './api';

const App = () => {
	return (
		<PurchaseProvider>
		<CartProvider>
			<Router>
				<CssBaseline />
				<Routes>
					{/* ໜ້າ Login ເປັນເສັ້ນທາງເລີ່ມຕົ້ນ */}
					<Route path="/" element={<Login />} />

					{/* ເພີ່ມເສັ້ນທາງສຳລັບໜ້າລົງທະບຽນ */}
					<Route path="/register" element={<Register />} />

					{/* ເສັ້ນທາງສຳລັບໜ້າກະຕ່າ */}
					<Route
						path="/cart"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<Cart />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງສຳລັບໜ້າຫຼັກ Admin Dashboard */}
					<Route
						path="/dashboard"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<AdminDashboard />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງໃຫ້ "/admin" ໄປຍັງ dashboard ເພື່ອຄວາມສະດວກ */}
					<Route
						path="/admin"
						element={
							<RequireAuth requiredRole="admin">
								<Navigate to="/dashboard" replace />
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງສຳລັບການຈັດການຂໍ້ມູນພະນັກງານ - ສະແດງພາຍໃນ AdminLayout */}
					<Route
						path="/management_employee"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<ManagementEmployee />
								</AdminLayout>
							</RequireAuth>
						}
					/>
					{/* ເສັ້ນທາງສຳລັບການຈັດການຂໍ້ມູນພະນັກງານ - ສະແດງພາຍໃນ AdminLayout */}
					<Route
						path="/management_supplier"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<ManageSupplierInfo />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງສຳລັບລາຍການປະເພດສິນຄ້າ (ສອດຄ່ອງກັບ NAVIGATION ໃນ AdminDashboard) */}
					<Route
						path="/productslist"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<ProductCategoryList />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງສຳລັບຂໍ້ມູນສິນຄ້າ (ສອດຄ່ອງກັບ NAVIGATION ໃນ AdminDashboard) */}
					<Route
						path="/productdata"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<ProductInfo />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງການຈັດການອື່ນໆ ຕາມທີ່ລະບຸໃນ REPORTS_SECTION */}
					<Route
						path="/management_product"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<Manage_product_Info />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					<Route
						path="/management_product_category"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<Management_product_category />
								</AdminLayout>
							</RequireAuth>
						}
					/>
					<Route
						path="/management_product_brand"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<Manage_product_brand_Info />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					<Route
						path="/management_purchase"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<ManagementPurchase />
								</AdminLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງສຳລັບລາຍງານ */}
					<Route
						path="/report_employee"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<EmployeeReport/>
								</AdminLayout>
							</RequireAuth>
						}
					/>

					<Route
						path="/report_product"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<div>ລາຍງານຂໍ້ມູນສິນຄ້າ - ຍັງຢູ່ໃນຂັ້ນຕອນການພັດທະນາ</div>
								</AdminLayout>
							</RequireAuth>
						}
					/>

					<Route
						path="/report_product_category"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<div>ລາຍງານຂໍ້ມູນປະເພດສິນຄ້າ - ຍັງຢູ່ໃນຂັ້ນຕອນການພັດທະນາ</div>
								</AdminLayout>
							</RequireAuth>
						}
					/>

					<Route
						path="/report_supplier"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<div>ລາຍງານຂໍ້ມູນຜູ້ສະໜອງ - ຍັງຢູ່ໃນຂັ້ນຕອນການພັດທະນາ</div>
								</AdminLayout>
							</RequireAuth>
						}
					/>

					<Route
						path="/report_purchase"
						element={
							<RequireAuth requiredRole="admin">
								<AdminLayout>
									<div>ລາຍງານຂໍ້ມູນການຊື້ສິນຄ້າ - ຍັງຢູ່ໃນຂັ້ນຕອນການພັດທະນາ</div>
								</AdminLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງສຳລັບຜູ້ໃຊ້ທົ່ວໄປ */}
					{/* ໜ້າຫຼັກສຳລັບ user */}
					<Route
						path="/user"
						element={
							<RequireAuth requiredRole="user">
								<Navigate to="/user/dashboard" replace />
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງໜ້າຫຼັກ user dashboard */}
					<Route
						path="/user/dashboard"
						element={
							<RequireAuth requiredRole="user">
								<UserLayout>
									<UserDashboard />
								</UserLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງລາຍການປະເພດສິນຄ້າສຳລັບ user */}
					<Route
						path="/user/productslist"
						element={
							<RequireAuth requiredRole="user">
								<UserLayout>
									<UserProductCategoryList />
								</UserLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງຂໍ້ມູນສິນຄ້າສຳລັບ user */}
					<Route
						path="/user/productdata"
						element={
							<RequireAuth requiredRole="user">
								<UserLayout>
									<UserProductInfo />
								</UserLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງລາຍການຂໍເບີກສິນຄ້າສຳລັບ user */}
					<Route
						path="/user/withdrawal"
						element={
							<RequireAuth requiredRole="user">
								<UserLayout>
									<WithdrawalRequest />
								</UserLayout>
							</RequireAuth>
						}
					/>

					{/* ເສັ້ນທາງທີ່ບໍ່ມີ, ໃຫ້ກັບໄປໜ້າເລີ່ມຕົ້ນ */}
					<Route path="*" element={<Navigate to="/" replace />} />
						<Route
							path="/admin/requests"
							element={
								<RequireAuth requiredRole="admin">
									<AdminLayout>
										<AdminRequestApproval />
									</AdminLayout>
								</RequireAuth>
							}
						/>


						{/* ເສັ້ນທາງສຳລັບການສັ່ງຊື້ (ສອດຄ່ອງກັບ NAVIGATION ໃນ AdminDashboard) */}
						<Route
							path="/orders"
							element={
								<RequireAuth requiredRole="admin">
									<AdminLayout>
										<AdminRequestApproval/>
									</AdminLayout>
								</RequireAuth>
							}
						/>
						<Route
							path="/user/requests"
							element={
								<RequireAuth requiredRole="user">
									<UserLayout>
										<UserRequestStatus />
									</UserLayout>
								</RequireAuth>
							}
						/>
				</Routes>
			</Router>
		</CartProvider>
		</PurchaseProvider>
	);
};

// ຄອມໂພເນັນສຳລັບກວດສອບການພິສູດຕົວຕົນ
const RequireAuth = ({ children, requiredRole }) => {
	const isAuthenticated = authService.isAuthenticated();
	const userRole = authService.getUserRole();

	if (!isAuthenticated) {
		// ຖ້າບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ, ກັບໄປໜ້າ login
		return <Navigate to="/" replace />;
	}

	if (requiredRole && userRole !== requiredRole) {
		// ຖ້າຕ້ອງການບົດບາດສະເພາະແຕ່ຜູ້ໃຊ້ບໍ່ມີບົດບາດນັ້ນ
		if (userRole === 'admin' && requiredRole === 'user') {
			// ຖ້າແມ່ນ admin ແຕ່ພະຍາຍາມເຂົ້າໜ້າຂອງ user
			return <Navigate to="/dashboard" replace />;
		}

		if (userRole === 'user' && requiredRole === 'admin') {
			// ຖ້າແມ່ນ user ແຕ່ພະຍາຍາມເຂົ້າໜ້າຂອງ admin
			return <Navigate to="/user" replace />;
		}
	}

	// ຖ້າຜ່ານການກວດສອບທັງໝົດ, ສະແດງຄອມໂພເນັນທີ່ຕ້ອງການ
	return children;
};

export default App;
