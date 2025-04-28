$(window).ready(function () {
    $("#messTenDangnhap").css("color", "#800000")
    $("#messMatkhau").css("color", "#800000")

    $("#formDN").submit(function (event) {
        event.preventDefault()
    })

    function tenDangnhap() {

        const regexTenDangnhap = /^[a-zA-Z]+([a-zA-Z\d]*|([a-zA-Z\d]*[_-][a-zA-Z\d]*))$/

        if ($("#txtTenDangnhap").val().trim() == "") {
            $("#messTenDangnhap").text("Tên đăng nhập không được bỏ trống!")
            return false
        }
        if (!regexTenDangnhap.test($("#txtTenDangnhap").val())) {
            $("#messTenDangnhap").text("Tên đăng nhập bắt đầu bằng ký tự chữ, cho phép nhập ký tự _ hoặc - nhưng ký tự sau nó phải là ký số hoặc ký tự chữ cái!")
            return false
        }
        if ($("#txtTenDangnhap").val().length < 8 || $("#txtTenDangnhap").val().length > 15) {
            $("#messTenDangnhap").text("Tên đăng nhập có độ dài 8-15 ký tự, bắt đầu bằng ký tự chữ, cho phép nhập ký tự _ hoặc - nhưng ký tự sau nó phải là ký số hoặc ký tự chữ cái!")
            return false
        }

        $("#messTenDangnhap").text("")
        return true
    }

    function matkhau() {

        const regexMatkhau = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&\*\(\)_\-\+/\\\?<>,\.|])[a-zA-Z\d!@#$%^&\*\(\)_\-\+/\\\?<>,\.|]{8,15}$/

        if ($("#txtMatkhau").val().trim() == "") {
            $("#messMatkhau").text("Mật khẩu không được bỏ trống!")
            return false
        }
        if (!regexMatkhau.test($("#txtMatkhau").val())) {
            $("#messMatkhau").text("Mật khẩu có độ dài 8-15 ký tự, chứa ít nhất 1 ký số, 1 ký tự chữ thường, 1 ký tự chữ hoa, 1 ký tự đặc biệt!")
            return false
        }

        $("#messMatkhau").text("")
        return true
    }

    $("#txtTenDangnhap").blur(tenDangnhap)
    $("#txtMatkhau").blur(matkhau)

    $("#dangnhap").click(function () {
        if (tenDangnhap() && matkhau()) {
            const DSTK = localStorage.getItem("DSTaikhoan")
            if (DSTK == null) {
                $("#dangnhap").attr("type", "button")
                alert("Tài khoản không tồn tại trên hệ thống!")
            } else {
                const objDSTK = JSON.parse(DSTK)
                let tontaiTK = false
                for (let i = 0; i < objDSTK.length; i++) {
                    if (($("#txtTenDangnhap").val() === objDSTK[i].ten_dangnhap) && ($("#txtMatkhau").val() === objDSTK[i].matKhau)) {
                        tontaiTK = true
                        localStorage.setItem("tkDangnhap", JSON.stringify(objDSTK[i]))
                        window.location.replace("../html/trangchu.html")
                        break
                    } else if (($("#txtTenDangnhap").val() === objDSTK[i].ten_dangnhap) && ($("#txtMatkhau").val() !== objDSTK[i].matKhau)) {
                        tontaiTK = true
                        $("#dangnhap").attr("type", "button")
                        alert("Mật khẩu không trùng khớp!")
                        break
                    }
                }
                if (!tontaiTK) {
                    $("#dangnhap").attr("type", "button")
                    alert("Tài khoản không tồn tại trên hệ thống!")
                }
            }
        } else {
            $("#dangnhap").attr("type", "button")
        }
    })
})