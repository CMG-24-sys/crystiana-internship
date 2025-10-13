import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="section-top-sellers" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div className="col-lg-12">
            <div className="top-sellers-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
              {loading
                ? skeletonArray.map((_, idx) => (
                    <div className="nft_coll" key={idx} style={{ width: '180px' }}>
                      <div className="nft_coll_pp">
                        <div className="skeleton skeleton-avatar" style={{ width: "60px", height: "60px", borderRadius: "50%" }}></div>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton skeleton-title" style={{ width: "80px", height: "20px", marginBottom: "8px" }}></div>
                        <div className="skeleton skeleton-code" style={{ width: "40px", height: "16px" }}></div>
                      </div>
                    </div>
                  ))
                : sellers.map((seller, idx) => (
                    <div className="nft_coll" key={idx} style={{ width: '180px' }}>
                      <div className="nft_coll_pp">
                        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={seller.authorImage}
                              alt={seller.authorName}
                              style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                objectPosition: 'center',
                                display: 'block',
                                border: '4px solid #b071e3',
                                margin: '0 auto',
                              }}
                            />
                          </Link>
                        </div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/author/${seller.authorId}`}>
                          <h4>{seller.authorName}</h4>
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;