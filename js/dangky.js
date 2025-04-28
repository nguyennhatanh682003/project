$(window).ready(function () {
    $("#messTenDangnhap").css("color", "#8000000")
    $("#messMatkhau").css("color", "#8000000")
    $("#messNLMK").css("color", "#8000000")
    $("#messNgaysinh").css("color", "#8000000")

    
    $("#txtTenDangnhap").blur(tenDangnhap)
    $("#txtMatkhau").blur(matkhau)
    $("#txtNLMK").blur(nhaplaiMatkhau)
    $("#txtHoten").blur(hoten)
    $("#ngaysinh").blur(ngaysinh)
    $("#txtDT").blur(dienthoai)
    $("#txtEmail").blur(email)

    $("#dangky").click(function () {
        if (tenDangnhap() && matkhau() && nhaplaiMatkhau() && hoten() && ngaysinh() && dienthoai() && email()) {
            let gioitinh = "Nam"
            if ($("#nu").is(":checked")) {
                gioitinh = "Nữ"
            }
            const taikhoan = {
                ten_dangnhap: $("#txtTenDangnhap").val(),
                matKhau: $("#txtMatkhau").val(),
                hoTen: $("#txtHoten").val(),
                ngaySinh: $("#ngaysinh").val(),
                gioiTinh: gioitinh,
                diaChi: $("#txtDiachi").val(),
                dienThoai: $("#txtDT").val(),
                email: $("#txtEmail").val()
            }
            const DSTK = localStorage.getItem("DSTaikhoan")
            if (DSTK != null) {
                let objDSTK = JSON.parse(DSTK)
                let tontaiTK = false
                for (let i = 0; i < objDSTK.length; i++) {
                    if (($("#txtTenDangnhap").val() === objDSTK[i].ten_dangnhap)) {
                        tontaiTK = true
                        break
                    }
                }
                if (!tontaiTK) {
                    $("#dangky").attr("type", "button")
                    alert("Đăng ký tài khoản thành công")
                    objDSTK.push(taikhoan)
                    localStorage.setItem("DSTaikhoan", JSON.stringify(objDSTK))
                    const tkDN = localStorage.getItem("tkDangnhap")
                    if (tkDN == null) {
                        const option = confirm("Bạn có muốn hệ thống chuyển sang trang đăng nhập.")
                        if (option) {
                            window.location.replace("../html/dangnhap.html")
                            return
                        }
                    }
                } else {
                    $("#dangky").attr("type", "button")
                    alert("Tên tài khoản đã tồn tại , vui lòng nhập tên khác!")
                    return
                }
            } else {
                alert("Đăng ký tài khoản thành công")
                let dsTaikhoan = []
                dsTaikhoan.push(taikhoan)
                localStorage.setItem("DSTaikhoan", JSON.stringify(dsTaikhoan))
            }
            $("#dangky").attr("type", "submit")
        } else {
            $("#dangky").attr("type", "button")
        }
    })
    
    $("#huy").click(function () {
        $("#messTenDangnhap").text("")
        $("#messMatkhau").text("")
        $("#messNLMK").text("")
        $("#messHoten").text("")
        $("#messDT").text("")
        $("#messEmail").text("")
    })
})

function tenDangnhap() {
    const regexTenDangnhap = /^[a-zA-Z]+\d*([_-][a-zA-Z\d]+)*$/

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

function nhaplaiMatkhau() {
    const regexNhaplaiMatkhau = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&\*\(\)_\-\+/\\\?<>,\.|])[a-zA-Z\d!@#$%^&\*\(\)_\-\+/\\\?<>,\.|]{8,15}$/

    if ($("#txtNLMK").val().trim() == "") {
        $("#messNLMK").text("Không được bỏ trống!")
        return false
    }
    if (!regexNhaplaiMatkhau.test($("#txtNLMK").val())) {
        $("#messNLMK").text("Phải có độ dài 8-15 ký tự, chứa ít nhất 1 ký số, 1 ký tự chữ thường, 1 ký tự chữ hoa, 1 ký tự đặc biệt!")
        return false
    }
    if ($("#txtNLMK").val() !== $("#txtMatkhau").val()) {
        $("#messNLMK").text("Mật khẩu nhập lại không trùng khớp!")
        return false
    }

    $("#messNLMK").text("")
    return true
}

function hoten() {
    const regexHoten = /^[a-zA-Z]+( [a-zA-Z]+)*$/
    let hoten = $("#txtHoten").val().normalize("NFD").replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, "d").replace(/Đ/g, "D")

    if (hoten.trim() == "") {
        $("#messHoten").text("Họ tên không được bỏ trống!")
        return false
    }
    if (!regexHoten.test(hoten)) {
        $("#messHoten").text("Họ tên chỉ chứa chữ và khoảng trắng!")
        return false
    }

    $("#messHoten").text("")
    return true
}

function ngaysinh() {
    if ($("#ngaysinh").val() != "") {
        const currentYear = new Date().getFullYear()
        const birthday = $("#ngaysinh").val()
        const yearOfBirth = birthday.split("-")[0]
        const age = currentYear - eval(yearOfBirth)
        if (currentYear < eval(yearOfBirth)) {
            $("#messNgaysinh").text("Tuổi không hợp lệ")
            return false
        }
        if (age < 18) {
            $("#messNgaysinh").text("Phải từ 18 tuổi trở lên")
            return false
        }
    }

    $("#messNgaysinh").text("")
    return true
}

function dienthoai() {
    const regexDienthoai = /^(03|05|07|08|09)\d{8}$/

    if ($("#txtDT").val().trim() == "") {
        $("#messDT").text("Số điện thoại không được bỏ trống!")
        return false
    }
    if (!regexDienthoai.test($("#txtDT").val())) {
        $("#messDT").text("Điện thoại gồm 10 ký số, với đầu số hợp lệ là 03,05,07,08,09")
        return false
    }

    $("#messDT").text("")
    return true
}

function email() {
    const regexEmail = /^[a-zA-Z]+([_\.][a-zA-Z\d])?\d*[a-zA-Z]*([_\.][a-zA-Z\d])?[a-zA-Z\d]*@[a-zA-Z]{3,6}\.(com)(.[a-zA-Z]{2,5})?$/

    if ($("#txtEmail").val().trim() !== "" && !regexEmail.test($("#txtEmail").val())) {
        $("#messEmail").text("Email không đúng định dạng")
        return false
    }
    $("#messEmail").text("")
    return true
}