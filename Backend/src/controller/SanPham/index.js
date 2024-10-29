const { sanphamDB } = require("../../models/SanPham")

const createSanPham = async (req, res) => {
    try {
        const { tensp, motasp, maqt, macoso, matk } = req.body;

        const maxMaqt = await sanphamDB.findOne().sort('-masp');
        const newMaqt = maxMaqt ? maxMaqt.masp + 1 : 1;

        const newSanPham = new sanphamDB({
            masp: newMaqt,
            tensp,
            motasp,
            maqt,   
            macoso,
            matk
        });

        await newSanPham.save();

        res.status(201).json({ success: true, message: "Sản phẩm đã được tạo thành công!", SanPham: newSanPham });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi tạo quy trình.", error: error.message });
    }
};

const getSanPham = async (req, res) => {
    try {
        const { matk } = req.query;
        const SanPhams = await sanphamDB.find({ matk });
        res.status(200).json({ success: true, data: SanPhams });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi lấy danh sách san phẩm.", error: error.message });
    }
};

const deleteSanPham = async (req, res) => {
    try {
        const { masp } = req.params;  
        const deletedSanPham = await sanphamDB.findOneAndDelete({ masp });

        if (!deletedSanPham) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại!" });
        }

        res.status(200).json({ success: true, message: "Sản phẩm đã được xóa thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi xóa sản phẩm.", error: error.message });
    }
};

module.exports = {
    createSanPham,
    getSanPham,
    deleteSanPham
};