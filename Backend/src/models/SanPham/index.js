const mongoose = require("mongoose");

const SanPhamSchema = new mongoose.Schema(
    {
        masp: { type: Number, required: true, unique: true },  
        tensp: { type: String, required: true, unique: true },
        motasp: { type: String, required: true },
        maqt: { type: String, required: true },
        macoso: { type: String, required: true },
        matk: { type: String, required: true },
    }, 
    { timestamps: true }
);

const sanphamDB = mongoose.model("sanpham", SanPhamSchema);
module.exports = { sanphamDB };
 