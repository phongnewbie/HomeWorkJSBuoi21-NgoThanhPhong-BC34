var nhanVien = new DanhSachNhanVien();
var validation = new Validation();
function getEle(id){
  return document.getElementById(id);
}
function layThongTinNV(isAdd) {
  /**
   * Dom tới các thẻ input lấy value
   */
  var accountInfo = getEle("tknv").value;
  var fullNameInfo = getEle("name").value;
  var emailInfo = getEle("email").value;
  var passwordInfo = getEle("password").value;
  var workingDay = getEle("datepicker").value;
  var positionInfo = getEle("chucvu").value;
  var basicSalaries = getEle("luongCB").value*1;
  var workingHours  = getEle("gioLam").value;
  //isValid la true => form hop le
  var isValid = true;

  //taiKhoan
if (isAdd) {
  isValid &=
    validation.kiemTraRong(accountInfo, "errorTaiKhoan", "(*)  Vui lòng nhập tai khoan dung do dai") &&
    validation.kiemTraDoDaiKiTu(
      accountInfo,
      "errorTaiKhoan",
      "(*)  Vui lòng nhập ki tu 4 - 10",
      4,
      10
    )
}

  // //Ten Nhanvien
   isValid &=
     validation.kiemTraRong(fullNameInfo, "errorTenSV", "(*)  Vui lòng nhập tên SV") &&
     validation.kiemTraKiTuChuoi(
       fullNameInfo,
       "errorTenSV",
       "(*)  Vui lòng nhập chuỗi ki tự"
     );

  // //Email
   isValid &=
     validation.kiemTraRong(emailInfo, "errorEmail", "(*)  Vui lòng nhập email") &&
     validation.checkEmail(
       emailInfo,
       "errorEmail",
       "(*)  Vui lòng nhập email dung dinh dang!"
     );
  
  // //Mat khau
   isValid &= validation.kiemTraRong(
     passwordInfo,
     "errorPass",
     "(*)  Vui lòng nhập pass"
   )&& validation.kiemTraDoDaiKiTu(
    passwordInfo,
    "errorPassword",
    "(*)  Vui lòng nhập kí tự dài từ 6 đến 10 ký tự ",6,10
   )

  // //Ngay sinh
   isValid &= validation.kiemTraRong(
     workingDay,
     "errorWorkingDay",
     "(*)  Vui lòng nhập ngay lam viec"
   );

  // //Khoa Hoc
  // isValid &= validation.checkChucVu(
  //   "chucvu",
  //   "errorKH",
  //   "(*) Vui long chon KH!"
  // );


  if (!isValid) return null;

  //Tạo đối tượng sv từ lớp đối tượng SinhVien
  var nVien = new NhanVien(
    accountInfo,
    fullNameInfo,
    emailInfo,
    passwordInfo,
    workingDay,
    positionInfo,
    basicSalaries,
    workingHours,
  );
  nVien.tinhTongLuong();
  nVien.xepLoaiNhanVien();
  return nVien;
}

function renderTable(data) {
  var content = "";
  data.forEach(function (nv) {
      content += `
      <tr>
          <td>${nv.accountInfo}</td>
          <td>${nv.fullNameInfo}</td>
          <td>${nv.emailInfo}</td>
          <td>${nv.workingDay}</td>
          <td>${nv.positionInfo}</td>
          <td>${nv.tongLuong}</td>
          <td>${nv.loaiNhanVien}</td>
          <td>
          <button
                  class="btn btn-success"
                  onclick="suaNV('${nv.accountInfo}')"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Sửa
                </button>
          <button class="btn btn-danger" onclick="xoaNV('${nv.accountInfo}')">Xoá</button>
          </td>
      </tr>
      `;
  })
  getEle("tableDanhSach").innerHTML = content;
}

document.getElementById("btnThemNV").onclick = function () {
  var nV = layThongTinNV(true);
  if (nV) {
    nhanVien.themNV(nV);
      setLocalStorage();
      renderTable(nhanVien.arr);
  }
};
function xoaNV(accountInfo) {
  nhanVien._xoaNV(accountInfo);
  renderTable(nhanVien.arr);
  setLocalStorage();
}
function setLocalStorage() {
  //Convert JSON => string
  var dataString = JSON.stringify(nhanVien.arr);
  //Luu xuong localStorage
  localStorage.setItem("DanhSachNhanVien", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DanhSachNhanVien")) {
    var dataString = localStorage.getItem("DanhSachNhanVien");
    //Convet string => JSON
    var dataJson = JSON.parse(dataString);
    //backup lại dự liệu cho dssv.arr từ dataJson
    dssv.arr = dataJson;
    //hiển thị dssv ra ngoài table
    renderTable(dataJson);
  }
}







