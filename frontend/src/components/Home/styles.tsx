export const styles = {
    Body: {
      width: "100%",
      height: "100vh"
    },
    MainContainer: {
      display: "flex",
      flexDirection: 'row',
    },
    MessagesAndCardsContainer: {
      borderLeft: "3px solid black",
      marginLeft: "5px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
    },
    RightSideContainer: {
      display: "flex",
      flexDirection: "column",
    },
    MessagesContainer: {
      height: "40%",
    },
    MessageBox: {
      height: "400px",
      width: "300px",
      border: "1px solid #36454F",
      borderRadius: "20px",
      padding: "20px",
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      overflowY: "auto",
      overflowX: "hidden"
    },
    MessageContentContainer: {
      border: "1px solid #36454F",
      display: "flex",
      width: "100%",
      borderRadius: "10px",
      padding: "10px",
      height: "fit-content",
      marginTop: "8px"
    },
    MyCardsContainer: {
      height: "60%"
    },
    MyCardsInnerContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    GameContainer: {
      display: "flex",
      flexDirection: "column"
    },
    HeadingContainer: {
      height: "100px",
      width: "100%",
      justifyContent: "center",
      display: "flex",
      alignItems: "center"
    },
    GameTableContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    GameTable: {
      width: "1000px",
      height: "500px",
      backgroundColor: "#4aad4a",
      borderRadius: "150px",
      position: "relative",
      border: "15px solid #a95555"
    },
    GameTableCardArea: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      border: "5px solid #63c763",
      height: "300px",
      width: "615px",
      position: "absolute",
      borderRadius: "10px",
      padding: "10px",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      boxSizing: "border-box"
    },
    GameTableBefore: {
      content: '""',
      border: "7px solid rgba(0, 0, 0, 0.1)",
      display: "block",
      width: "1015px",
      height: "515px",
      borderRadius: "150px",
      position: "absolute",
      top: "-15px",
      left: "-15px"
    },
    GameTableAfter: {
      content: '""',
      border: "7px solid rgba(0, 0, 0, 0.1)",
      display: "block",
      width: "985px",
      height: "486px",
      borderRadius: "130px",
      position: "absolute",
      top: "0",
      left: "0"
    }
  };
  