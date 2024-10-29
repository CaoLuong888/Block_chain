const { taikhoanDB } = require("../../models/Tai_khoan")

const VALID_ROLES = ['Admin', 'Người dùng', 'Doanh nghiệp',  ];

const register = async (req, res) => {
    const { taikhoan, matkhau, email, vaitro, tendonvi, sdtdonvi, diachi, website } = req.body; 

    // Validate role
    if (!VALID_ROLES.includes(vaitro)) {
        return res.status(400).json({ success: false, message: "Vai trò không hợp lệ!" });
    }

    // Check for existing username
    const existingUser = await taikhoanDB.findOne({ taikhoan });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Tài khoản đã tồn tại!" });
    }

    // Check for existing email
    const existingEmail = await taikhoanDB.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ success: false, message: "Email đã được sử dụng!" });
    }

    const latestUser = await taikhoanDB.findOne().sort({ matk: -1 });  
    const newMatk = latestUser ? latestUser.matk + 1 : 1;  

    const newUser = {
        matk: newMatk,   
        taikhoan,
        matkhau,
        email,
        vaitro
    };

    if (vaitro !== 'Người dùng') {
        if (!tendonvi || !sdtdonvi || !diachi ) {
            return res.status(400).json({ success: false, message: "Vui lòng điền đầy đủ thông tin." });
        }
        newUser.tendonvi = tendonvi;
        newUser.sdtdonvi = sdtdonvi;
        newUser.diachi = diachi;
        newUser.website = website;
    }

    try {
        await taikhoanDB.create(newUser);
        return res.status(201).json({ success: true, message: "Đăng ký thành công!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi đăng ký.", error: error.message });
    }
};


const login = async (req, res) => {
    const { taikhoan, matkhau } = req.body;

    const user = await taikhoanDB.findOne({ taikhoan });
    if (!user) {
        return res.status(400).json({ success: false, message: "Tài khoản không tồn tại!" });
    }

    const isMatch = matkhau === user.matkhau;
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Mật khẩu không đúng!" });
    }

    return res.status(200).json({ 
        success: true,
        message: "Đăng nhập thành công!",
        user: {
            taikhoan: user.taikhoan,
            email: user.email,
            vaitro: user.vaitro,
            matk: user.matk 
        }
    });
};

module.exports = {
    register,
    login
}