import styles from "./ControllerPage.module.css";
import ControllerLayout from "../../layouts/ControllerLayout";
import headerImg2 from "../../assets/images/Home.svg";
import { useNavigate, useParams } from "react-router-dom";
import { DATA } from "../../utils/data";
import { useEffect, useState } from "react";
import ButtonsGrid from "../../components/ButtonGrid";
import { useSocket } from "../../utils/GlobalContext";
import { usePeer } from "../../utils/PeerContext";

function ControllerPage({ isConnected }) {
  const { id } = useParams();
  const [controllerData, setControllerData] = useState({});
  const navigate = useNavigate();
  const { dataChannel } = usePeer();

  useEffect(() => {
    if (id) {
      setControllerData(DATA[id].controller);
    }
  }, [id]);

  useEffect(() => {
    if (dataChannel && dataChannel.open) {
      if (controllerData?.mediaLink) {
        // stream the media based on controllerData.mediaType
        dataChannel.send({
          action: "stream",
          mediaLink: controllerData.mediaLink,
          mediaType: controllerData.mediaType,
        });
      }
    }
  }, [controllerData, dataChannel]);

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
  if (mediaType === "video") {
    url += "/assets/video/";
  } else {
    url += "/assets/images/";
  }
  url += controllerData?.body?.mediaLink;
  console.log(controllerData);
  return (
    <ControllerLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>{controllerData.title}</h2>
          </div>
          <img className={styles.homeImg} src={headerImg2} alt="header-img-2" />
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
              <ButtonsGrid
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
