import { Card, Image, List, Progress, Tag } from "antd";

const upcomingEvents = [
  {
    id: 1,
    title: "White Beach, Boracay",
    date: "April 11 - 15, 2023",
    participants: 13,
    maxParticipants: 20,
    image: "https://loremflickr.com/320/240/philippines,beach",
  },
  {
    id: 2,
    title: "White Beach, Boracay",
    date: "April 11 - 15, 2023",
    participants: 13,
    maxParticipants: 20,
    image: "https://loremflickr.com/320/240/philippines,beach",
  },
  {
    id: 3,
    title: "White Beach, Boracay",
    date: "April 11 - 15, 2023",
    participants: 13,
    maxParticipants: 20,
    image: "https://loremflickr.com/320/240/philippines,beach",
  },
  {
    id: 4,
    title: "White Beach, Boracay",
    date: "April 11 - 15, 2023",
    participants: 13,
    maxParticipants: 20,
    image: "https://loremflickr.com/320/240/philippines,beach",
  },
  {
    id: 5,
    title: "White Beach, Boracay",
    date: "April 11 - 15, 2023",
    participants: 13,
    maxParticipants: 20,
    image: "https://loremflickr.com/320/240/philippines,beach",
  },
];

const UpcomingEvents = () => {
  return (
    <Card
      title="Upcoming Events"
      extra={
        <a href="#" className="text-blue-500 hover:underline">
          View All
        </a>
      }
      className="shadow-md"
    >
      <List
        itemLayout="horizontal"
        dataSource={upcomingEvents}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image
                  width={80}
                  height={80}
                  src={item.image}
                  alt={item.title}
                  className="rounded-md"
                />
              }
              title={
                <div className="flex justify-between">
                  {item.title} <Tag color="blue">Ongoing</Tag>
                </div>
              }
              description={
                <div>
                  <div>{item.date}</div>
                  <Progress
                    percent={(item.participants / item.maxParticipants) * 100}
                    format={() =>
                      `${item.participants}/${item.maxParticipants}  participants`
                    }
                    size="small"
                  />
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UpcomingEvents;
