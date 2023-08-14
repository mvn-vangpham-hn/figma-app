import React, { useState } from "react";
import "./TreeNode.css";

const TreeNode = ({ data, traslateText }) => {
  const [isShowChirldren, setIsShowChirldren] = useState(true);
  const [isTraslating, setIsTraslating] = useState(false);
  const [textTraslate, setTextTraslate] = useState("");

  const handleTranslate = async () => {
    if (data.type === "TEXT") {
      setIsTraslating(true);
      const text = await traslateText(data.characters);
      if (text) {
        setTextTraslate(text);
        setIsTraslating(false);
      }
    }
  };
  return (
    <li>
      <div
        className={`tree-node ${data.type === "TEXT" && "tree-text"}`}
        onClick={handleTranslate}
      >
        <div>
          <b> ID: </b>
          {data.id}
        </div>
        <div>
          <b>Type: </b>
          {data.type}
        </div>
        <div>
          <b>Name: </b>
          {data?.characters || data.name}
        </div>
        {textTraslate && (
          <div>
            <b>Translate Vietnamese: </b>
            {textTraslate}
          </div>
        )}
        {isTraslating && (
          <div>
            <b>Traslating...</b>
          </div>
        )}

        {data.children && (
          <b
            onClick={() => setIsShowChirldren((value) => !value)}
            className="show-more"
          >
            {isShowChirldren ? "-" : "+"}
          </b>
        )}
      </div>
      {isShowChirldren && data.children && (
        <ul>
          {data.children.map((item, index) => (
            <TreeNode key={index} data={item} traslateText={traslateText} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
