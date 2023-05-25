import React from 'react'

function RequestStaff() {
  return (
    <div>
        <label className="text-2xl font-semibold m-[7%]">คำร้อง</label>

        <div className="flex justify-center mt-[2%] ">
          <button className="p-[10px] border-2 rounded-3xl w-[140px] m-[10px] text-gray-500">
            {" "}
            ทั้งหมด{" "}
          </button>
          <button className="p-[10px] border-2 rounded-3xl w-[140px] m-[10px] text-gray-500 ">
            {" "}
            กำลังดำเนินการ{" "}
          </button>
          <button className="p-[10px] border-2 rounded-3xl w-[140px] m-[10px] text-gray-500 ">
            {" "}
            อนุมัติ{" "}
          </button>
          <button className="p-[10px] border-2 rounded-3xl w-[140px] m-[10px] text-gray-500 ">
            {" "}
            ปฏิเสธ{" "}
          </button>
          <button className="p-[10px] border-2 rounded-3xl w-[140px] m-[10px] bg-[#3EB7FF] text-[#fff] ">
            {" "}
            จัดการคำร้อง{" "}
          </button>
        </div>

        <div className="flex justify-center ">
          <button className="p-[10px] border-2 rounded-3xl w-[180px] m-[10px] bg-[#3EB7FF] text-[#fff]">
            {" "}
            ทั้งหมด{" "}
          </button>
          <button className="p-[10px] border-2 rounded-3xl w-[180px] m-[10px] text-gray-500 ">
            {" "}
            เสร็จสิ้น{" "}
          </button>
          <button className="p-[10px] border-2 rounded-3xl w-[180px] m-[10px] text-gray-500 ">
            {" "}
            ยังไม่เสร็จสิ้น
          </button>
        </div>
        <div className="flex justify-center mt-[1%]">
          <input
            className="border-2 rounded-3xl border-gary-500 p-[10px] w-[30%]"
            type="text"
            placeholder="Search..."
          />
          <label className="cursor-pointer rounded-3xl p-[10px] bg-[#3EB7FF] text-[#fff] w-[10%] text-center font-medium ml-[2%]">
            {" "}
            ค้นหา{" "}
          </label>
        </div>

        <div className="flex bg-gray-200 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer">
          <div className="flex">
            <div className="self-center">
              <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                62070153
              </label>
            </div>
            <div className="mx-[30px]">
              <div className="flex">
                <label className="font-semibold text-xl">
                  นาย ภูวเดช ใจชื่นบาน
                </label>
              </div>

              <p>ขอลงเรียนsummer</p>
            </div>
          </div>
          <div className="flex">
            <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#FFAF10] text-[#fff] mr-[200px] w-[150px]">
              <label className="">กำลังดำเนินการ</label>
            </div>
            <div>
              <label className="font-semibold text-xl" >27 ต.ค. 2565</label>
              <p>2 days ago</p>
            </div>
          </div>
        </div>

        <div className="flex bg-gray-200 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer">
          <div className="flex">
            <div className="self-center">
              <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                62070153
              </label>
            </div>
            <div className="mx-[30px]">
              <div className="flex">
                <label className="font-semibold text-xl">
                  นาย ภูวเดช ใจชื่นบาน
                </label>
              </div>

              <p>ขอลงเรียนsummer</p>
            </div>
          </div>
          <div className="flex">
            <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] text-[#fff] mr-[200px] w-[150px]">
              <label className="">อนุมัติ</label>
            </div>
            <div>
              <label className="font-semibold text-xl" >27 ต.ค. 2565</label>
              <p>2 days ago</p>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-200 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer">
          <div className="flex">
            <div className="self-center">
              <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                62070153
              </label>
            </div>
            <div className="mx-[30px]">
              <div className="flex">
                <label className="font-semibold text-xl">
                  นาย ภูวเดช ใจชื่นบาน
                </label>
              </div>

              <p>ขอลงเรียนsummer</p>
            </div>
          </div>
          <div className="flex">
            <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#EE1D52] text-[#fff] mr-[200px] w-[150px]">
              <label className="">ปฏิเสธ</label>
            </div>
            <div>
              <label className="font-semibold text-xl" >27 ต.ค. 2565</label>
              <p>2 days ago</p>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-200 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer">
          <div className="flex">
            <div className="self-center">
              <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                62070153
              </label>
            </div>
            <div className="mx-[30px]">
              <div className="flex">
                <label className="font-semibold text-xl">
                  นาย ภูวเดช ใจชื่นบาน
                </label>
              </div>

              <p>ขอลงเรียนsummer</p>
            </div>
          </div>
          {/* จัดการคำร้องของเจ้าหน้า้ที่ */}
          <div className="flex">
            <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] text-[#fff] mr-[10px] w-[150px]">
              <label className="">อนุมัติ</label>
            </div>
            <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] mr-[40px] text-[#fff] w-[150px]">
              <label className="">เสร็จสิ้น</label>
            </div>
            <div>
              <label className="font-semibold text-xl" >27 ต.ค. 2565</label>
              <p>2 days ago</p>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-200 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer">
          <div className="flex">
            <div className="self-center">
              <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                62070153
              </label>
            </div>
            <div className="mx-[30px]">
              <div className="flex">
                <label className="font-semibold text-xl">
                  นาย ภูวเดช ใจชื่นบาน
                </label>
              </div>

              <p>ขอลงเรียนsummer</p>
            </div>
          </div>
        
        
          <div className="flex">
            <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] text-[#fff] mr-[10px] w-[150px]">
              <label className="">อนุมัติ</label>
            </div>
            <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#FFAF10] mr-[40px] text-[#fff] w-[150px]">
              <label className="">ยังไม่เสร็จสิ้น</label>
            </div>
            <div>
              <label className="font-semibold text-xl" >27 ต.ค. 2565</label>
              <p>2 days ago</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default RequestStaff