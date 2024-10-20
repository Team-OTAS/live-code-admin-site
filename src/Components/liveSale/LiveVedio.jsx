import React from "react";

const resdata = [
  {
    products: {
      created_at: "2024-06-17T17:04:28.000000Z",
      deleted_at: null,
      description: "Good Quality",
      discount: null,
      discount_option: null,
      id: 10,
      image: "https://picsum.photos/200/300",
      name: "Nike",
      price: "120000.00",
      quantity: 19,
      sale_code: "A011",
      shop_id: "S-00000004",
      unit: "pair",
      updated_at: "2024-10-19T13:48:24.000000Z",
    },
    shopId: "S-00000004",
  },
];

const LiveVideoPlayer = ({ streamUrl }) => {
  return (
    <div className="live-video-player">
      <iframe
        title="live-video"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen="true"
        frameborder="0"
        height="768"
        scrolling="no"
        src="https://www.facebook.com/plugins/video.php?width=432&href=https%3A%2F%2Fwww.facebook.com%2F301594299590530%2Fvideos%2F1573637693421917"
        style={{ border: "none", overflow: "hidden" }}
        width="350"
      ></iframe>
    </div>
  );
};

export default LiveVideoPlayer;

// return prevData.map((item)=>{
//   if(item.id === liveData.products[0].id){
//     return {
//       ...item,
//       quantity: item.quantity - 1,
//     }
//   }
//   return item;
// })
// })
