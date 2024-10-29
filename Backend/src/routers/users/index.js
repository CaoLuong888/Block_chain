const express = require('express');
const { register, login } = require('../../controller/tai_khoan');
const { createQuytrinh, getQuytrinhs, deleteQuytrinh } = require('../../controller/quy_trinh');
const { createCoSoSanXuat, getCoSoSanXuat } = require('../../controller/CoSoSanXuat');
const { createSanPham, getSanPham, deleteSanPham  } = require('../../controller/SanPham');



const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/createQuytrinh", createQuytrinh);
router.get("/quytrinhs", getQuytrinhs);
router.delete("/quytrinhs/:maqt", deleteQuytrinh);

router.post("/createCoSoSanXuat", createCoSoSanXuat);
router.get("/CoSoSanXuats", getCoSoSanXuat);

router.post("/createSanPham", createSanPham);
router.get("/SanPhams", getSanPham);
router.delete("/SanPhams/:masp", deleteSanPham); 


module.exports = router;