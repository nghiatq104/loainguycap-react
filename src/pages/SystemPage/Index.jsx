import { memo, useContext, useEffect, useState, useCallback } from "react";
import "./SystemPage.scss";
import getData from "../../utils/GetData";
import BtnPagination from "../../components/BtnPagination";
import FTButton from "../../components/Button/FeatureBtn";
import useDebounce from "../../hook/Debounce";
import { AdminContext } from "../../Context/AdminPageContext";
import LineLoading from "../../components/Loading/LineLoading";
import styled, { css } from "styled-components";
import SortBtn from "../../components/Button/SortBtn";

const MaintContainer = styled.div`
  padding: 20px 32px;
  flex: 1;
  overflow-y: scroll;
  max-height: calc(100vh - 93px);

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  }
  transition: all 0.5s ease;
  @media (min-width: 651px) {
    ${(props) =>
      props.isSidebar &&
      css`
        margin-left: 60px;
      `};
    ${(props) =>
      !props.isSidebar &&
      css`
        margin-left: 300px;
      `};
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ListUser = styled.div`
  @media (min-width: 651px) {
    ${(props) =>
      props.isSidebar &&
      css`
        width: calc(100vw - 124px);
        max-width: calc(100vw - 92px);
      `};
    ${(props) =>
      !props.isSidebar &&
      css`
        width: calc(100vw - 364px);
        max-width: calc(100vw - 332px);
      `};
  }
  @media (max-width: 650px) {
    width: calc(100vw - 64px);
  }
`;
const LiTh = styled.li`
  display: flex;
  align-items: center;
