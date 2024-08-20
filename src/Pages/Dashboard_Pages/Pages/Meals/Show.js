import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { Tabs } from "antd";
import {
  FaInfoCircle,
  FaImage,
  FaThLarge,
  FaPlus,
  FaPuzzlePiece,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import Information from "./Information";
import UploadImage from "../Actions/UploadImage";
import Variations from "./Variations";
import SubExtra from "../SubExtras";
import SubAddon from "../SubAddons";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [addons, setAddons] = useState(null);
  const [extras, setExtras] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMealLoaded, setIsMealLoaded] = useState(false);

  const fetchMeal = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`meals/${id}`);
      setMeal(result);
      setIsMealLoaded(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchMeal(id);
  }, [id, fetchMeal]);

  const fetchExtras = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/extras`);
      setExtras(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchAddons = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/addons`);
      setAddons(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    if (isMealLoaded && meal) {
      fetchExtras(meal.id);
      fetchAddons(meal.id);
    }
  }, [isMealLoaded, meal, fetchExtras, fetchAddons]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="ShowItem ItemsTabs">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          className="TabPane"
          tab={
            <span>
              <FaInfoCircle />
              Information
            </span>
          }
          key="1"
        >
          {meal && <Information data={meal} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaImage />
              Upload Image
            </span>
          }
          key="2"
        >
          <UploadImage url={`admin/meals/${id}`} data={meal} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaThLarge />
              Variations
            </span>
          }
          key="3"
        >
          <Variations order_id={id} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPlus />
              Extra
            </span>
          }
          key="4"
        >
          <SubExtra order_id={id} data={extras} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPuzzlePiece />
              Addon
            </span>
          }
          key="5"
        >
          <SubAddon order_id={id} data={addons} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
