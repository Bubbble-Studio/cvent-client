import { useParams } from "react-router-dom";
import styles from "./QuestionPage.module.css";
import { DATA } from "../../utils/data";
import Layout0 from "../../layouts/DisplayLayout/Layout0/Layout0";
import Layout1 from "../../layouts/DisplayLayout/Layout1/Layout1";
import Layout2 from "../../layouts/DisplayLayout/Layout2/Layout2";

const QuestionPage = () => {
  let { id } = useParams();

  function getDisplayData() {
    return DATA[id].display;
  }

  function getLayoutComp(displayData) {
    const { mediaLink, mediaType, description, sideDescription } = displayData;
    switch (displayData.layoutType) {
      case 0: {
        return <Layout0 mediaLink={mediaLink} mediaType={mediaType} />;
      }
      case 1: {
        return (
          <Layout1
            mediaLink={mediaLink}
            mediaType={mediaType}
            description={description}
          />
        );
      }
      case 2: {
        return (
          <Layout2
            mediaLink={mediaLink}
            mediaType={mediaType}
            description={description}
            sideDescription={sideDescription}
          />
        );
      }
    }
  }

  return (
    <div className={styles.container}>{getLayoutComp(getDisplayData())}</div>
  );
};

export default QuestionPage;