`;

const SystemPage = memo(() => {
  // context modal
  const { setIsAdd, setUserId, setModal, isAdd, isSidebar } =
    useContext(AdminContext);
  // loading
  const [loading, setLoading] = useState(false);

  // data user
  const [dataUser, setDataUser] = useState([]);
  // paging
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(5);
  // active btn
  const [currentBtn, setCurrentBtn] = useState(1);
  const [decreaseBtn, setDecreaseBtn] = useState(1);
  // search
  const [search, setSearch] = useState("");
  // filter theo inactive
  const [inActive, setInAtive] = useState("");
  //  filter theo role
  const [filRole, setFilrole] = useState("");
  // sortby
  const [sortBy, setSortBy] = useState("");
  // date start
  const [dateStart, setDateStart] = useState("");
  // date start
  const [dateEnd, setDateEnd] = useState("");
  // url
  let url = "http://wlp.howizbiz.com/api/users";
  let pageParam = `?paginate=true&page=${page}&perpage=${perpage}`;
  let urlUser =
    url +
    pageParam +
    `&with=roles,createdBy,provinces&search=${search}${inActive}${filRole}${sortBy}${dateStart}${dateEnd}`;

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await getData(urlUser);
        setDataUser(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [urlUser, isAdd]);

  // đổi itemPerpage
  const changePerpage = (e) => {
    setPerpage(e.target.value);
    setPage(1);
    setCurrentBtn(1);
    setDecreaseBtn(1);
  };

  // click button page
  const onCurrentPage = useCallback((value) => {
    setPage(value);
    setCurrentBtn(value);
    setDecreaseBtn(value);
  }, []);

  // click next previous button
  const onChangePage = (value) => {
    if (page < totalPage || page > 1) {
      setPage(page + value);
      setCurrentBtn(page + value);
      setDecreaseBtn(page + value);
    }
  };
  // search name and phoneNumber
  const searchIntput = useDebounce((e) => {
    e.target.value !== "" ? setSearch(e.target.value) : setSearch("");
    setPage(1);
    setCurrentBtn(1);
    setDecreaseBtn(1);
  }, 500);

  // filter theo trangj thai
  const filterInActive = (e, callback) => {
    callback(e);
    setPage(1);
    setCurrentBtn(1);
    setDecreaseBtn(1);
  };
  // filter theo day
  const filterDateStart = (e) => {
    const day = e && e.split("-").reverse().join("%2F");
    day ? setDateStart("&date_start=" + day) : setDateStart("");
    setPage(1);
    setCurrentBtn(1);
    setDecreaseBtn(1);
  };
  const filterDateSEnd = (e) => {
    const day = e && e.split("-").reverse().join("%2F");
    day ? setDateEnd("&date_start=" + day) : setDateEnd("");
    setPage(1);
    setCurrentBtn(1);
    setDecreaseBtn(1);
  };
  let Btn = [];
  let totalPage =
    dataUser.length !== 0
      ? Math.ceil(dataUser.pagination.total / dataUser.pagination.itemsPerPage)
      : 1;
  for (let i = 0; i < totalPage; i++) {
    Btn.push(
      <BtnPagination
        key={i + 1}
        function={onCurrentPage}
        value={i + 1}
        title={i + 1}
        activeClass={currentBtn === i + 1 ? "in-active" : ""}
        unActive={currentBtn === i + 1 ? "un-active" : ""}
      />
    );
  }
  return (
    <MaintContainer isSidebar={isSidebar}>
      <div className="user-title">
        <div className="icon-title">
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="title">Danh sách người dùng</div>
      </div>
      <div className="nav-btn">
        <div className="wrap-search">
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              onChange={(e) => searchIntput(e)}
              placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            />
          </div>
        </div>

        <button
          className="btn btn-danger"
          onClick={() => {
            setIsAdd(true);
            setModal("create");
          }}
        >
          + Thêm mới
        </button>
      </div>
      <div className="filter-nav">
        <div className="inputbf">
          <div className="filter">
            <select
              className="select"
              onChange={(e) => filterInActive(e.target.value, setInAtive)}
            >
              <option value={""}>Toàn bộ</option>
              <option value={"&inactive=false"}>Hoạt động</option>
              <option value={"&inactive=true"}>Vô hiệu</option>
            </select>
            <label>Trạng thái</label>
          </div>
        </div>
        <div className="inputbf">
          <div className="filter">
            <select
              className="select"
              required
              onChange={(e) => filterInActive(e.target.value, setFilrole)}
            >
              <option value={""}></option>
              <option value={"&role_id=1"}>Quản trị hệ thống</option>
              <option value={"&role_id=2"}>Ban quản lý dự án</option>
              <option value={"&role_id=3"}>Cơ quan chính phủ</option>
              <option value={"&role_id=4"}>Chính quyền địa phương</option>
              <option value={"&role_id=5"}>
                Ban quản lý VQG/KBT và các bên liên quan
              </option>
            </select>
            <label>Quyền</label>
          </div>
        </div>
        <div className="inputbf">
          <div className="filter">
            <input
              type="date"
              onChange={(e) => filterDateStart(e.target.value)}
              placeholder=" "
              required
            />
            <label type="date">Ngày bắt đầu</label>
          </div>
        </div>
        <div className="inputbf">
          <div className="filter">
            <input
              type="date"
              onChange={(e) => filterDateSEnd(e.target.value)}
              placeholder=" "
              required
            />
            <label type="date">Ngày kết thúc</label>
          </div>
        </div>
      </div>
      <LineLoading isload={loading} />

      <div className="table-user">
        <ListUser isSidebar={isSidebar} className="list-user">
          <ul className="col-name">
            <LiTh>
              Tên hiển thị
              <SortBtn value="name" sortBy={sortBy} setSortBy={setSortBy} />
            </LiTh>
            <LiTh>
              Tên đăng nhập
              <SortBtn value="username" sortBy={sortBy} setSortBy={setSortBy} />
            </LiTh>
            <li>Số điện thoại</li>
            <LiTh className="small">
              Trạng thái
              <SortBtn value="inactive" sortBy={sortBy} setSortBy={setSortBy} />
            </LiTh>
            <li className="role-item">Quyền</li>
            <LiTh>
              Ngày tạo
              <SortBtn
                value="created_at"
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </LiTh>
            <li>Hành động</li>
          </ul>
          {dataUser.length !== 0 &&
            dataUser.list.map((data, i) => {
              return (
                <ul key={i}>
                  <li>{data.name}</li>
                  <li>{data.username}</li>
                  <li>{data.mobile}</li>
                  <li className="small">
                    {dataUser.inActive ? (
                      <BtnActive active="unactive" />
                    ) : (
                      <BtnActive active="" />
                    )}
                  </li>
                  <li className="role-item">
                    {data.roles.map((role, i) => {
                      return (
                        <p
                          key={i}
                          style={{
                            color: role.meta["text-color"],
                            backgroundColor: role.meta.color,
                            padding: "4px",
                            margin: "2px",
                          }}
                        >
                          {role.name}
                        </p>
                      );
                    })}
                  </li>
                  <li>{data["created_at"].split(" ")[0]}</li>
                  {data.roles.some((role) => role.id === 2 || role.id === 1) ? (
                    <li className="d-flex action">
                      <FTButton unclick={true}>
                        <i
                          style={{ color: "rgba(0,0,0,0.3)" }}
                          className="fa-solid fa-unlock-keyhole"
                        ></i>
                      </FTButton>
                      <FTButton unclick={true}>
                        <i
                          style={{ color: "rgba(0,0,0,0.3)" }}
                          className="fa-solid fa-pen"
                        ></i>
                      </FTButton>
                      <FTButton unclick={true}>
                        <i
                          style={{ color: "rgba(0,0,0,0.3)" }}
                          className="fa-solid fa-trash-can"
                        ></i>
                      </FTButton>
                    </li>
                  ) : (
                    <>
                      <li className="d-flex action">
                        <FTButton key={0}>
                          <i
                            style={{
                              color: `rgba(0,0,0,0.54)`,
                            }}
                            className="fa-solid fa-unlock-keyhole"
                          ></i>
                        </FTButton>
                        <FTButton
                          key={1}
                          click={() => {
                            setIsAdd(true);
                            setUserId(data);
                            setModal("update");
                          }}
                        >
                          <i
                            style={{
                              color: "#da2a1c",
                            }}
                            className="fa-solid fa-pen"
                          ></i>
                        </FTButton>
                        <FTButton
                          key={2}
                          click={() => {
                            setIsAdd(true);
                            setUserId(data);
                            setModal("delete");
                          }}
                        >
                          <i
                            style={{
                              color: "#da2a1c",
                            }}
                            className="fa-solid fa-trash-can"
                          ></i>
                        </FTButton>
                      </li>
                    </>
                  )}
                </ul>
              );
            })}
        </ListUser>
        <div className="pagin d-flex">
          <div className="perpage-total">
            {dataUser.length !== 0 && (
              <>
                {dataUser.pagination.itemsPerPage * (page - 1) + 1}-
                {dataUser.pagination.itemsPerPage * page >=
                dataUser.pagination.total
                  ? dataUser.pagination.total
                  : dataUser.pagination.itemsPerPage * page}
                /{dataUser.pagination.total}
              </>
            )}
          </div>

          <div className="pagin-btn d-flex">
            <BtnPagination
              key={-1}
              function={onChangePage}
              value={-1}
              title="&#60;"
              activeClass={decreaseBtn === 1 ? "opacity" : ""}
              unActive={decreaseBtn === 1 ? "un-active" : ""}
            />
            {Btn}
            <BtnPagination
              key={0}
              function={onChangePage}
              value={1}
              title="&#62;"
              activeClass={decreaseBtn === totalPage ? "opacity" : ""}
              unActive={decreaseBtn === totalPage ? "un-active" : ""}
            />
          </div>
          <div className="option">
            <select className="select" onChange={(e) => changePerpage(e)}>
              <option value={5}>5/Trang</option>
              <option value={10}>10/Trang</option>
              <option value={25}>25/Trang</option>
              <option value={50}>50/Trang</option>
            </select>
          </div>
        </div>
      </div>
    </MaintContainer>
  );
});

const BtnActive = memo((props) => {
  return <div className={"btnactive " + props.active}></div>;
});

export default SystemPage;
