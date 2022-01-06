import { useAsyncEffect } from "use-async-effect";
import { useState, useCallback } from "react";
import Web3 from "web3";
import TodoListContract from "./TodoList.json";
import TruffleContract from "truffle-contract";

const loadWeb3 = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.web3 = new Web3(window.ethereum);
    return window.web3.eth.getAccounts();
  }
  return null;
};

const loadContract = async () => {
  const contract = TruffleContract(TodoListContract);
  contract.setProvider(window.web3.currentProvider);
  return await contract.deployed();
};

const loadTasks = async (contract) => {
  // Load tasks from contract
  const numTasksBin = await contract.taskCount();
  const tasks = [];
  for (let i = 1; i <= numTasksBin; i++) {
    const task = await contract.tasks(i);
    tasks.push({
      id: task[0].toNumber(),
      content: task[1].toString(),
      completed: task[2],
    });
  }
  return tasks;
};

function App() {
  const [account, setAccount] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [contract, setContract] = useState(null);

  useAsyncEffect(async () => {
    const accounts = await loadWeb3();
    if (accounts) {
      setAccount(accounts[0]);

      // If there is an account load tasks
      const con = await loadContract();
      setContract(con);
      if (con) {
        const tasks = await loadTasks(con);
        setTasks(tasks);
      }
    }
  }, []);

  const reloadTasks = useCallback(async () => {
    if (contract) {
      const tasks = await loadTasks(contract);
      setTasks(tasks);
    }
  });

  const toggleCompleted = useCallback(
    async (id) => {
      await contract.toggleCompleted(id, { from: account });
      reloadTasks();
    },
    [account, contract, tasks]
  );

  const createTask = useCallback(
    async (content) => {
      await contract.createTask(content, { from: account });
      reloadTasks();
    },
    [account, contract, tasks]
  );

  return (
    <div>
      <h2>Etherum Smart Contract TODO List</h2>
      {account && <p> Address: {account}</p>}
      {!account && <p>Loading...</p>}
      {account && (
        <input
          type="text"
          placeholder="Taskname"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await createTask(e.target.value);
              // Clear input
              e.target.value = "";
            }
          }}
        />
      )}
      {tasks.map((task, index) => (
        // Checkbox
        <div key={index}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={async () => {
              toggleCompleted(task.id);
            }}
          />
          {task.content}
        </div>
      ))}
    </div>
  );
}

export default App;
