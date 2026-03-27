import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import ordersRouter from "./orders";
import subscribersRouter from "./subscribers";
import wholesaleRouter from "./wholesale";
import contactRouter from "./contact";
import analyticsRouter from "./analytics";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(subscribersRouter);
router.use(wholesaleRouter);
router.use(contactRouter);
router.use(analyticsRouter);
router.use(adminRouter);

export default router;
