import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";
import { Document as PDFDocument, Page as PDFPage, pdfjs } from "react-pdf";
import useToDos from "../hooks/hook";
import "react-pdf/dist/Page/TextLayer.css";
import { styled } from "styled-components";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const SDiv = styled.div`
  box-shadow: 1px 3px 50px -7px rgba(0, 0, 0, 0.64);
  width: 595px;
  position: absolute;
  top: 85px;
  right: calc(50% - 595px / 2);
  margin-bottom: 64px;
`;

const SA = styled.a`
  position: absolute;
  top: 85px;
  right: 0px;
  border: 3px solid #dcdede;
  text-align: center;
  border-radius: 9999px;
  padding: 15px;
  margin: 15px;
  background-color: white;
  color: black;
  text-decoration: none;
  &:hover {
    background-color: #dcdede;
    color: black;
  }
`;
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    marginBottom: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 10,
  },
  done: {
    textDecoration: "line-through",
    color: "gray",
    marginBottom: 5,
  },
  task: {
    marginBottom: 5,
  },
});

const PDFTextGenerator = () => {
  const todos = useToDos();
  let notDoneText = "";
  let doneText = "";
  const doneTasks = todos.filter((task) => task.isDone);
  doneTasks.map((task) => {
    doneText += `° ${task.name} \n${task.description}\n`;
  });
  const notDoneTasks = todos.filter((task) => !task.isDone);
  notDoneTasks.map((task) => {
    notDoneText += `° ${task.name} \n${task.description}\n`;
  });

  return (
    <>
      <title>ToDoList - PDF</title>
      <BlobProvider
        document={<MyDocument doneText={doneText} notDoneText={notDoneText} />}
      >
        {({ url, loading, error }) => {
          if (error) {
            return <div>Error: {error.message}</div>;
          } else if (loading) {
            return <div>Loading ...</div>;
          } else {
            return (
              <>
                <SA href={url ? url : ""} download="todos.pdf">
                  Download
                </SA>
                <SDiv>
                  <PDFDocument file={url}>
                    <PDFPage pageNumber={1} renderAnnotationLayer={false} />
                  </PDFDocument>
                </SDiv>
              </>
            );
          }
        }}
      </BlobProvider>
    </>
  );
};

const MyDocument = ({
  doneText,
  notDoneText,
}: {
  doneText: string;
  notDoneText: string;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>Mes Tâches</Text>
        </View>
        <View style={styles.section}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>À faire</Text>
          <Text style={styles.task}>{notDoneText}</Text>
        </View>
        <View style={styles.section}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Terminées</Text>
          <Text style={styles.done}>{doneText}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTextGenerator;
