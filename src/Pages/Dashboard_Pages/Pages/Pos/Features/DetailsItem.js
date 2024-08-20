import "./DetailsItem.css";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function DetailsItem({ visible, cartItem, modalClose }) {
  const [staticModalVisible, setStaticModalVisible] = useState(visible);
  const [mealSize, setMealSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [selectedExtras, setSelectedExtras] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState();

  useEffect(() => {
    if (cartItem) {
      setMealSize(cartItem.meal_size_costs || []);
      setSelectedSize(cartItem.meal_size_costs[0]?.size || null);
    }
    setStaticModalVisible(visible);
  }, [cartItem, visible]);

  const handleSelectItem = (item, type) => {
    const updateFunction =
      type === "addon" ? setSelectedAddons : setSelectedExtras;

    updateFunction((prev) => {
      if (!Array.isArray(prev)) {
        prev = [];
      }

      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value) || 1);
  };

  const handleAddToCart = () => {
    const addons = Array.isArray(selectedAddons) ? selectedAddons : [];
    const extras = Array.isArray(selectedExtras) ? selectedExtras : [];

    const storeItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const newItem = {
      id: cartItem.id,
      name: cartItem.name,
      sizes: [
        {
          size: selectedSize,
          cost: mealSize.find((size) => size.size === selectedSize)?.cost || 0,
          quantity,
        },
      ],
      addons: addons.map(({ id, name, cost, quantity }) => ({
        id,
        name,
        cost,
        quantity,
      })),

      extras: extras.map(({ id, name, cost, quantity }) => ({
        id,
        name,
        cost,
        quantity,
      })),
    };

    const finalizeCartUpdate = () => {
      storeItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(storeItems));
      const event = new Event("storageUpdated");
      window.dispatchEvent(event);
      handleModalReset();
      modalClose();
    };

    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");

      setTimeout(() => {
        document.getElementById("Loader").classList.remove("show");
        finalizeCartUpdate();
      }, 1500);
    } else {
      finalizeCartUpdate();
    }
  };

  const handleModalReset = () => {
    setQuantity(1);
    setSelectedSize(1);
    setSelectedAddons(null);
    setSelectedExtras(null);
    setNotes("");
  };

  const convert = (value) => {
    return value === 1
      ? "small"
      : value === 2
      ? "medium"
      : value === 3
      ? "big"
      : value === 4
      ? "family"
      : "none";
  };

  return (
    <div className={`DetailsItem ${staticModalVisible ? "visible" : ""}`}>
      <form className="modal-content">
        <i className="fas fa-xmark xmarkModalClose" onClick={modalClose}></i>
        <div className="modal-body">
          <div className="item">
            <div className="item-img">
              <img
                src={`http://localhost:8000/storage/${cartItem.image}`}
                alt={cartItem.name}
              />
            </div>
            <div className="item-text">
              <b>{cartItem.name}</b>
              <p>{cartItem.description}</p>
              <b>
                $
                {mealSize.find((size) => size.size === selectedSize)?.cost || 0}
              </b>
            </div>
          </div>

          <div className="quantity">
            <label>Quantity</label>
            <div>
              <AiOutlinePlusCircle
                onClick={() => setQuantity((quantity) => quantity + 1)}
              />
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <AiOutlineMinusCircle
                onClick={() =>
                  setQuantity((quantity) => Math.max(quantity - 1, 1))
                }
                className={quantity === 1 ? "disabled-icon" : ""}
              />
            </div>
          </div>

          <div className="sizes">
            <label>Meal Size Costs</label>
            <div>
              {mealSize.map((size) => (
                <div key={size.id} className="size">
                  <input
                    type="radio"
                    name="size"
                    id={convert(size.size)}
                    value={size.size}
                    checked={size.size === selectedSize}
                    onChange={() => setSelectedSize(size.size)}
                  />
                  <label htmlFor={convert(size.size)}>
                    {convert(size.size)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {Object(cartItem.addons).length > 0 && (
            <div className="addons">
              <label>Addons</label>
              <div className="length">
                {cartItem.addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="addon"
                    onClick={() => handleSelectItem(addon, "addon")}
                  >
                    <div className="addon-img">
                      <img
                        src={`http://localhost:8000/storage/${addon.image}`}
                        alt={addon.name}
                      />
                    </div>
                    <div className="addon-text">
                      <p>{addon.name}</p>
                      <p className="cost">${addon.cost}</p>
                      <div className="quantity">
                        <input
                          type="number"
                          name={`addon_quantity_${addon.id}`}
                          value={selectedAddons[addon.id] || 0}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Object(cartItem.extras).length > 0 && (
            <div className="extras">
              <label>Extras</label>
              <div className="length">
                {cartItem.extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="extra"
                    onClick={() => handleSelectItem(extra, "extra")}
                  >
                    <div className="extra-img">
                      <img
                        src={`http://localhost:8000/storage/${extra.image}`}
                        alt={extra.name}
                      />
                    </div>
                    <div className="extra-text">
                      <p>{extra.name}</p>
                      <p className="cost">${extra.cost}</p>
                      <div className="quantity">
                        <input
                          type="number"
                          name={`extra_quantity_${extra.id}`}
                          value={selectedExtras[extra.id] || 0}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="notes">
            <label>Notes</label>
            <textarea
              rows="3"
              value={notes}
              className="form-control"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            type="button"
            className="btn form-control mt-3 fw-bold"
            onClick={() => handleAddToCart()}
          >
            <span>
              Add to Cart - $
              {mealSize.find((size) => size.size === selectedSize)?.cost || 0}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
