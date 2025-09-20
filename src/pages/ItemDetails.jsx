import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const location = useLocation();
  const params = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get nftId from route params or state
  const nftId = location.state?.itemData?.nftId || location.state?.collectionData?.nftId || params.nftId;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (nftId) {
      setLoading(true);
      fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
        .then(res => res.json())
        .then(data => {
          setItemDetails(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [nftId]);

  if (loading) return <div>Loading...</div>;
  if (!itemDetails) return <div>No item details found.</div>;

  const displayData = {
    title: itemDetails.title || "Rainbow Style #194",
    nftImage: itemDetails.nftImage || nftImage,
    price: itemDetails.price || "1.85",
    nftId: itemDetails.nftId || "default",
    likes: itemDetails.likes || Math.floor(Math.random() * 100) + 25,
    views: itemDetails.views || Math.floor(Math.random() * 200) + 50,
    ownerImage: itemDetails.ownerImage || AuthorImage,
    ownerName: itemDetails.ownerName || "Owner",
    ownerId: itemDetails.ownerId || "default",
    creatorImage: itemDetails.creatorImage || AuthorImage,
    creatorName: itemDetails.creatorName || "Creator",
    creatorId: itemDetails.creatorId || "default",
  };

  const hasData = !!itemDetails;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={displayData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={displayData.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{displayData.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {displayData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {displayData.likes}
                    </div>
                  </div>
                  <p>
                    {hasData ? 
                      `This unique NFT "${displayData.title}" is part of an exclusive collection featuring distinctive digital artwork. Each piece represents the creative vision and artistic excellence that defines this collection.` :
                      "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                    }
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${displayData.ownerId}`}>
                            <img className="lazy" src={displayData.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${displayData.ownerId}`}>
                            {displayData.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${displayData.creatorId}`}>
                            <img className="lazy" src={displayData.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${displayData.creatorId}`}>
                            {displayData.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{displayData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
