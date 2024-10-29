const { CoSoSanXuatDB } = require("../../models/CoSoSanXuat")

const createCoSoSanXuat = async (req, res) => {
    try {
        const { tencoso, diachi, sdt, email, matk } = req.body;

        const maxMaqt = await CoSoSanXuatDB.findOne().sort('-macoso');
        const newMaqt = maxMaqt ? maxMaqt.macoso + 1 : 1;

        const newCoSoSanXuat = new CoSoSanXuatDB({
            macoso: newMaqt,
            tencoso,
            diachi,
            sdt,
            email,
            matk
        });

        await newCoSoSanXuat.save();

        res.status(201).json({ success: true, message: "Cơ sở sản xuất đã được tạo thành công!", CoSoSanXuat: newCoSoSanXuat });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi tạo Cơ sở sản xuất.", error: error.message });
    }
};

const getCoSoSanXuat = async (req, res) => {
    try {
        const { matk } = req.query;
        const CoSoSanXuats = await CoSoSanXuatDB.find({ matk });
        res.status(200).json({ success: true, data: CoSoSanXuats });

    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi lấy danh sách quy trình.", error: error.message });
    }
};

module.exports = {
    createCoSoSanXuat,
    getCoSoSanXuat
}