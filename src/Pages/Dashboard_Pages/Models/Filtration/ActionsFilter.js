import React, { useState, useEffect } from "react";
import { Collapse } from "bootstrap";
import { Button, Space } from "antd";
import { CSVLink } from "react-csv";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";
import { FaFileExcel, FaFileExport, FaFilter, FaPlus } from "react-icons/fa";

export default function ActionsFilter({ handleModalToggle, data, headers }) {
  const [pathname, setPathname] = useState();
  useEffect(() => {
    setPathname(window.location.pathname.replace("/admin/dashboard/", ""));
  }, []);

  const generateUniqueFilename = () => {
    const date = new Date();
    const timestamp = `${date.getFullYear()}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${("0" + date.getDate()).slice(-2)}_${(
      "0" + date.getHours()
    ).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${(
      "0" + date.getSeconds()
    ).slice(-2)}`;
    return `${pathname}_${timestamp}.csv`;
  };

  const [filename, setFilename] = useState(generateUniqueFilename());
  const [toggleFilter, setToggleFilter] = useState(false);

  useEffect(() => {
    const myCollapse = document.getElementById("collapseTarget");

    if (myCollapse) {
      const bsCollapse = new Collapse(myCollapse, { toggle: false });
      if (toggleFilter) {
        bsCollapse.show();
        if (!sessionStorage.getItem("origin_data")) {
          sessionStorage.setItem("origin_data", JSON.stringify(data));
        }
      } else {
        bsCollapse.hide();
      }
    }
  }, [toggleFilter]);

  const handleExport = () => {
    var listPrint = document.getElementById("listPrint");
    if (listPrint) listPrint.classList.toggle("show");
  };

  return (
    <div className="head">
      <div className="titlePage">
        {pathname} - {Object(data).length > 0 ? Object(data).length : 0}
      </div>

      <Space className="actions">
        <Button
          icon={<FaFilter />}
          onClick={() => setToggleFilter(!toggleFilter)}
        >
          Filter
          <IoMdArrowDropdown />
        </Button>

        {Object(data).length > 0 ? (
          <>
            <div className="dropListPrint">
              <Button
                icon={<FaFileExport />}
                onClick={handleExport}
                className="btnPrintList"
              >
                Export
                <IoMdArrowDropdown />
              </Button>

              <div className="listPrint" id="listPrint">
                <ul>
                  <li>
                    <Button icon={<LuPrinter />}>Print</Button>
                  </li>
                  <li>
                    <CSVLink
                      data={data}
                      headers={headers}
                      filename={filename}
                      icon={<FaFileExcel />}
                      className="btn CSVLink"
                      onClick={() => setFilename(generateUniqueFilename())}
                    >
                      <FaFileExcel /> CSV
                    </CSVLink>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          false
        )}

        <Button
          type="primary"
          className="AddRow"
          icon={<FaPlus />}
          onClick={handleModalToggle}
        >
          Add {pathname}
        </Button>
      </Space>
    </div>
  );
}
