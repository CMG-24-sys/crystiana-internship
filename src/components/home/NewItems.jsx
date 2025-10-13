import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const skeletonArray = [1, 2, 3, 4];

function CollectionSlide({ item }) {
		// Countdown timer logic
		const [timeLeft, setTimeLeft] = React.useState(0);

		React.useEffect(() => {
			if (!item.expiryDate) return;
			const updateTimer = () => {
				const now = new Date().getTime();
				const end = new Date(item.expiryDate).getTime();
				const diff = end - now;
				setTimeLeft(diff > 0 ? diff : 0);
			};
			updateTimer();
			const interval = setInterval(updateTimer, 1000);
			return () => clearInterval(interval);
		}, [item.expiryDate]);

		// Format timeLeft as HH:MM:SS
		const formatTime = (ms) => {
			if (!ms || ms <= 0) return "00:00:00";
			const totalSeconds = Math.floor(ms / 1000);
			const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
			const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
			const seconds = String(totalSeconds % 60).padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		};

		return (
			<div className="keen-slider__slide">
				<div className="nft_coll">
					<div className="nft_wrap" style={{ position: 'relative' }}>
						<Link to={`/item-details/${item.nftId}`} state={{ collectionData: item }}>
							<img src={item.nftImage} className="lazy img-fluid" alt="" />
							{/* Countdown timer overlay */}
										{item.expiryDate && (
											<div style={{
												position: 'absolute',
												top: 10,
												right: 10,
												background: '#fff',
												color: '#8000ff',
												padding: '4px 10px',
												borderRadius: '40%',
												fontSize: '14px',
												zIndex: 2,
												border: '2px solid #8000ff',
												fontWeight: 'bold',
												boxShadow: '0 2px 8px rgba(128,0,255,0.12)'
											}}>
												{formatTime(timeLeft)}
											</div>
										)}
						</Link>
					</div>
					<div className="nft_coll_pp">
						<Link to={`/author/${item.authorId}`} state={{ authorData: { id: item.authorId, image: item.authorImage } }}>
							<img className="lazy pp-coll" src={item.authorImage} alt="" />
						</Link>
						<i className="fa fa-check"></i>
					</div>
					<div className="nft_coll_info">
						<Link to={`/item-details/${item.nftId}`} state={{ collectionData: item }}>
							<h4>{item.title}</h4>
						</Link>
						<span>{item.code}</span>
					</div>
				</div>
			</div>
		);
}

function SkeletonSlide({ index }) {
	return (
		<div className="keen-slider__slide" key={index}>
			<div className="nft_coll">
				<div className="nft_wrap">
					<div className="skeleton skeleton-img" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
				</div>
				<div className="nft_coll_pp">
					<div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
					<i className="fa fa-check"></i>
				</div>
				<div className="nft_coll_info">
					<div className="skeleton skeleton-title" style={{ width: "60%", height: "20px", marginBottom: "8px" }}></div>
					<div className="skeleton skeleton-code" style={{ width: "40%", height: "16px" }}></div>
				</div>
			</div>
		</div>
	);
}

const NewItems = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [sliderRef, instanceRef] = useKeenSlider({
		loop: true,
		slides: { perView: 4, spacing: 10 },
	});

	useEffect(() => {
		fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
			.then((res) => res.json())
			.then((data) => {
				setItems(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	// Force slider update when items load
	useEffect(() => {
		if (!loading && instanceRef.current) {
			instanceRef.current.update();
		}
	}, [loading, items]);

	return (
		<section id="section-new-items" className="no-bottom">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="text-center">
							<h2>New Items</h2>
							<div className="small-border bg-color-2"></div>
						</div>
					</div>
					<div style={{ position: 'relative' }}>
						<button
							className="keen-arrow keen-arrow--left"
							style={{ position: 'absolute', left: 0, top: '40%', zIndex: 2 }}
							onClick={() => instanceRef.current && instanceRef.current.prev()}
							aria-label="Previous"
						>
							&#8592;
						</button>
						<button
							className="keen-arrow keen-arrow--right"
							style={{ position: 'absolute', right: 0, top: '40%', zIndex: 2 }}
							onClick={() => instanceRef.current && instanceRef.current.next()}
							aria-label="Next"
						>
							&#8594;
						</button>
						<div ref={sliderRef} className="keen-slider">
							{loading
								? skeletonArray.map((_, index) => (
										<SkeletonSlide key={index} index={index} />
									))
								: items.map((item, index) => (
										<CollectionSlide key={index} item={item} />
									))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NewItems;
