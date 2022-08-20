function DanhSachNhanVien(){
    this.arr = [];
    this.themNV = function (nv) {
        this.arr.push(nv);
      };
      this._timViTriNV = function (accountInfo) {
        /**
         * Tìm vị trí
         * - Tạo 1 biến index = -1;
         * - Duyệt mảng arr, i
         * - Kiểm tra sv.maSV trùng maSV?
         * => True: Cập nhật index = i
         */
        var index = -1;
    
        this.arr.forEach(function (sv, i) {
          if (sv.accountInfo === accountInfo) {
            index = i;
          }
        });
    
        return index;
      };
    
      this._xoaNV = function (accountInfo) {
        var index = this._timViTriNV(accountInfo);
    
        if (index !== -1) {
          this.arr.splice(index, 1);
        }
      };  
}