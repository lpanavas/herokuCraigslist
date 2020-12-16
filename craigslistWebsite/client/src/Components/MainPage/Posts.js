import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../style/posts.css";
import { Slide } from "react-slideshow-image";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import {
  Card,
  CardImg,
  Container,
  CardText,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

import ReactHtmlParser from "react-html-parser";
const Posts = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [pageCount, setPageCount] = useState(76);

  console.log("lowPrice", props.lowPrice);
  console.log("filter Array", props.filterArray);

  const PER_PAGE = 40;

  const offset = currentPage * PER_PAGE;

  const pageNumber = () => {
    const returnPosts = props.posts.filter(
      (p) =>
        p["result-title"].includes(props.filterArray.searching) &&
        Number(p.actualPrice) >= props.filterArray.priceLow &&
        Number(p.actualPrice) <= props.filterArray.priceHigh &&
        checkDislikes(p) &&
        checkLikes(p)
    );
    setPageCount(Math.ceil(returnPosts.length / 20));

    displayPagination();
  };
  const checkDislikes = (p) => {
    if (p.dislikes !== undefined) {
      for (var i = 0; i < p.dislikes.length; i++) {
        if (p.dislikes[i].username !== props.currentUser.username) {
          return p;
        }
      }
    } else {
      return p;
    }
  };

  const checkLikes = (p) => {
    if (props.findLikes === true) {
      if (p.likes !== undefined) {
        for (var i = 0; i < p.likes.length; i++) {
          if (p.likes[i].username === props.currentUser.username) {
            return p;
          }
        }
      }
    } else {
      return p;
    }
  };

  const displayPagination = () => {
    return props.posts
      .filter(
        (p) =>
          p["result-title"].includes(props.filterArray.searching) &&
          Number(p.actualPrice) >= props.filterArray.priceLow &&
          Number(p.actualPrice) <= props.filterArray.priceHigh &&
          checkDislikes(p) &&
          checkLikes(p)
      )
      .slice(offset, offset + PER_PAGE)
      .map((p) => (
        <div className="expand">
          <Popup
            trigger={
              <Card className="cardViewStyle">
                <CardSubtitle>
                  <span className="cardSubtitle">{p.price}</span>
                </CardSubtitle>

                <CardImg
                  className="cardImage"
                  src={p.images[0]}
                  alt="party image"
                />
              </Card>
            }
            modal
          >
            {(close) => (
              <div>
                <Card className="popOutAddition">
                  <Slide indicators={true}>
                    {p.images.map((each, index) => (
                      <img
                        key={index}
                        src={each}
                        className="imageStyle"
                        alt="apartment posting"
                      />
                    ))}
                  </Slide>
                  <CardBody>
                    <div className="tinderBody">
                      <CardTitle>
                        <strong>{p["result-title"]}</strong>
                      </CardTitle>
                      <CardSubtitle>
                        <span>{p.price}</span>
                      </CardSubtitle>
                      <CardText className="cardTextPost">
                        {ReactHtmlParser(p.postingbody)}
                      </CardText>
                    </div>
                  </CardBody>
                </Card>
                <button className="close" onClick={close}>
                  &times;
                </button>
              </div>
            )}
          </Popup>
        </div>
      ));
  };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    pageNumber();
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Container fluid>
        <div className="card-columns">{displayPagination()}</div>
      </Container>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default Posts;
