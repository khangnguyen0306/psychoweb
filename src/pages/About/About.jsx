import React, { useState } from "react";
import { UserAddOutlined, TeamOutlined, VideoCameraOutlined, SafetyOutlined, SmileOutlined, GlobalOutlined, ClockCircleOutlined, HomeOutlined, LaptopOutlined, PlusOutlined } from '@ant-design/icons';
import CustomHeader from "../../components/Header/CustomHeader";
import CustomFooter from "../../components/Footer/CustomFooter";
import Image from "../../assets/image/bacsitamli.png";

const About = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="bg-gray-50 pt-40">
      {/* Custom Header */}
      <CustomHeader />

      <section
        className="relative bg-blue-100 py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url(${Image})`, // Correct usage of the image as a URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-3xl p-10 bg-white bg-opacity-90 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Giới thiệu dịch vụ tư vấn</h1>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Dịch vụ tư vấn trực tuyến của chúng tôi mang đến sự tiện lợi và hỗ trợ chuyên nghiệp từ các chuyên gia tâm lý. 
            Bạn có thể dễ dàng kết nối, lên lịch tư vấn, và tham gia các buổi tư vấn từ bất kỳ đâu.
          </p>
          <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-md shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105">
            Đặt lịch ngay
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">Cách thức hoạt động</h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
              <UserAddOutlined className="text-blue-600 text-6xl mb-6 md:mb-0" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900">Đăng ký tài khoản</h3>
                <p className="text-gray-600 mt-2">Tạo tài khoản cá nhân trên nền tảng của chúng tôi chỉ trong vài phút để sử dụng đầy đủ dịch vụ tư vấn.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 text-center md:text-left">
              <TeamOutlined className="text-blue-600 text-6xl mb-6 md:mb-0" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900">Chọn chuyên gia</h3>
                <p className="text-gray-600 mt-2">Lựa chọn từ các chuyên gia tâm lý phù hợp với nhu cầu của bạn.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
              <VideoCameraOutlined className="text-blue-600 text-6xl mb-6 md:mb-0" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900">Tư vấn trực tuyến</h3>
                <p className="text-gray-600 mt-2">Tham gia các buổi tư vấn qua video một cách an toàn và bảo mật.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Benefits Section with Grid Layout */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Lợi ích của dịch vụ trực tuyến</h2>
          <p className="text-gray-600 mb-12 leading-relaxed">Tận dụng những lợi ích của dịch vụ tư vấn trực tuyến giúp bạn dễ dàng chăm sóc sức khỏe tinh thần.</p>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <ClockCircleOutlined className="text-blue-600 text-5xl mb-6" />
              <h3 className="font-semibold text-xl text-gray-900">Linh hoạt thời gian</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">Chọn thời gian phù hợp với lịch trình của bạn để không gián đoạn cuộc sống hàng ngày.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <HomeOutlined className="text-blue-600 text-5xl mb-6" />
              <h3 className="font-semibold text-xl text-gray-900">Tiện lợi tại nhà</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">Tham gia tư vấn ngay tại nhà để giảm căng thẳng và tiện lợi hơn.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <LaptopOutlined className="text-blue-600 text-5xl mb-6" />
              <h3 className="font-semibold text-xl text-gray-900">Sử dụng công nghệ</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">Dịch vụ trực tuyến đảm bảo kết nối ổn định với chất lượng hình ảnh và âm thanh cao.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Icon Backgrounds */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Tại sao chọn chúng tôi?</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="relative bg-blue-100 p-10 rounded-lg shadow-lg w-64">
              <SmileOutlined className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-600 text-5xl" />
              <h3 className="font-semibold text-xl text-gray-900 mt-10">Chuyên gia tận tâm</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">Đội ngũ chuyên gia giàu kinh nghiệm, luôn sẵn sàng hỗ trợ bạn.</p>
            </div>
            <div className="relative bg-blue-100 p-10 rounded-lg shadow-lg w-64">
              <SafetyOutlined className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-600 text-5xl" />
              <h3 className="font-semibold text-xl text-gray-900 mt-10">Bảo mật tuyệt đối</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">Đảm bảo tính riêng tư và bảo mật cho tất cả thông tin của bạn.</p>
            </div>
            <div className="relative bg-blue-100 p-10 rounded-lg shadow-lg w-64">
              <GlobalOutlined className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-600 text-5xl" />
              <h3 className="font-semibold text-xl text-gray-900 mt-10">Dễ dàng truy cập</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">Truy cập dịch vụ từ bất kỳ đâu với chỉ một kết nối Internet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion Style */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Câu hỏi thường gặp</h2>
          <div className="space-y-6">
            {[
              { question: "Làm sao để đặt lịch tư vấn?", answer: "Bạn chỉ cần đăng ký tài khoản, sau đó lựa chọn chuyên gia và đặt lịch trực tuyến. Hệ thống của chúng tôi sẽ gửi xác nhận cho bạn qua email." },
              { question: "Tôi có thể hủy lịch hẹn không?", answer: "Bạn có thể hủy hoặc thay đổi lịch hẹn trước 24 giờ mà không mất phí." },
              { question: "Thông tin tư vấn của tôi có được bảo mật không?", answer: "Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn và nội dung buổi tư vấn." }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <button onClick={() => toggleFAQ(index)} className="flex items-center justify-between w-full">
                  <h3 className="font-semibold text-lg text-gray-900">{item.question}</h3>
                  <PlusOutlined className={`transform transition-transform duration-300 ${expandedFAQ === index ? "rotate-45" : ""}`} />
                </button>
                {expandedFAQ === index && <p className="text-gray-600 mt-4">{item.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Footer */}
      <CustomFooter />
    </div>
  );
};

export default About;
