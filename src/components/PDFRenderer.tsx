import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import useToDos from "../hooks/hook";

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
    textDecoration: "line-through", // Tâche terminée, barrée
    color: "gray", // Couleur pour les tâches terminées
    marginBottom: 5,
  },
  task: {
    marginBottom: 5, // Espacement entre les tâches
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
      <PDFViewer
        style={{
          width: "calc(100% - 4px)",
          height: "calc(100vh - 8px)",
        }}
      >
        <MyDocument doneText={doneText} notDoneText={notDoneText} />
      </PDFViewer>
    </>
  );
};

// Composant Document
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

        {/* Tâches non terminées */}
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
