import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from "./DetailedSession.module.scss";

const DetailedSession = ({ session }) => {
  const [date, setDate] = useState("");
  const [dateStop, setDateStop] = useState("");

  useEffect(() => {



  }, [session]);
  const renderCard = () => {
    if (session) {
      console.log(session);
      return (
        <div className={styles.card__content}>
          {session && session.start.getFullYear()}

          <p>category {session.category && session.category}</p>
          <p>{session.parent && `category ${session.parent}`}</p>
          <p>{session.activity && `activity ${session.activity}`}</p>
          <p>{!session.image && "upload image"}</p>
          <div className={styles.card__content__keys}>
            <p>Keys</p>
            <div className={styles.card__content__keys__content}>
              {session.keys.map((key) => {
                return (
                  <div
                    className={styles.card__content__keys__content__key}
                  >{`${key}`}</div>
                );
              })}
            </div>
            <div className={styles.card__content__keys__inputWrapper}>
              <Input required label={"add keys"}></Input>
            </div>
          </div>
        </div>
      );
    }
  };
  return <div className={styles.card}>i show detal{renderCard()}</div>;
};

export default DetailedSession;
