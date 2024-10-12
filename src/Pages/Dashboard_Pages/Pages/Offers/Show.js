import "./Offers.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { FaImage } from "react-icons/fa6";
import {
  FaPlus,
  FaPuzzlePiece,
  FaInfoCircle,
  FaShoppingBag,
} from "react-icons/fa";
import Information from "./Information";
import UploadImage from "../Actions/UploadImage";
import Items from "./Items";
import SubExtra from "./SubExtras";
import SubAddon from "./SubAddons";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOffer = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/offers/${id}`);
      setOffer(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOffer(id);
  }, [id, fetchOffer]);

  if (loading) return <p>loading...</p>;

  return (
    <div className="Show">
      <div className="tabs">
        <Tabs defaultActiveKey="1">
          <TabPane
            className="TabPane"
            tab={
              <span>
                <FaInfoCircle />
                Information
              </span>
            }
            key="1"
          >
            {offer && <Information data={offer} />}
          </TabPane>

          <TabPane
            className="TabPane"
            tab={
              <span>
                <FaImage />
                Upload Image
              </span>
            }
            key="2"
          >
            <UploadImage url={`admin/offers/${id}`} data={offer} />
          </TabPane>

          <TabPane
            className="TabPane"
            tab={
              <span>
                <FaShoppingBag />
                Items
              </span>
            }
            key="3"
          >
            <Items id={id} />
          </TabPane>

          <TabPane
            className="TabPane"
            tab={
              <span>
                <FaPlus />
                Extra
              </span>
            }
            key="4"
          >
            <SubExtra order_id={id} />
          </TabPane>

          <TabPane
            className="TabPane"
            tab={
              <span>
                <FaPuzzlePiece />
                Addon
              </span>
            }
            key="5"
          >
            <SubAddon order_id={id} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
