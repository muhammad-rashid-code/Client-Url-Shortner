"use client";

import { APIroute } from "@/constants/apiRoutes";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function RootPage() {
  const [usersName, setUsersName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameDisplay, setNameDisplay] = useState<string>("");

  // We can store all users in an array of objects with { id, usersName }
  const [allUsers, setAllUsers] = useState<{ id: number; usersName: string }[]>(
    []
  );

  const clickHandler = async () => {
    setIsLoading(true);
    setUsersName("");

    try {
      const APIresponse = await fetch(
        // "http://localhost:4000/",
        APIroute.getRoot,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usersName }),
        }
      );

      const dataAPI = await APIresponse.json();
      console.log(dataAPI);

      if (APIresponse.ok) {
        // Add the newly created user to the list (real-time update)
        setIsLoading(false);
        setNameDisplay(dataAPI.data.usersName);

        // Simulate adding the new user to the list (real-time)
        setAllUsers((prevUsers) => [
          ...prevUsers, // Keep old users
          { id: dataAPI.data.id, usersName: dataAPI.data.usersName }, // Add new user
        ]);
      }
    } catch (error) {
      console.error("Error submitting data", error);
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    const APIData = await fetch(APIroute.getRootsGET);

    const dataFetched = await APIData.json();
    console.log(dataFetched.data);

    if (APIData.ok) {
      setAllUsers(dataFetched.data); // Set initial users list from API
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.input}>
          <div className={styles.inputRow}>
            <label htmlFor="userName" className={styles.label}>
              User Name:
            </label>
            <input
              type="text"
              id="userName"
              value={usersName}
              onChange={(e) => setUsersName(e.target.value)}
              className={styles.valueInput}
              placeholder="Enter a name"
            />
            <button onClick={clickHandler} className={styles.submBtn}>
              {isLoading ? "Submitting..." : "submit"}
            </button>
          </div>
          {nameDisplay && <p className={styles.nameDisplay}>{nameDisplay}</p>}
        </div>
        <div className={styles.allUsers}>
          <ul>
            {allUsers.map((user, i) => (
              <li key={user.id + i}>
                {user.id}: {user.usersName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
