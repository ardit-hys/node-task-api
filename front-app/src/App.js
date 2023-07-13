import "./App.css";
import { Suspense, lazy } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes } from "react-router-dom";

const TaskList = lazy(() => import("./components/TaskList.js"));
const CreateTask = lazy(() => import("./components/CreateTask.js"));
const UpdateTask = lazy(() => import("./components/UpdateTask.js"));

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <LoadingOutlined />
          </div>
        }
      >
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<TaskList />} />
          <Route exact path="/new" element={<CreateTask />} />
          <Route exact path="/update/:id" element={<UpdateTask />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
