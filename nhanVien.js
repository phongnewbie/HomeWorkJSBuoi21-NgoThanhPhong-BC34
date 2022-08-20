function NhanVien(
  _accountInfo,
  _fullNameInfo,
  _emailInfo,
  _passwordInfo,
  _workingDay,
  _positionInfo,
  _basicSalaries,
  _workingHours) {
  this.accountInfo = _accountInfo;
  this.fullNameInfo = _fullNameInfo;
  this.emailInfo = _emailInfo;
  this.passwordInfo = _passwordInfo;
  this.workingDay = _workingDay;
  this.basicSalaries = _basicSalaries;
  this.positionInfo = _positionInfo;
  this.workingHours = _workingHours;
  this.tongLuong = 0;
  this.loaiNhanVien = "";
  this.tinhTongLuong = function () {
      if (this.positionInfo == "Sếp") {
          this.tongLuong += this.basicSalaries * 4;
      }
      else if (this.positionInfo == "Trưởng Phòng") {
          this.tongLuong += this.basicSalaries * 3;
      }
      else {
          this.tongLuong += this.basicSalaries * 2;
      }
  };
  this.xepLoaiNhanVien = function () {
      if (this.workingHours >= 192) {
          this.loaiNhanVien = "Nhân viên xuất sắc !"
      }
      else if (this.workingHours >= 176) {
          this.loaiNhanVien = "Nhân viên giỏi !"
      }
      else if (this.workingHours >= 160) {
          this.loaiNhanVien = "Nhân viên khá !"
      }
      else {
          this.loaiNhanVien = "Nhân viên trung bình !"
      }
  };
}