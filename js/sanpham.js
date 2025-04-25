class Sanpham {
    constructor(ten, gia, hang, kieudang, hinhanh, noiSanxuat, namSanxuat, loaimay, congsuatLamlanh, phamviLamlanh, congngheKhangkhuan, congngheTietkiemDien, tienich, tieuthuDien) {
        // 14 thuộc tính
        this.ten = ten
        this.gia = gia
        this.hang = hang
        this.kieudang = kieudang
        this.hinhanh = hinhanh
        this.noiSanxuat = noiSanxuat
        this.namSanxuat = namSanxuat
        this.loaimay = loaimay
        this.congsuatLamlanh = congsuatLamlanh
        this.phamviLamlanh = phamviLamlanh
        this.congngheKhangkhuan = congngheKhangkhuan
        this.congngheTietkiemDien = congngheTietkiemDien
        this.tienich = tienich
        this.tieuthuDien = tieuthuDien
    }
    thongtinSanpham() {
        return "Máy lạnh " + this.ten + " sản xuất tại " + this.noiSanxuat + ". Với kiểu dáng " + this.kieudang + " thuộc hãng " + this.hang + " có giá " + this.gia
    }
    thongsoKythuat() {
        return "Máy lạnh " + this.ten + " thuộc loại máy " + this.loaimay + ", có công suất làm lạnh " + this.congsuatLamlanh + "trong phạm vi " + this.phamviLamlanh + ", tiêu thụ điện khoảng " + this.tieuthuDien + ". Máy lạnh được trang bị công nghệ kháng khuẩn " + this.congngheKhangkhuan + ", công nghệ tiết kiệm điện " + this.congngheTietkiemDien + " đi kèm nhiều tiện ích như: " + this.tienich
    }
    themSanpham(arr) {
        let rowProducts = $("<div></div>")
        rowProducts.attr("class", "rowProducts")
        let lengthProducts_in_Row = 0
        for (let i = 0; i < arr.length; i++) {
            rowProducts.append("<a class='product' href='../html/chitietsanpham.html'><div><div class='productImg'><img src='" + arr[i].hinhanh[0] + "' alt=''></div><h3 class='productTen'>" + arr[i].ten + "</h3><div class='productGia'>" + arr[i].gia + "<sup>đ</sup></div><div class='productThemGioHang'><span>THÊM VÀO GIỎ HÀNG</span></div></div></a>")
            lengthProducts_in_Row += 1
            if (lengthProducts_in_Row == 4 || ((lengthProducts_in_Row < 4) && (i + 1 == arr.length))) {
                $("#products").append(rowProducts)
                lengthProducts_in_Row = 0
                rowProducts = $("<div></div>")
                rowProducts.attr("class", "rowProducts")
            }
        }

        $(".product").click(function () {
            let tensanpham = $(this)[0].childNodes[0].childNodes[1].innerText
            for (let i = 0; i < arr.length; i++) {
                if (tensanpham == arr[i].ten) {
                    sessionStorage.setItem("TTCT_SP", JSON.stringify(arr[i]))

                    // Gán thông tin trong modal về sản phẩm đã thêm vào giỏ hàng
                    $("#tenSP").text(tensanpham)
                    $("#giaSP").text(arr[i].gia)
                    break
                }
            }
        })
        $(".productThemGioHang").click(function () {
            $(".product").removeAttr("href")

            const taikhoan = localStorage.getItem("tkDangnhap")
            if (taikhoan == null) {
                alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!")
                location.reload()
            }

            // Get the modal
            var modal = document.getElementById("myModal")
            $("#myModal").css("display", "block")

            const autoAddHref = setTimeout(function () {
                $(".product").attr("href", "../html/chitietsanpham.html")
                clearTimeout(autoAddHref)
            }, 1000)

            // When the user clicks on <span> (x), close the modal
            $(".close").click(function () {
                $("#myModal").css("display", "none")
            })

            // When the user clicks anywhere outside of the modal, close it
            $(window).click(function (event) {
                if (event.target == modal) {
                    $("#myModal").css("display", "none")
                }
            })

            const timeOut = setTimeout(function () {
                const sp = sessionStorage.getItem("TTCT_SP")
                const objSP = JSON.parse(sp)
                const dsGioSP = localStorage.getItem("dsGioSP")
                const taikhoan = JSON.parse(localStorage.getItem("tkDangnhap"))
                const giohang = {
                    tendangnhap: taikhoan.ten_dangnhap,
                    sanpham: [
                        {
                            hinhanh: objSP.hinhanh[0],
                            ten: objSP.ten,
                            gia: objSP.gia
                        }
                    ]
                }
                if (dsGioSP == null) {
                    let dsGioSP = []
                    giohang.sanpham[0].soluong = 1
                    dsGioSP.push(giohang)
                    localStorage.setItem("dsGioSP", JSON.stringify(dsGioSP))
                } else {
                    let objDSGioSP = JSON.parse(dsGioSP)
                    let giaodichMoi = true
                    for (let i = 0; i < objDSGioSP.length; i++) {
                        if (taikhoan.ten_dangnhap === objDSGioSP[i].tendangnhap) {
                            giaodichMoi = false
                            let sanphamDuocThemNhieuLan = false
                            for (let j = 0; j < objDSGioSP[i].sanpham.length; j++){
                                if (giohang.sanpham[0].ten === objDSGioSP[i].sanpham[j].ten){
                                    sanphamDuocThemNhieuLan = true
                                    objDSGioSP[i].sanpham[j].soluong += 1
                                    break
                                }
                            }
                            if (!sanphamDuocThemNhieuLan){
                                giohang.sanpham[0].soluong = 1
                                objDSGioSP[i].sanpham.push(giohang.sanpham[0])
                            }
                            break
                        }
                    }
                    if (giaodichMoi) {
                        giohang.sanpham[0].soluong = 1
                        objDSGioSP.push(giohang)
                    }
                    localStorage.setItem("dsGioSP", JSON.stringify(objDSGioSP))
                }
                clearTimeout(timeOut)
            }, 2000)
        })
    }
    locSanpham(boloc, arr) {    
        $("#inputTimkiem").val("")
        $(".rowProducts").remove()
        if (boloc[0] == "congsuat" && boloc[1] == "hang" && boloc[2] == "gia" && boloc[3] == "tienich" && boloc[4] == "macdinh") {
            this.themSanpham(arr)
        } else {
            let arrSPtoShow = []
            for (let i = 0; i < arr.length; i++) {
                // Lọc về Công suất
                if (boloc[0] != "congsuat" && eval(boloc[0]) != arr[i].congsuatLamlanh) {
                    continue
                }

                // Lọc về Hãng
                if (boloc[1] != "hang" && boloc[1] != arr[i].hang) {
                    continue
                }

                // Lọc về giá
                let gia = ""
                gia = arr[i].gia.replace(/\./g, "")
                if (eval(gia) < 7000000) {
                    gia = "low7tr"
                } else if (eval(gia) >= 7000000 && eval(gia) < 9000000) {
                    gia = "7to9tr"
                } else if (eval(gia) >= 9000000 && eval(gia) < 12000000) {
                    gia = "9to12tr"
                } else if (eval(gia) >= 12000000 && eval(gia) <= 15000000) {
                    gia = "12to15tr"
                } else {
                    gia = "up20tr"
                }
                if (boloc[2] != "gia" && boloc[2] != gia) {
                    continue
                }

                // Lọc về tiện ích
                let tienich = ""
                tienich = chuyendoiChuoi(arr[i].tienich)
                    .replace(/[,\(\)\-]/g, "")
                if (boloc[3] != "tienich" && tienich.indexOf(boloc[3]) == -1) {
                    continue
                }


                // Thêm sản phẩm thỏa mãn bộ lọc vào arr
                arrSPtoShow.push(arr[i])
            }
            // Sắp xếp các sản phẩm theo tiêu chí giá
            if (boloc[4] == "thapdencao") {
                arrSPtoShow.sort((a, b) => eval(a.gia.replace(/\./g, "")) - eval(b.gia.replace(/\./g, "")))
            } else if (boloc[4] == "caodenthap") {
                arrSPtoShow.sort((a, b) => eval(b.gia.replace(/\./g, "")) - eval(a.gia.replace(/\./g, "")))
            }

            // Nếu không có sản phẩm nào thỏa mãn bộ lọc
            if (arrSPtoShow.length == 0) {
                let rowProducts = $("<div></div>")
                rowProducts.attr("class", "rowProducts")
                rowProducts.append("<b>Không sản phẩm nào được tìm thấy</b>")
                $("#products").append(rowProducts)
            } else {
                // Hiển thị các sản phẩm thỏa mãn bộ lọc lên giao diện
                this.themSanpham(arrSPtoShow)

                sessionStorage.setItem("boloc", JSON.stringify(boloc))
                sessionStorage.removeItem("timkiemDSSP")
            }
        }
    }
    timkiemSanpham(input, arr) {
        $("#congsuat").val("congsuat")
        $("#hang").val("hang")
        $("#gia").val("gia")
        $("#tienich").val("tienich")
        $("#xeptheo").val("macdinh")
        $(".rowProducts").remove()
        input = chuyendoiChuoi(input)
            .toLowerCase()
            .replace(/[\\\-\(\)/,]/g, "")
        let arrSPtoShow = []
        for (let i = 0; i < arr.length; i++) {
            let ten, noiSanxuat, congngheKhangkhuan, congngheTietkiemDien, tienich = ""
            ten = arr[i].ten.toLowerCase().replace(/[ \-/]/g, "")
            noiSanxuat = chuyendoiChuoi(arr[i].noiSanxuat).replace(/\//g, "")
            congngheKhangkhuan = chuyendoiChuoi(arr[i].congngheKhangkhuan).replace(/[,\-\(\)]/g, "")
            congngheTietkiemDien = chuyendoiChuoi(arr[i].congngheTietkiemDien).replace(/,/g, "")
            tienich = chuyendoiChuoi(arr[i].tienich).replace(/,-\(\)/g, "")
            if (ten.indexOf(input) > -1 || noiSanxuat.indexOf(input) > -1 || congngheKhangkhuan.indexOf(input) > -1 || congngheTietkiemDien.indexOf(input) > -1 || tienich.indexOf(input) > -1) {
                arrSPtoShow.push(arr[i])
            }
        }

        // Nếu không có sản phẩm nào phù hợp với kết quả tìm kiếm
        if (arrSPtoShow.length == 0) {
            let rowProducts = $("<div></div>")
            rowProducts.attr("class", "rowProducts")
            rowProducts.append("<b>Không sản phẩm nào được tìm thấy</b>")
            $("#products").append(rowProducts)
        } else {
            // Hiển thị các sản phẩm phù hợp kết quả tìm kiếm
            this.themSanpham(arrSPtoShow)
            if (arr.length !== 8) {
                sessionStorage.setItem("timkiemDSSP", input)
                sessionStorage.removeItem("boloc")
            } else {
                sessionStorage.setItem("timkiemTrangchu", input)
            }
        }
    }
}

function chuyendoiChuoi(str) {
    return str.normalize("NFD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, "d")
        .replace(/ /g, "")
}

export { Sanpham }