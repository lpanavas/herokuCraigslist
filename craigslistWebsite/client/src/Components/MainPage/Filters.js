import React from "react";

import "../../style/filters.css";

const Filters = (props) => {
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log("event.target", event.target);
    console.log("handleInputChange", name, value);
    console.log("props.filterArray", props.filterArray);

    props.setFilterArray({
      ...props.filterArray,
      [name]: event.target.value,
    });
  };

  return (
    <div className="filters">
      <form>
        <label>
          Search
          <input
            type="text"
            value={props.filterArray.searching}
            name="searching"
            onChange={handleInputChange}
            // value={props.searching}
            // // onChange={(evt) => props.setSearch(evt.target.value)}
            // onChange={(evt) =>
            //   props.setFilterArray({
            //     ...props.filterArray,
            //     searching: evt.target.value,
            //     priceLow: props.priceLow,
            //     priceHigh: props.priceHigh,
            //   })
            // }
          />
        </label>
        <label>
          Min Price
          <input
            type="number"
            value={props.filterArray.priceLow}
            name="priceLow"
            onChange={handleInputChange}
            // value={props.priceLow}
            // // onChange={(evt) => props.setLowPrice(evt.target.value)}
            // onChange={(evt) =>
            //   props.setFilterArray({
            //     ...props.filterArray,
            //     priceLow: evt.target.value,
            //   })
            // }
          />
        </label>
        <label>
          Min Price
          <input
            type="number"
            value={props.filterArray.priceHigh}
            name="priceHigh"
            onChange={handleInputChange}
            // value={props.priceHigh}
            // onChange={(evt) =>
            //   props.setFilterArray({
            //     ...props.filterArray,
            //     priceHigh: evt.target.value,
            //   })
            // }
          />
        </label>
      </form>
      <label>
        Your Likes
        <input
          name="Your Likes"
          type="checkbox"
          onClick={() => {
            props.setFindLikes(!props.findLikes);
          }}
        />
      </label>
    </div>
  );
};

export default Filters;
