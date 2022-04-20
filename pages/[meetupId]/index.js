import Head from "next/head";
import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails({ meetupData }) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://user:WswUW2f30tHHlxNX@cluster0.i7x3f.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  // get db in mongodb cluster
  const db = client.db();
  // get collection of meetups
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://user:WswUW2f30tHHlxNX@cluster0.i7x3f.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  // get db in mongodb cluster
  const db = client.db();
  // get collection of meetups
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
