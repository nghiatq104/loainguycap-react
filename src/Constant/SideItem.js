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
  },
  {
    icon: <FaUser />,
    title: "Quản lý người dùng",
    dropBtn: false,
  },
  {
    icon: <BsBarChartSteps />,
    title: "Phân loại học",
    dropBtn: false,
  },
  {
    icon: <GiAnimalSkull />,
    title: "Loài nguy cấp quý hiếm",
    dropBtn: false,
  },
  {
    icon: <BsFillPencilFill />,
    title: "Bài viết",
    dropBtn: false,
  },
  {
    icon: <RiFilePaper2Fill />,
    title: "Phiếu đề xuất",
    dropBtn: true,
  },
  {
    icon: <AiTwotoneBook />,
    title: "Danh mục",
    dropBtn: true,
  },
];

export default SideItem;
