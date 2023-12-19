import React from "react";

const FAQ = () => {
  const faqData = [
    {
      question: "Làm thế nào để tìm hiểu về các sản phẩm mới của chúng tôi?",
      answer: "Bạn có thể xem các sản phẩm mới của chúng tôi trên trang chính.",
    },
    {
      question: "Làm thế nào để đặt hàng và thanh toán?",
      answer: "Để đặt hàng, hãy thêm sản phẩm vào giỏ hàng và tiếp tục đến trang thanh toán.",
    },
    {
      question: "Làm thế nào để kiểm tra tình trạng đơn hàng?",
      answer: "Bạn có thể kiểm tra tình trạng đơn hàng trong phần tài khoản của mình.",
    },
    // Thêm các câu hỏi và trả lời khác tùy theo nhu cầu của bạn
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }} className="faq-container">
      <h2 style={{ color: "#511BB9", fontSize: 40 }}>Câu hỏi thường gặp</h2>
      {faqData.map((item, index) => (
        <div
          key={index}
          style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}
          className="faq-item"
        >
          <h3 style={{ color: "#0070c9" }}>{item.question}</h3>
          <p style={{ color: "#555" }}>{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
