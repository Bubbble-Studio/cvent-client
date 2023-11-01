import styles from "./ControllerPage.module.css";
import ControllerLayout from "../../layouts/ControllerLayout";
import headerImg2 from "../../assets/images/Home.svg";
import { useNavigate, useParams } from "react-router-dom";
import { DATA } from "../../utils/data";
import { useEffect, useState } from "react";
import ButtonsGrid from "../../components/ButtonGrid";
import { useSocket } from "../../utils/GlobalContext";

function ControllerPage({ isConnected }) {
  const { id } = useParams();
  const [controllerData, setControllerData] = useState({});
  const navigate = useNavigate();
  const { peerConnection, socket } = useSocket(); // Destructuring to get peerConnection and dataChannel

  useEffect(() => {
    if (id) {
      setControllerData(DATA[id].controller);
    }
  }, [id]);

  function handleClickBtn(next) {
    if (!socket.connected) {
      alert("Desktop not connected");
      return;
    }
    navigate(`/controller/${next}`);
    // Use WebRTC Data Channel to send the navigation command
    if (peerConnection?.dataChannel?.readyState === "open") {
      peerConnection.dataChannel.send(
        JSON.stringify({ action: "navigate", to: next })
      );
    }
  }

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
            <h3>{controllerData?.body?.description}</h3>
            <div className={styles.buttons}>
              <ButtonsGrid
                buttons={controllerData?.body?.buttons}
                handleClickBtn={handleClickBtn}
              />
            </div>
          </div>
        </section>
      </div>
    </ControllerLayout>
  );
}

export default ControllerPage;
