import { arrSP_DSSP } from "../js/sanpham_array.js"
import { Sanpham } from "../js/sanpham.js"
const sp = new Sanpham()

let stringTimkiem = sessionStorage.getItem("timkiemDSSP")
let stringBoloc = sessionStorage.getItem("boloc")

if (stringTimkiem != null) {
    sp.timkiemSanpham(stringTimkiem, arrSP_DSSP)
} else if (stringBoloc != null) {
    let objBoloc = JSON.parse(stringBoloc)
    sp.locSanpham(objBoloc, arrSP_DSSP)
} else {
    sp.themSanpham(arrSP_DSSP)
}

$("#dssp").click(function () {
    sessionStorage.removeItem("timkiemDSSP")
    sessionStorage.removeItem("boloc")
})

$("#formSearch").submit(function (event) {
    event.preventDefault()
})

$("#inputTimkiem").focus()

// Tìm kiếm sản phẩm
$("#inputTimkiem").keydown(function (event) {
    if (event.which === 13 || event.keyCode === 13) {
        if (this.value.trim() != "") {
            sp.timkiemSanpham(this.value, arrSP_DSSP)
        } else if (this.value == "") {
            refreshBoloc()
        }
    }
})
$("#btnTimkiem").click(function () {
    $("#inputTimkiem").focus()
    let input = ""
    input = $("#inputTimkiem").val()
    if (input.trim() != "") {
        sp.timkiemSanpham(input, arrSP_DSSP)
    } else if (this.value == "") {
        refreshBoloc()
    }
})

// Bộ lọc sản phẩm
let boloc = ["congsuat", "hang", "gia", "tienich", "macdinh"]
let countCongsuat = 0
let countHang = 0
let countGia = 0
let countTienich = 0
let countXeptheo = 0
$("#congsuat").click(function () {
    countCongsuat += 1
    if (countCongsuat % 2 == 0) {
        boloc[0] = $(this).val()
        countCongsuat = 0
        sp.locSanpham(boloc, arrSP_DSSP)
    }
})
$("#hang").click(function () {
    countHang += 1
    if (countHang % 2 == 0) {
        boloc[1] = $(this).val()
        countHang = 0
        sp.locSanpham(boloc, arrSP_DSSP)
    }
})
$("#gia").click(function () {
    countGia += 1
    if (countGia % 2 == 0) {
        boloc[2] = $(this).val()
        countGia = 0
        sp.locSanpham(boloc, arrSP_DSSP)
    }
})
$("#tienich").click(function () {
    countTienich += 1
    if (countTienich % 2 == 0) {
        boloc[3] = $(this).val()
        countTienich = 0
        sp.locSanpham(boloc, arrSP_DSSP)
    }
})
$("#xeptheo").click(function () {
    countXeptheo += 1
    if (countXeptheo % 2 == 0) {
        boloc[4] = $(this).val()
        countXeptheo = 0
        sp.locSanpham(boloc, arrSP_DSSP)
    }
})

function refreshBoloc() {
    sessionStorage.removeItem("timkiemDSSP")
    sessionStorage.removeItem("boloc")
    $("#congsuat").val("congsuat")
    $("#hang").val("hang")
    $("#gia").val("gia")
    $("#tienich").val("tienich")
    $("#xeptheo").val("macdinh")
    $(".rowProducts").remove()
    sp.themSanpham(arrSP_DSSP)
}