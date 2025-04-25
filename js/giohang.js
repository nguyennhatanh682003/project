$(window).ready(function () {
    const dsGio = localStorage.getItem("dsGioSP")
    const taiKhoanDN = localStorage.getItem("tkDangnhap")
    if (dsGio == null || taiKhoanDN == null) {
        xuLyGiohangRong()
        return
    } else {
        const objTKDN = JSON.parse(taiKhoanDN)
        const tenDN = objTKDN.ten_dangnhap
        const objDSGioSP = JSON.parse(dsGio)
        let gioRong = true
        for (let i = 0; i < objDSGioSP.length; i++) {
            if (tenDN === objDSGioSP[i].tendangnhap) {
                let divCacsanpham = $("<div></div>")
                divCacsanpham.attr("id", "cacsanpham")
                for (let j = 0; j < objDSGioSP[i].sanpham.length; j++) {
                    gioRong = false
                    let divSanpham = "<div class='sanpham'><div><div class='imgSanPham'><img src='" + objDSGioSP[i].sanpham[j].hinhanh + "' width='60'></div><div class='tenSanPham'><h4>" + objDSGioSP[i].sanpham[j].ten + "</h4></div><div class='giaSanPham'>" + objDSGioSP[i].sanpham[j].gia + "<sup>đ</sup></div></div><div><div class='xoaSanpham'><a onclick='xoaSanPham(" + i + "," + j + ")'><span><i class='fa fa-delete-left'></i> Xóa</span></a></div><div class='soluongSanPham'><span>Số lượng: </span><div><button onclick='giamSoluong(" + i + "," + j + ")'>-</button><span class='soluong'>" + objDSGioSP[i].sanpham[j].soluong + "</span><button onclick='tangSoluong(" + i + "," + j + ")'>+</button></div></div></div></div>"
                    divCacsanpham.append(divSanpham)
                }

                $("#container").prepend(divCacsanpham)
                break
            }
        }
        if (gioRong) {
            xuLyGiohangRong()
            return
        }

        // Cập nhật thông tin khách hàng vào form đặt hàng
        if (objTKDN.gioiTinh === "Nữ") {
            $("#chi").attr("checked", "checked")
            $("#anh").attr("disabled", "disabled")
        } else {
            $("#anh").attr("checked", "checked")
            $("#chi").attr("disabled", "disabled")
        }
        $("#hovaten").val(objTKDN.hoTen)
        $("#sodienthoai").val(objTKDN.dienThoai)
        $("#diachi").val(objTKDN.diaChi)
        $("#tannha").click(function () {
            $("#diachi").val(objTKDN.diaChi)
            $(".diachi").css("display", "block")
        })
        $("#sieuthi").click(function () {
            $(".diachi").css("display", "none")
        })

        $("#tongTien").text(tinhTongtien())

        $("#datHang").click(function () {
            if ($("#tannha").is(":checked")) {
                if ($("#diachi").val().trim() === "") {
                    alert("Quý khách vui lòng nhập địa chỉ giao hàng!")
                    return
                }
            }
            const xacnhan = confirm("Quý khách có chắc chắn muốn đặt tất cả các sản phẩm trong giỏ hàng?")
            if (xacnhan) {
                // Get the modal
                var modal = document.getElementById("myModal")
                $("#myModal").css("display", "block")

                // When the user clicks on <span> (x), close the modal
                $(".close").click(function () {
                    $("#myModal").css("display", "none")
                })

                xuLyGiohangRong()

                for (let i = 0; i < objDSGioSP.length; i++) {
                    if (tenDN === objDSGioSP[i].tendangnhap) {
                        objDSGioSP.splice(i, 1)
                        localStorage.setItem("dsGioSP", JSON.stringify(objDSGioSP))
                    }
                }
            }
        })
    }
})

function xuLyGiohangRong() {
    $("main>div").empty()
    $("main").css("height", "400px")
    $("main>div").append("<h2>Không có sản phẩm nào trong giỏ hàng</h2>")
    $("main>div").append("Click <a href='../html/danhsachsanpham.html'>Xem danh sách sản phẩm</a> để tìm kiếm và thêm sản phẩm mà bạn mong muốn")
}

function phantachSoHangnghin(so) {
    let arrHangtram = []
    let soDaduocPhantach = ""
    let strSo = so + ""
    let end = strSo.length
    let start = end - 3
    while (start > 0) {
        arrHangtram.unshift("." + strSo.slice(start, end))
        if (start - 3 <= 0) {
            arrHangtram.unshift(strSo.slice(0, start))
            break
        }
        end = start
        start = end - 3
    }
    soDaduocPhantach = arrHangtram.join("")
    return soDaduocPhantach
}

function giamSoluong(indexGio, indexSanpham) {
    let soluongSanpham = eval(document.getElementsByClassName("soluong")[indexSanpham].innerHTML)
    if (soluongSanpham === 1) {
        return
    }

    document.getElementsByClassName("soluong")[indexSanpham].innerHTML = soluongSanpham - 1 + ""
    $("#tongTien").text(tinhTongtien())

    const dsGio = localStorage.getItem("dsGioSP")
    let objDSGioSP = JSON.parse(dsGio)
    objDSGioSP[indexGio].sanpham[indexSanpham].soluong = soluongSanpham - 1
    localStorage.setItem("dsGioSP", JSON.stringify(objDSGioSP))
}

function tangSoluong(indexGio, indexSanpham) {
    let soluongSanpham = eval(document.getElementsByClassName("soluong")[indexSanpham].innerHTML)
    document.getElementsByClassName("soluong")[indexSanpham].innerHTML = soluongSanpham + 1 + ""
    $("#tongTien").text(tinhTongtien())

    const dsGio = localStorage.getItem("dsGioSP")
    let objDSGioSP = JSON.parse(dsGio)
    objDSGioSP[indexGio].sanpham[indexSanpham].soluong = soluongSanpham + 1
    localStorage.setItem("dsGioSP", JSON.stringify(objDSGioSP))
}

function xoaSanPham(indexGio, indexSanpham) {
    const xacnhan = confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")
    if (!xacnhan) {
        return
    }

    let sanpham = document.getElementsByClassName("sanpham")[indexSanpham]
    let giaSanPham = document.getElementsByClassName("giaSanPham")[indexSanpham]
    let soluongSanPham = document.getElementsByClassName("soluong")[indexSanpham]
    sanpham.style.display = "none"
    giaSanPham.style.display = "none"
    soluongSanPham.style.display = "none"
    $("#tongTien").text(tinhTongtien())
    if ($(".sanpham:visible").length === 0) {
        xuLyGiohangRong()
    }

    const dsGio = localStorage.getItem("dsGioSP")
    let objDSGioSP = JSON.parse(dsGio)
    objDSGioSP[indexGio].sanpham.splice(indexSanpham, 1)
    localStorage.setItem("dsGioSP", JSON.stringify(objDSGioSP))
}

function tinhTongtien() {
    const soloaisanpham = $(".sanpham:visible").length
    const giaTungSanPham = $(".giaSanPham:visible")
    const soluongTungSanPham = $(".soluong:visible")
    let tongTien = 0
    for (let i = 0; i < soloaisanpham; i++) {
        tongTien += eval(giaTungSanPham[i].innerText.replace(/[\.đ]/g, "")) * eval(soluongTungSanPham[i].innerHTML)
    }
    return phantachSoHangnghin(tongTien)
}
