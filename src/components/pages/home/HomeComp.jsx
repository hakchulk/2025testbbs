import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// 2. Swiper 기본 스타일 (필수)
import "swiper/css";

// 3. 네비게이션, 페이지네이션 등 사용하고 싶은 모듈의 스타일
import "swiper/css/navigation";
import "swiper/css/pagination";

// 4. 네비게이션, 페이지네이션 등 사용할 모듈
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function HomeComp() {
  return (
    <Swiper // 1. 사용할 모듈 설정
      modules={[Navigation, Pagination, Autoplay]}
      // 2. Swiper 옵션 설정 (props로 전달)
      spaceBetween={50} // 슬라이드 간의 간격 (px)
      slidesPerView={1} // 한 번에 보여줄 슬라이드 수
      navigation // 네비게이션 (좌우 화살표) 사용
      pagination={{ clickable: true }} // 페이지네이션 (점) 사용 및 클릭 가능 설정
      loop={true} // 무한 루프
      autoplay={{
        delay: 3000, // 2.5초마다 자동 슬라이드
        disableOnInteraction: true, // 사용자의 조작 후에도 자동 재생 유지
      }}
      // 3. 이벤트 핸들러 (선택 사항)
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      // 사용자 정의 CSS 클래스
      className="mySwiper"
    >
      <SwiperSlide>
        <div
          style={{ width: "100%", height: "200px" }}
          className="d-flex justify-content-center align-items-center bg-info rounded"
        >
          slide 1
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{ width: "100%", height: "200px" }}
          className="d-flex justify-content-center align-items-center bg-info rounded"
        >
          slide 2
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{ width: "100%", height: "200px" }}
          className="d-flex justify-content-center align-items-center bg-info rounded"
        >
          slide 3
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeComp;
