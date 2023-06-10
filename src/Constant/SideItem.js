import { TbTableFilled } from "react-icons/tb";
import { GiAnimalSkull } from "react-icons/gi";
import { BsBarChartSteps, BsFillPencilFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { AiTwotoneBook } from "react-icons/ai";


const SideItem = [
  {
    icon: <TbTableFilled />,
    title: "Bảng điều khiển",
    dropBtn: false,
    link:"/bang-dieu-khien"
  },
  {
    icon: <FaUser />,
    title: "Quản lý người dùng",
    dropBtn: false,
    link:"/hethong"

  },
  {
    icon: <BsBarChartSteps />,
    title: "Phân loại học",
    dropBtn: false,
    link:"/phan-loai-hoc"

  },
  {
    icon: <GiAnimalSkull />,
    title: "Loài nguy cấp quý hiếm",
    dropBtn: false,
    link:"/loai"

  },
  {
    icon: <BsFillPencilFill />,
    title: "Bài viết",
    dropBtn: false,
    link:"/baiviet"
  },
  {
    icon: <RiFilePaper2Fill />,
    title: "Phiếu đề xuất",
    dropBtn: true,
    link:""

  },
  {
    icon: <AiTwotoneBook />,
    title: "Danh mục",
    dropBtn: true,
    link:""

  },
  {
    icon: <i className="fa-solid fa-building"></i>,
    title: "Tổ chức",
    dropBtn: false,
    link:"/company"

  },
];

export default SideItem;
