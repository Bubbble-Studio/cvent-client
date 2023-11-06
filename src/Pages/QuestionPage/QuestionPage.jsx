import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./QuestionPage.module.css";
import { DATA } from "../../utils/data";
import Layout0 from "../../layouts/DisplayLayout/Layout0/Layout0";
import Layout1 from "../../layouts/DisplayLayout/Layout1/Layout1";
import Layout2 from "../../layouts/DisplayLayout/Layout2/Layout2";
import { usePeer } from "../../utils/PeerContext";
import Layout3 from "../../layouts/DisplayLayout/Layout3/Layout3";

const DisplayPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { dataChannel } = usePeer(); // Using PeerContext
  // const [media, setMedia] = useState(null);

  useEffect(() => {
    console.log({ dataChannel });
    if (dataChannel) {
      dataChannel.on("data", (data) => {
        console.log("Received data:", data);
        // Act on received data
        if (data.action === "navigate") {
          console.log({ data });
          if (data.next === 0) {
            navigate(`/`);
            return;
          } else if (data.next === -1) {
            console.log("navigate back");
            navigate(-1);
            return;
          }
          navigate(`/display/${data.next}`);
        }
      });
    }
  }, [dataChannel, navigate]);

  function getDisplayData() {
    return DATA[id]?.display;
  }

  function getLayoutComp(displayData) {
    if (!displayData) return <div>Unknown layout type</div>;
    const { mediaLink, mediaType, description, sideDescription, points } =
      displayData;
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
      case 3:
        return (
          <Layout3
            mediaLink={mediaLink}
            mediaType={mediaType}
            description={description}
            points={points}
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
