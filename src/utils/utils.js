export const VietnameseProvinces = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Phú Yên",
    "Cần Thơ",
    "Đà Nẵng",
    "Hải Phòng",
    "Hà Nội",
    "TP Hồ Chí Minh"
];
export const validationPatterns = {
    name: {
        pattern: /^[^\d\s][\p{L}'\s-]{4,49}$/u,
        message: 'Tên phải có ít nhất 5 ký tự ~',
    },
    phoneNumber: {
        pattern: /^(0|\+84)[1-9]\d{8}$/,
        message: 'Số điện thoại phải bắt đầu bằng 0, 10 số, không được có ký tự!',
    },
    email: {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: 'Email không đúng định dạng !',
    },
    number: {
        pattern: /^[1-9]\d{3}^$/,
        message: 'Min is 1 and just have number!',
    },
    password: {
        pattern: /^(?=^.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
        message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 6 ký tự, ít nhất 1 số!"
    }
};

export const fadeIn = ({ direction, duration, delay, space }) => {
    return {
        hidden: {
            y: direction === 'up' ? (space || 40) : direction === 'down' ? (-space || -40) : 0,
            x: direction === 'left' ? (space || 40) : direction === 'right' ? (-space || -40) : 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: duration ? duration : 1.3,
                delay: delay ? delay : 0.1,
                ease: [0.2, 0.2, 0.3, 0.3],
            },
        },
    }
}