import { useParams, useNavigate } from "react-router-dom";
import styles from "./QuestionPage.module.css";
import { DATA } from "../../utils/data";
import Layout0 from "../../layouts/DisplayLayout/Layout0/Layout0";
import Layout1 from "../../layouts/DisplayLayout/Layout1/Layout1";
import Layout2 from "../../layouts/DisplayLayout/Layout2/Layout2";
import { useSocket } from "../../utils/GlobalContext";
import { useEffect } from "react";

const DisplayPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { peerConnection } = useSocket();

  useEffect(() => {
    console.log({ peerConnection });
    if (!peerConnection || !peerConnection.dataChannel) return;

    const dataChannel = peerConnection.dataChannel;

    dataChannel.onmessage = (event) => {
      console.log("Data received: ", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.next) {
          navigate(`/display/${data.next}`);
        }
      } catch (error) {
        console.error("Error parsing data", error);
      }
    };

    return () => {
      dataChannel.onmessage = null;
    };
  }, [peerConnection, navigate]);

  function getDisplayData() {
    return DATA[id]?.display;
  }

  function getLayoutComp(displayData) {
    if (!displayData) return <div>Unknown layout type</div>;
    const { mediaLink, mediaType, description, sideDescription } = displayData;
    switch (displayData.layoutType) {
      case 0:
        return <Layout0 mediaLink={mediaLink} mediaType={mediaType} />;
      case 1:
        return (
          <Layout1
            mediaLink={mediaLink}
            mediaType={mediaType}
            description={description}
          />
        );
      case 2:
        return (
          <Layout2
            mediaLink={mediaLink}
            mediaType={mediaType}
            description={description}
            sideDescription={sideDescription}
          />
        );
      default:
        return <div>Unknown layout type</div>;
    }
  }

  return (
    <div className={styles.container}>{getLayoutComp(getDisplayData())}</div>
  );
};

export default DisplayPage;
