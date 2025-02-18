// routes/orderRoutes.js
import express from "express";
import { createOrder ,getOrders, getOrdersforadmin,acceptOrder,rejectOrder,total_orders, pendingOrders,total_income,top_products} from "../controller/orderController.js";
import  authenticate  from "../middleware/authMiddleware.js";
import { authenticateAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Route for creating an order
router.post('/create', authenticate, createOrder);
router.get('/list', authenticate, getOrders);
router.get('/listadmin', authenticateAdmin, getOrdersforadmin)

router.put('/accept/:orderId', authenticateAdmin, acceptOrder);
router.put('/reject/:orderId', authenticateAdmin, rejectOrder);
router.get('/total_order',authenticateAdmin,total_orders)
router.get('/total_income',authenticateAdmin,total_income)

router.get('/pendingcount',authenticateAdmin,pendingOrders)
router.get('/top-products',authenticateAdmin,top_products)



export default router;
