import styles from "./ControllerPage.module.css";
import ControllerLayout from "../../layouts/ControllerLayout";
import headerImg1 from "../../assets/images/Back.svg";
import headerImg2 from "../../assets/images/Home.svg";
import { useNavigate, useParams } from "react-router-dom";
import { DATA } from "../../utils/data";
import { useEffect, useState } from "react";
import { usePeer } from "../../utils/PeerContext";
import ButtonGrid from "../../comps/ButtonGrid";

function ControllerPage() {
  const { id } = useParams();
  const [controllerData, setControllerData] = useState({});
  const navigate = useNavigate();
  const { dataChannel } = usePeer();

  useEffect(() => {
    if (id) {
      setControllerData(DATA[id].controller);
    }
  }, [id]);

  const clickHandler = (next) => {
    if (dataChannel && dataChannel.open) {
      dataChannel.send({
        action: "navigate",
        next,
      });
      navigate(`/controller/${next}`);
    }
  };
  let url = window.location.origin;
  const mediaType = controllerData?.body?.mediaType;
  let mediaLink = controllerData?.body?.mediaLink;
  mediaLink = mediaLink?.replace(/\s/g, "_")?.replace(/_&_/g, "_");
  if (mediaType === "video") {
    url =
      "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/";
  } else {
    url =
      "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/";
  }
  url += mediaLink;

  function handleClickHome() {
    dataChannel?.send({
      action: "navigate",
      next: 0,
    });
    navigate(`/controller`);
  }

  function handleClickBack() {
    dataChannel?.send({
      action: "navigate",
      next: -1,
    });
    navigate(-1);
  }

  return (
    <ControllerLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            onClick={handleClickBack}
            className={styles.homeImg}
            src={headerImg1}
            alt="header-img-2"
          />
          <div className={styles.title}>
            <h2>{controllerData.title}</h2>
          </div>
          <img
            onClick={handleClickHome}
            className={styles.homeImg}
            src={headerImg2}
            alt="header-img-2"
          />
        </div>
        <section className={styles.centerContainer}>
          <div className={styles.boxHome}>
            {/* <div className={styles.innerCard}>
              <img src={logo} alt="logo" />
            </div> */}
            {controllerData?.body?.mediaLink && (
              <div className={styles.innerCard}>
                {controllerData?.body?.mediaType === "image" ? (
                  <img src={url} alt="media" />
                ) : (
                  <video src={url} autoPlay muted loop />
                )}
              </div>
            )}
            <h3>{controllerData?.body?.description}</h3>
            <div className={styles.buttons}>
              <ButtonGrid
                buttons={controllerData?.body?.buttons}
                handleClickBtn={clickHandler}
              />
            </div>
          </div>
        </section>
      </div>
    </ControllerLayout>
  );
}

export default ControllerPage;
