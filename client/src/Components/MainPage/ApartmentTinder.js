import React from "react";
import { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import {
  Card,
  CardImg,
  Container,
  CardText,
  CardFooter,
  Button,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

import "react-slideshow-image/dist/styles.css";
import "../../style/aptTinder.css";
import thumbsDown from "../../images/ThumbsDown.PNG";
import thumbsUp from "../../images/ThumbsUp.png";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
const ApartmentTinder = (props) => {
  const [changeImage, setChangeImage] = useState("");

  const setDislike = async (id) => {
    await fetch("/setDislike", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
        // "Access-Control-Allow-Headers", "Content-Type"
      },

      body: JSON.stringify({
        postId: id,
        username: props.currentUser.username,
      }),
    });
  };
  const setLike = async (id) => {
    await fetch("/setLike", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
        // "Access-Control-Allow-Headers", "Content-Type"
      },

      body: JSON.stringify({
        postId: id,
        username: props.currentUser.username,
      }),
    });
  };
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  const checkDislikes = (p) => {
    if (p.dislikes !== undefined) {
      for (var i = 0; i < p.dislikes.length; i++) {
        console.log("dislike", p.dislikes[i]);
        if (p.dislikes[i].username !== props.currentUser.username) {
          return p;
        }
      }
    } else {
      return p;
    }
  };

  const checkLikes = (p) => {
    if (p.likes !== undefined) {
      for (var i = 0; i < p.likes.length; i++) {
        if (p.likes[i].username !== props.currentUser.username) {
          return p;
        }
      }
    } else {
      return p;
    }
  };
  const displayPagination = () => {
    const returnPosts = props.posts.filter(
      (p) =>
        p["result-title"].includes(props.filterArray.searching) &&
        Number(p.actualPrice) >= props.filterArray.priceLow &&
        Number(p.actualPrice) <= props.filterArray.priceHigh &&
        checkDislikes(p) &&
        checkLikes(p)
    );
    shuffle(returnPosts);
    var post = Math.floor(Math.random() * returnPosts.length);
    console.log("post number", post);
    console.log(returnPosts.slice(post, post + 1));
    var stringToHTML = function (str) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(str, "text/html");
      return doc.body;
    };
    const finalPosts = returnPosts.slice(post, post + 1).map((p) => (
      <Card>
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
          <div className="makeInline">
            <button
              className="buttonLeft"
              onClick={() => {
                setChangeImage(changeImage + 1);
                setDislike(p._id);
              }}
            >
              <img
                className="likeButton"
                src={thumbsDown}
                alt="website Logo"
              ></img>
            </button>
          </div>
          <div className="tinderBody">
            <CardTitle>
              <strong>{p["result-title"]}</strong>
            </CardTitle>
            <CardSubtitle>
              <span>{p.price}</span>
            </CardSubtitle>
            <CardText className="cardText">
              {ReactHtmlParser(p.postingbody)}
            </CardText>
          </div>
          <div className="makeInline">
            <button
              className="buttonRight"
              onClick={() => {
                setChangeImage(changeImage + 1);
                setLike(p._id);
              }}
            >
              <img
                className="likeButton"
                src={thumbsUp}
                alt="website Logo"
              ></img>
            </button>
          </div>
        </CardBody>
      </Card>
    ));
    // setPost(post + 1);
    console.log(finalPosts);
    return finalPosts;
  };

  return <div>{displayPagination()}</div>;
};

export default ApartmentTinder;
