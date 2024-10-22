import React, { useEffect } from 'react';
import './slider.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Slider = () => {
    useEffect(() => {
        const diChuyenDenMucTiepTheo = () => {
            let danhSach = document.querySelectorAll('.item');
            document.getElementById('slide').appendChild(danhSach[0]);
        };

        const diChuyenDenMucTruocDo = () => {
            let danhSach = document.querySelectorAll('.item');
            document.getElementById('slide').prepend(danhSach[danhSach.length - 1]);
        };

        // Chức năng chuyển slider khi bấm 'Tiếp'
        document.getElementById('next').onclick = diChuyenDenMucTiepTheo;

        // Chức năng chuyển slider khi bấm 'Trước'
        document.getElementById('prev').onclick = diChuyenDenMucTruocDo;

        // Tự động chuyển sang mục tiếp theo mỗi 5 giây
        const interval = setInterval(diChuyenDenMucTiepTheo, 5000);

        // Xóa interval khi component bị hủy
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <div id="slide">
                <div className="item item1">
                    <div className="content">
                        <div className="name">Lắng Nghe Tâm Hồn Bạn</div>
                        <div className="des">Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn vượt qua mọi thử thách tinh thần.</div>
                        <button className='button-more'>Khám Phá Ngay</button>
                    </div>
                </div>
                <div className="item item2">
                    <div className="content">
                        <div className="name">Sức Khỏe Tâm Thần Quan Trọng</div>
                        <div className="des">Đừng bỏ qua các dấu hiệu của căng thẳng, lo âu hoặc trầm cảm. Chúng tôi sẽ giúp bạn.</div>
                        <button className='button-more'>Tìm Hiểu Thêm</button>
                    </div>
                </div>
                <div className="item item3">
                    <div className="content">
                        <div className="name">Chuyên Gia Tâm Lý Hàng Đầu</div>
                        <div className="des">Đội ngũ chuyên gia của chúng tôi được đào tạo bài bản và luôn hết lòng vì sức khỏe của bạn.</div>
                        <button className='button-more'>Đặt Lịch Tư Vấn</button>
                    </div>
                </div>
                <div className="item item4">
                    <div className="content">
                        <div className="name">Phương Pháp Điều Trị Hiệu Quả</div>
                        <div className="des">Chúng tôi áp dụng những phương pháp điều trị tiên tiến nhất phù hợp với từng cá nhân.</div>
                        <button className='button-more'>Xem Phương Pháp</button>
                    </div>
                </div>
                <div className="item item5">
                    <div className="content">
                        <div className="name">Hỗ Trợ 24/7</div>
                        <div className="des">Chúng tôi luôn ở đây, bất kể thời gian, để giúp bạn vượt qua những khoảnh khắc khó khăn.</div>
                        <button className='button-more'>Liên Hệ Ngay</button>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button className="button-default" id="prev">
                    <LeftOutlined style={{ color: '#fff', fontSize: '20px' }} />
                </button>
                <button className="button-default" id="next">
                    <RightOutlined style={{ color: '#fff', fontSize: '20px' }} />
                </button>
            </div>
        </div>
    );
};

export default Slider;
