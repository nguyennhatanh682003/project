$(window).ready(function () {
    const taikhoan = localStorage.getItem("tkDangnhap")
    if (taikhoan != null) {
        $("#dkdn").hide()
        $("#divTaikhoan").show()

        const ttTaikhoan = JSON.parse(taikhoan)
        let hoten = ttTaikhoan.hoTen.split(" ")
        let ten = hoten[hoten.length - 1]
        let kytuDauCuaTen = ten[0]
        $("#taikhoan").text(kytuDauCuaTen.toUpperCase())
        $("#tenDangnhap").text(ttTaikhoan.ten_dangnhap)
        $("#hoten").text(ttTaikhoan.hoTen)
        $("#sdt").text(ttTaikhoan.dienThoai)
        let star = ""
        for (let i = 0; i < ttTaikhoan.matKhau.length; i++) {
            star += "*"
        }
        $("#matkhau").text(star)
        if (ttTaikhoan.ngaySinh != "") {
            let ngaysinh = ttTaikhoan.ngaySinh.split("-")
            ngaysinh = ngaysinh[2] + "/" + ngaysinh[1] + "/" + ngaysinh[0]
            $("#info").append("<li><b>Ngày sinh: </b>" + ngaysinh + "</li>")
        }
        if (ttTaikhoan.gioiTinh != "") {
            $("#info").append("<li><b>Giới tính: </b>" + ttTaikhoan.gioiTinh + "</li>")
        }
        if (ttTaikhoan.email != "") {
            $("#info").append("<li><b>Email: </b>" + ttTaikhoan.email + "</li>")
        }
        if (ttTaikhoan.diaChi != "") {
            $("#info").append("<li><b>Địa chỉ: </b>" + ttTaikhoan.diaChi + "</li>")
        }

        let click = 0
        $("#taikhoan").click(function () {
            click++
            if (click % 2 !== 0) {
                $("#ttTaikhoan").css("display", "block")
            } else {
                $("#ttTaikhoan").css("display", "none")
                $("#passEye>img").attr("src", "../img/closePassEye.png")
                $("#matkhau").text(star)
                click = 0
                click2 = 0
            }
        })

        $("main").click(function () {
            $("#ttTaikhoan").css("display", "none")
            $("#passEye>img").attr("src", "../img/closePassEye.png")
            $("#matkhau").text(star)
            click = 0
            click2 = 0
        })

        let click2 = 0
        $("#passEye").click(function () {
            click2++
            if (click2 % 2 !== 0) {
                $("#passEye>img").attr("src", "../img/openPassEye.png")
                $("#matkhau").text(ttTaikhoan.matKhau)
            } else {
                $("#passEye>img").attr("src", "../img/closePassEye.png")
                $("#matkhau").text(star)
                click2 = 0
            }
        })
        $("#dangXuat").click(function () {
            const xacthucDangxuat = confirm("Bạn chắc chắn muốn đăng xuất tài khoản?")
            if (xacthucDangxuat) {
                $("#dkdn").show()
                $("#divTaikhoan").hide()
                localStorage.removeItem("tkDangnhap")
                location.reload()
            }
        })
    }
})