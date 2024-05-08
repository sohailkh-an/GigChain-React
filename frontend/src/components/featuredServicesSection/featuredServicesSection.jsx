import { useEffect, useState } from "react";
import ServiceCard from "../featuredGigCard/featuredGigCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles/featuredServicesSectionStyles.module.scss";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

// function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, backgroundColor: "black", borderRadius: "100%"}}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "transparent", width: "40px", height: "40px" }}
//       onClick={onClick}
//     />
//   );
// }

function FeaturedServicesSection(props) {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  const { currentUser } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchGigsByCategory(category) {
      try {
        const response = await axios.get(
          `https://gigchain-backend.vercel.app/api/gig/category/${category}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching featured services:", error);
      }
    }

    fetchGigsByCategory(props.serviceType);
  }, [props.serviceType]);

  // services.map((service) => {
  //   console.log("Coming from the work area: ", service.gigId);
  // });

  return (
    <>
      <h2>Featured in {props.serviceType} </h2>
      <section className={styles.featuredServices_main_container}>
        {/* <Slider {...sliderSettings}> */}
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
        {/* </Slider> */}
      </section>
    </>
  );
}

export default FeaturedServicesSection;
