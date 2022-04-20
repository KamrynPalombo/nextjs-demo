import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage({ meetups }) {
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    // send http request and fetch data
    // setLoadedMeetups to fetched meetups
    setLoadedMeetups(meetups);
  }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={loadedMeetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://user:WswUW2f30tHHlxNX@cluster0.i7x3f.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  // get db in mongodb cluster
  const db = client.db();
  // get collection of meetups
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
