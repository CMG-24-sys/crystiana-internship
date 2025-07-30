import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authorId) return;
    setLoading(true);
    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authorId]);

  if (loading) return <div>Loading...</div>;
  if (!author) return <div>Author not found.</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {/* Pass author to AuthorItems */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;




// import React from "react";
// import AuthorBanner from "../images/author_banner.jpg";
// import AuthorItems from "../components/author/AuthorItems";
// import { Link } from "react-router-dom";
// import AuthorImage from "../images/author_thumbnail.jpg";

// const Author = () => {
//   return (
//     <div id="wrapper">
//       <div className="no-bottom no-top" id="content">
//         <div id="top"></div>

//         <section
//           id="profile_banner"
//           aria-label="section"
//           className="text-light"
//           data-bgimage="url(images/author_banner.jpg) top"
//           style={{ background: `url(${AuthorBanner}) top` }}
//         ></section>

//         <section aria-label="section">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="d_profile de-flex">
//                   <div className="de-flex-col">
//                     <div className="profile_avatar">
//                       <img src={AuthorImage} alt="" />

//                       <i className="fa fa-check"></i>
//                       <div className="profile_name">
//                         <h4>
//                           Monica Lucas
//                           <span className="profile_username">@monicaaaa</span>
//                           <span id="wallet" className="profile_wallet">
//                             UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
//                           </span>
//                           <button id="btn_copy" title="Copy Text">
//                             Copy
//                           </button>
//                         </h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="profile_follow de-flex">
//                     <div className="de-flex-col">
//                       <div className="profile_follower">573 followers</div>
//                       <Link to="#" className="btn-main">
//                         Follow
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-12">
//                 <div className="de_tab tab_simple">
//                   <AuthorItems />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Author;
